package com.shubham225.service;

import com.shubham225.model.entity.InforERPJob;
import com.shubham225.model.entity.MonitoringTask;

public interface JobService {
    InforERPJob createInforERPJob(String jobCode, String company, String hostName);
    public void refreshERPJobDetails(MonitoringTask task);
}
