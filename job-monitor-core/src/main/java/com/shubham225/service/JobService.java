package com.shubham225.service;

import com.shubham225.model.entity.InforERPJob;
import com.shubham225.model.entity.MonitoringTask;

public interface JobService {
    public InforERPJob findOrCreateJob(String jobName, String company, String server);
    public void refreshJobDetails(MonitoringTask task);
}
