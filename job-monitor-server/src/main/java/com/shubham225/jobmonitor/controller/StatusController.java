package com.shubham225.jobmonitor.controller;

import com.shubham225.jobmonitor.domain.AppResult;
import com.shubham225.jobmonitor.service.StatusService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import static com.shubham225.jobmonitor.constant.ApplicationConstants.VERSION;

@RestController
@RequestMapping(value = VERSION + "/status")
@RequiredArgsConstructor
public class StatusController {
    private final StatusService statusService;

    @RequestMapping(
            value = "",
            method = RequestMethod.GET
    )
    public ResponseEntity<AppResult> getAppStatus() {
        return AppResult.success(statusService.getStatus());
    }
}
