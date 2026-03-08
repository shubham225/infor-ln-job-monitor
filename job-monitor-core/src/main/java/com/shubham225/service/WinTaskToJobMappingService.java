package com.shubham225.service;

public interface WinTaskToJobMappingService {
    public long countWinTaskToJobMapping();
    public String findWinTaskOfJob(String jobName, String jobCompany);
    public void generateWinTaskToJobMapping();
}
