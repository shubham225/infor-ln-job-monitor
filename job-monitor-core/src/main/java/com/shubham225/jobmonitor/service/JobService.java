package com.shubham225.jobmonitor.service;

import com.shubham225.jobmonitor.model.dto.ErrorMessageDTO;
import com.shubham225.jobmonitor.model.entity.InforERPJob;
import com.shubham225.jobmonitor.model.entity.MonitoringTask;

import java.util.List;

public interface JobService {
    InforERPJob createInforERPJob(String jobCode, String company, String hostName);
    void refreshERPJobDetails(MonitoringTask task);
    List<ErrorMessageDTO> getJobHistoryErrorMessages(InforERPJob job);
}
