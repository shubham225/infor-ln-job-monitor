package com.shubham225.service;

import com.shubham225.model.entity.InforERPJob;
import com.shubham225.model.entity.WinSchedTask;
import com.shubham225.model.key.WinSchedTaskId;

public interface WinSchedTaskService {
    WinSchedTask getWinSchedTaskForJob(String hostName, String jobCode, String company);
}
