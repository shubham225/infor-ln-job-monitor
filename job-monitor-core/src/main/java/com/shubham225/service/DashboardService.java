package com.shubham225.service;

import com.shubham225.model.dto.DashboardStatsDTO;
import com.shubham225.model.dto.MonthlyExecutionTrendDTO;

public interface DashboardService {
    DashboardStatsDTO getDashboardStats();
    MonthlyExecutionTrendDTO[] getMonthlyExecutionTrend();
}
