package com.shubham225.jobmonitor.service;

import com.shubham225.jobmonitor.model.dto.TaskJobMappingDTO;

import java.util.List;

public interface WinTaskToJobMappingService {
    long countWinTaskToJobMapping();
    String findWinTaskOfJob(String jobName, String jobCompany);
    void generateWinTaskToJobMapping();
    List<TaskJobMappingDTO> getTaskJobMappings();
    boolean isLastGeneratedMappingOlderThanOneDay();
}
