package com.shubham225.jobmonitor.service.impl;

import com.shubham225.jobmonitor.model.entity.ExclusionErrorMessage;
import com.shubham225.jobmonitor.model.entity.ExclusionJob;
import com.shubham225.jobmonitor.model.entity.ExclusionJobStatus;
import com.shubham225.jobmonitor.model.enums.ERPJobStatus;
import com.shubham225.jobmonitor.repository.ExclusionErrorMessageRepository;
import com.shubham225.jobmonitor.repository.ExclusionJobRepository;
import com.shubham225.jobmonitor.repository.ExclusionJobStatusRepository;
import com.shubham225.jobmonitor.service.ExclusionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ExclusionServiceImpl implements ExclusionService {
    private final ExclusionJobRepository exclusionJobRepository;
    private final ExclusionErrorMessageRepository exclusionErrorMessageRepository;
    private final ExclusionJobStatusRepository exclusionJobStatusRepository;

    @Override
    public boolean isJobExcludedFromMonitoringAlert(String hostName, String jobCode, String company) {
        ExclusionJob exclusionJob = exclusionJobRepository
                                            .findByHostNameAndJobNameAndCompany(hostName, jobCode, company)
                                            .orElse(null);
        return exclusionJob != null;
    }

    @Override
    public boolean isErrorMessageExcludedFromMonitoringAlert(String hostName, String message) {
        ExclusionErrorMessage exclusionErrorMessage = exclusionErrorMessageRepository
                                                        .findByHostNameAndMessage(hostName, message)
                                                        .orElse(null);
        return exclusionErrorMessage != null;
    }

    @Override
    public boolean isJobStatusExcludedFromMonitoringAlert(String hostName, ERPJobStatus status) {
        ExclusionJobStatus exclusionJobStatus = exclusionJobStatusRepository
                                                        .findByHostNameAndStatus(hostName, status)
                                                        .orElse(null);
        return exclusionJobStatus != null;
    }
}
