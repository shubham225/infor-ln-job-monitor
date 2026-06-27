package com.shubham225.controller;

import com.shubham225.domain.AppResult;
import com.shubham225.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.shubham225.constant.ApplicationConstants.VERSION;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = VERSION + "/dashboard")
public class DashboardController {
    private final DashboardService dashboardService;

    @GetMapping("/stats")
    public ResponseEntity<AppResult> getDashboardStats() {
        return AppResult.success(dashboardService.getDashboardStats());
    }

    @GetMapping("/monthlyTrend")
    public ResponseEntity<AppResult> getMonthlyExecutionTrend() {
        return AppResult.success(dashboardService.getMonthlyExecutionTrend());
    }
}
