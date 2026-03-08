package com.shubham225.service;

import com.shubham225.model.entity.InforERPJob;
import com.shubham225.model.entity.WinSchedTask;
import com.shubham225.model.key.WinSchedTaskId;

public interface WinSchedTaskService {
    public WinSchedTask findOrCreateWinSchedTask(InforERPJob job);
    public WinSchedTask refershWinSchedTask(WinSchedTaskId task);
}
