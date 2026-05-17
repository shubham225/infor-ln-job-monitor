package com.shubham225.controller;

import com.shubham225.domain.AppResult;
import com.shubham225.model.dto.MonitorRequestDTO;
import com.shubham225.service.MonitorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import static com.shubham225.constant.ApplicationConstants.VERSION;

@RestController
@RequestMapping(value = VERSION + "/monitor")
@RequiredArgsConstructor
public class MonitorController {
    private final MonitorService monitorService;

    @RequestMapping(
            value = "",
            method = RequestMethod.POST
    )
    public ResponseEntity<AppResult> addJobToMonitorQueue(@RequestBody MonitorRequestDTO request) {
        return AppResult.created(monitorService.addJobToMonitoringQueue(request));
    }

    @RequestMapping(
            value = "",
            method = RequestMethod.GET
    )
    public ResponseEntity<AppResult> getMonitorQueue() {
        return AppResult.success(monitorService.getMonitoringQueue());
    }

    @RequestMapping(
            value = "/history",
            method = RequestMethod.GET
    )
    public ResponseEntity<AppResult> getMonitorHistory() {
        return AppResult.success(monitorService.getMonitoringHistory());
    }
}
