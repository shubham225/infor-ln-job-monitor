package com.shubham225.service.impl;

import com.shubham225.erp.ERPClient;
import com.shubham225.erp.domain.ERPJob;
import com.shubham225.erp.domain.ERPJobQuery;
import com.shubham225.erp.domain.FetchERPJobResponseDTO;
import com.shubham225.exception.ERPJobNotFoundException;
import com.shubham225.exception.ErpApiException;
import com.shubham225.model.entity.InforERPJob;
import com.shubham225.model.entity.MonitoringTask;
import com.shubham225.model.entity.WinSchedTask;
import com.shubham225.model.enums.*;
import com.shubham225.model.key.ERPJobId;
import com.shubham225.model.mapper.InforERPJobMapper;
import com.shubham225.model.mapper.InforERPJobMapperNew;
import com.shubham225.repository.InforERPJobRepository;
import com.shubham225.service.AppSettingService;
import com.shubham225.service.JobService;
import com.shubham225.service.WinSchedTaskService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.text.MessageFormat;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class JobServiceImpl implements JobService {
    private final ERPClient erpClient;
    private final InforERPJobRepository inforERPJobRepository;
    private final WinSchedTaskService winSchedTaskService;
    private final AppSettingService appSettingService;
    private final InforERPJobMapper inforERPJobMapper;
    private final InforERPJobMapperNew  inforERPJobMapperNew;

    private static final int MAX_RETRIES = 3;
    private static final long RETRY_DELAY_MS = 2000; // 2 seconds

    @Override
    public InforERPJob createInforERPJob(String jobCode, String company, String hostName) {
        /* TODO:
            1. Trigger API call to fetch job details from ERP (Same class will be used to refresh the jobDetails)
            2. Handle Response from API call
            3. Update InforERPJob Table with details if error in API call still update will null or blank values.
            4. Once InforERPJob has been updated create WinSchedTask and update task details.
            5. Task Details will be fetched from the Job to Task Mapping Generated at the initialization of this application
        */

        InforERPJob inforERPJob = new InforERPJob();

        String apiURL = appSettingService.findFirstServerMappingByServer(hostName).getApiUrl();

        try{
            FetchERPJobResponseDTO responseDTO = erpClient.fetchERPJobDetails(apiURL, jobCode, company);
            inforERPJob = inforERPJobMapperNew.toEntity(responseDTO);
        } catch(RuntimeException e){
            log.error("Exception occurred while fetching InforERPJob", e);
            inforERPJob.setStatus(ERPJobStatus.UNKNOWN);
        }

        // Index values
        inforERPJob.setJobCode(jobCode);
        inforERPJob.setCompany(company);
        inforERPJob.setHostName(hostName);

        // Fetch Windows Task for the Infor Job
        WinSchedTask winSchedTask = new WinSchedTask();
        try{
            winSchedTask = winSchedTaskService.getWinSchedTaskForJob(hostName, jobCode, company);
        } catch(RuntimeException e){
            log.error("Exception occurred while fetching InforERPJob", e);
            inforERPJob.setStatus(ERPJobStatus.UNKNOWN);
        }

        inforERPJob.setWinTask(winSchedTask);
        return inforERPJobRepository.save(inforERPJob);
    }

    @Override
    public void refreshJobDetails(MonitoringTask task) {
        int attempt = 1;

        while (attempt <= MAX_RETRIES) {
            log.info("refreshing job [{}] details, attempt {}", task.getJob(), attempt);
            try {
                attempt++;
                log.info("fetching job {} from ERP", task.getJob());
                task.setJob(refreshERPJob(task.getJob()));
                break;
            } catch (ErpApiException e) {
                log.error("Error '{}' while executing ERP API, status code: {}", e.getMessage(), e.getStatusCode());

                if (attempt >= MAX_RETRIES && (e.getStatusCode() >= 500 || e.getStatusCode() == -1)) {
                    task.setReason(FailureReason.ERP_API_DOWN);
                    task.setStatus(MonitoringStatus.FAILED);
                    break;
                }

                sleep(RETRY_DELAY_MS);
            } catch (ERPJobNotFoundException e) {
                log.error("job {} is not found in ERP, updating monitor status", task.getJob());
                task.setReason(FailureReason.NOT_FOUND);
                task.setStatus(MonitoringStatus.COMPLETED);
                break;
            }
        }
    }

    private void sleep(long millis) {
        try {
            Thread.sleep(millis);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            log.warn("Retry sleep interrupted", e);
        }
    }

    private InforERPJob refreshERPJob(InforERPJob job) throws ErpApiException {
        String apiURL = appSettingService.findFirstServerMappingByServer(job.getHostName()).getApiUrl();
        ERPJobQuery query = new ERPJobQuery(job.getJobCode(), job.getCompany(),
                apiURL, 1, 1);

        ERPJob jobDTO = erpClient.findERPJob(query);

        if (jobDTO == null) {
            log.error("Issue with job fetching, continue without updating job...");
            return job;
        }

        if (jobDTO.getNotFound()) {
            throw new ERPJobNotFoundException(
                    MessageFormat.format("Job with id {0} not found in ERP", job.toString()));
        }

        log.debug("job {} fetched from ERP", jobDTO.getJobName());

        job.setDescription(jobDTO.getJobDescription());
        job.setStatus(jobDTO.getStatus());
        job.setHistoryStatus(jobDTO.getHistoryStatus());
        job.setUserId(jobDTO.getJobUser());
        job.setJobStartedAt(jobDTO.getJobStartedAt());
        job.setJobEndedAt(jobDTO.getJobEndedAt());
        job.setNextJobExecutionAt(jobDTO.getNextJobExecutionAt());
        job.setJobAverageRuntimeInSec(jobDTO.getJobAverageRuntimeInSec());

        return saveInforERPJob(job);
    }

    private InforERPJob saveInforERPJob(InforERPJob job) {
        return inforERPJobRepository.save(job);
    }
}
