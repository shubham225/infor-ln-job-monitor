package com.shubham225.service;

import com.shubham225.model.dto.ErrorMessageDTO;
import com.shubham225.model.entity.InforERPJob;
import com.shubham225.model.entity.MonitoringTask;

import java.util.List;

public interface JobService {
    InforERPJob createInforERPJob(String jobCode, String company, String hostName);
    void refreshERPJobDetails(MonitoringTask task);
    List<ErrorMessageDTO> getJobHistoryErrorMessages(InforERPJob job);
}
