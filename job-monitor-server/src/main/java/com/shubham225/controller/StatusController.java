package com.shubham225.controller;

import com.shubham225.domain.AppResult;
import com.shubham225.service.StatusService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import static com.shubham225.constant.ApplicationConstants.VERSION;

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
