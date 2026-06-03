package com.shubham225.service;

public interface WinTaskToJobMappingService {
    long countWinTaskToJobMapping();
    String findWinTaskOfJob(String jobName, String jobCompany);
    void generateWinTaskToJobMapping();
}
