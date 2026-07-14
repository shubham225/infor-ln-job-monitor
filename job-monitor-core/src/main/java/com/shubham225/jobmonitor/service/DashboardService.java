package com.shubham225.jobmonitor.service;

import com.shubham225.jobmonitor.model.dto.DashboardStatsDTO;
import com.shubham225.jobmonitor.model.dto.MonthlyExecutionTrendDTO;

public interface DashboardService {
    DashboardStatsDTO getDashboardStats();
    MonthlyExecutionTrendDTO[] getMonthlyExecutionTrend();
}
