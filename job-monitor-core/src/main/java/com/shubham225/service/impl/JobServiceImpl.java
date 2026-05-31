package com.shubham225.service.impl;

import com.shubham225.erp.ERPClient;
import com.shubham225.erp.domain.ERPJob;
import com.shubham225.erp.domain.ERPJobQuery;
import com.shubham225.exception.ERPJobNotFoundException;
import com.shubham225.exception.ErpApiException;
import com.shubham225.model.entity.InforERPJob;
import com.shubham225.model.entity.MonitoringTask;
import com.shubham225.model.entity.WinSchedTask;
import com.shubham225.model.enums.*;
import com.shubham225.model.key.ERPJobId;
import com.shubham225.model.key.WinSchedTaskId;
import com.shubham225.model.mapper.InforERPJobMapper;
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

    private static final int MAX_RETRIES = 3;
    private static final long RETRY_DELAY_MS = 2000; // 2 seconds

    @Override
    public InforERPJob findOrCreateJob(String jobName, String company, String server) {
        ERPJobId id = new ERPJobId(jobName, company, server);
        // This function will only get mapping from tables
        InforERPJob erpJob = findJobById(id).orElseGet(() ->
                getERPJobAndWinTask(new ERPJobId(jobName, company, server))
        );

        return saveInforERPJob(erpJob);
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
        job.setJobUser(jobDTO.getJobUser());
        job.setJobStartedAt(jobDTO.getJobStartedAt());
        job.setJobEndedAt(jobDTO.getJobEndedAt());
        job.setNextJobExecutionAt(jobDTO.getNextJobExecutionAt());
        job.setJobAverageRuntimeInSec(jobDTO.getJobAverageRuntimeInSec());

        return saveInforERPJob(job);
    }

    private InforERPJob getERPJobAndWinTask(ERPJobId jobId) {
        InforERPJob ERPJob = new InforERPJob();
//        ERPJob.setJobId(jobId);
        ERPJob.setJobCode(jobId.getJobCode());
        ERPJob.setCompany(jobId.getCompany());
        ERPJob.setHostName(jobId.getHostName());
        ERPJob.setStatus(ERPJobStatus.UNKNOWN);

        try {
            ERPJob = getERPJob(jobId);
        } catch (ErpApiException e) {
            log.error("Error '{}' while executing ERP API, status code: {}", e.getMessage(), e.getStatusCode());
        } catch (ERPJobNotFoundException e) {
            log.error("job {} is not found in ERP, updating monitor status", ERPJob);
        } catch (Exception e) {
            log.error("error while fetching job {}: {}", ERPJob, e.getMessage());
        }

        WinSchedTask winTask = new WinSchedTask();
//        winTask.setTaskId(new WinSchedTaskId("NA", "NA"));
        winTask.setTaskName("NA");
        winTask.setHostName("NA");

        try {
           winTask = winSchedTaskService.findOrCreateWinSchedTask(ERPJob);
        } catch (Exception e) {
            log.error("error while fetching task for job {}: {}", ERPJob, e.getMessage());
        }

        ERPJob.setWinTask(winTask);

        return ERPJob;
    }

    private InforERPJob getERPJob(ERPJobId jobId) throws ErpApiException {
        String apiURL = appSettingService.findFirstServerMappingByServer(jobId.getHostName()).getApiUrl();
        ERPJobQuery query = new ERPJobQuery(jobId.getJobCode(), jobId.getCompany(), apiURL, 1, 1);
        ERPJob jobDTO = erpClient.findERPJob(query);

        if (jobDTO.getNotFound()) {
            throw new ERPJobNotFoundException(
                    MessageFormat.format("Job with id {0} not found in ERP", jobId.getJobCode()));
        }

        InforERPJob job = inforERPJobMapper.toInforJob(jobDTO);
        return saveInforERPJob(job);
    }

    private Optional<InforERPJob> findJobById(ERPJobId id) {
        return inforERPJobRepository.findById(id);
    }

    private InforERPJob saveInforERPJob(InforERPJob job) {
        return inforERPJobRepository.save(job);
    }
}
