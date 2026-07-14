package com.shubham225.jobmonitor.service;

import com.shubham225.jobmonitor.model.entity.WinSchedTask;

public interface WinSchedTaskService {
    WinSchedTask getWinSchedTaskForJob(String hostName, String jobCode, String company);
}
