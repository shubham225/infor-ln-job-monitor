package com.shubham225.service;

import com.shubham225.model.entity.WinSchedTask;

public interface WinSchedTaskService {
    WinSchedTask getWinSchedTaskForJob(String hostName, String jobCode, String company);
}
