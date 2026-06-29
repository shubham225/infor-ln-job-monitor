package com.shubham225.service.impl;

import com.shubham225.erp.ERPClient;
import com.shubham225.erp.domain.FetchERPJobResponseDTO;
import com.shubham225.exception.ERPJobNotFoundException;
import com.shubham225.exception.ErpApiException;
import com.shubham225.model.dto.ErrorMessageDTO;
import com.shubham225.model.entity.*;
import com.shubham225.model.enums.*;
import com.shubham225.model.mapper.InforERPJobMapper;
import com.shubham225.repository.InforERPJobRepository;
import com.shubham225.service.AppSettingService;
import com.shubham225.service.ExclusionService;
import com.shubham225.service.JobService;
import com.shubham225.service.WinSchedTaskService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.text.MessageFormat;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class JobServiceImpl implements JobService {
    private final ERPClient erpClient;
    private final InforERPJobRepository inforERPJobRepository;
    private final WinSchedTaskService winSchedTaskService;
    private final AppSettingService appSettingService;
    private final InforERPJobMapper inforERPJobMapper;

    private static final int MAX_RETRIES = 3;
    private static final long RETRY_DELAY_MS = 2000; // 2 seconds

    @Override
    public InforERPJob createInforERPJob(String jobCode, String company, String hostName) {
        InforERPJob inforERPJob = new InforERPJob();

        // Index values
        inforERPJob.setJobCode(jobCode);
        inforERPJob.setCompany(company);
        inforERPJob.setHostName(hostName);

        String apiURL = appSettingService.findFirstServerMappingByServer(hostName).getApiUrl();

        try{
            FetchERPJobResponseDTO responseDTO = erpClient.fetchERPJobDetails(apiURL, jobCode, company);
            inforERPJobMapper.updateEntity(responseDTO, inforERPJob);
        } catch(RuntimeException e){
            log.error("Exception occurred while fetching InforERPJob", e);
            inforERPJob.setStatus(ERPJobStatus.UNKNOWN);
        }

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
    public void refreshERPJobDetails(MonitoringTask task) {
        int attempt = 1;
        String apiURL = appSettingService.findFirstServerMappingByServer(task.getJob().getHostName()).getApiUrl();

        while (attempt <= MAX_RETRIES) {
            log.info("refreshing job [{}] details, attempt {}", task.getJob(), attempt);
            try {
                attempt++;
                log.info("fetching job {} from ERP", task.getJob());
                FetchERPJobResponseDTO responseDTO = erpClient.fetchERPJobDetails(apiURL,
                                                                                  task.getJob().getJobCode(),
                                                                                  task.getJob().getCompany());
                if (responseDTO.getJobNotFound()) {
                    throw new ERPJobNotFoundException(
                            MessageFormat.format("Job {0} not found in ERP", task.getJob()));
                }

                inforERPJobMapper.updateEntity(responseDTO, task.getJob());
                break;
            } catch (ErpApiException e) {
                log.error("Error '{}' while executing ERP API, status code: {}", e.getMessage(), e.getStatusCode());

                if (attempt >= MAX_RETRIES && (e.getStatusCode() >= 500 || e.getStatusCode() == -1)) {
                    task.setReason(FailureReason.ERP_API_DOWN);
                    task.setStatus(MonitoringStatus.FAILED);
                    break;
                }

                sleep();
            } catch (ERPJobNotFoundException e) {
                log.error("job {} is not found in ERP, updating monitor status", task.getJob());
                task.setReason(FailureReason.NOT_FOUND);
                task.setStatus(MonitoringStatus.COMPLETED);
                break;
            }
        }
    }

    @Override
    public List<ErrorMessageDTO> getJobHistoryErrorMessages(InforERPJob job) {
        ServerMapping mapping= appSettingService.findFirstServerMappingByServer(job.getHostName());
        AppSetting configuration = appSettingService.findAppSettings();

        String apiURL = mapping.getApiUrl();
        String keywords = configuration.getErrorKeywords();

        return erpClient.getJobHistoryErrorMessages(apiURL, job.getJobCode(), job.getCompany(), keywords);
    }

    private void sleep() {
        try {
            Thread.sleep(JobServiceImpl.RETRY_DELAY_MS);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            log.warn("Retry sleep interrupted", e);
        }
    }
}
