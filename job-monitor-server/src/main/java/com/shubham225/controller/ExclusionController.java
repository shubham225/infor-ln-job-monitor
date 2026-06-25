package com.shubham225.controller;

import com.shubham225.domain.AppResult;
import com.shubham225.model.dto.ExclusionErrorMessageDTO;
import com.shubham225.model.dto.ExclusionJobDTO;
import com.shubham225.model.dto.ExclusionJobStatusDTO;
import com.shubham225.model.entity.ExclusionJobStatus;
import com.shubham225.service.ExclusionSettingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.shubham225.constant.ApplicationConstants.VERSION;

@RestController
@RequestMapping(value = VERSION + "/exclusion")
@RequiredArgsConstructor
public class ExclusionController {
    private final ExclusionSettingService exclusionSettingService;

    @RequestMapping(
            value = "/message",
            method = RequestMethod.GET
    )
    public ResponseEntity<AppResult> getExclusionMessage() {
        return AppResult.success(exclusionSettingService.getAllErrorMessageExclusion());
    }

    @RequestMapping(
            value = "/message",
            method = RequestMethod.POST
    )
    public ResponseEntity<AppResult> addExclusionMessage(@RequestBody ExclusionErrorMessageDTO request) {
        return AppResult.created(exclusionSettingService.addErrorMessageExclusion(request));
    }

    @RequestMapping(
            value = "/message/{id}",
            method = RequestMethod.DELETE
    )
    public ResponseEntity<AppResult> removeExclusionMessage(@PathVariable("id") Long id) {
        return AppResult.success(exclusionSettingService.removeErrorMessageExclusion(id));
    }

    @RequestMapping(
            value = "/job",
            method = RequestMethod.GET
    )
    public ResponseEntity<AppResult> getExclusionJob() {
        return AppResult.success(exclusionSettingService.getAllJobExclusion());
    }

    @RequestMapping(
            value = "/job",
            method = RequestMethod.POST
    )
    public ResponseEntity<AppResult> addExclusionJob(@RequestBody ExclusionJobDTO request) {
        return AppResult.created(exclusionSettingService.addJobExclusion(request));
    }

    @RequestMapping(
            value = "/job/{id}",
            method = RequestMethod.DELETE
    )
    public ResponseEntity<AppResult> addExclusionJob(@PathVariable Long id) {
        return AppResult.success(exclusionSettingService.removeJobExclusion(id));
    }

    @RequestMapping(
            value = "/jobStatus",
            method = RequestMethod.GET
    )
    public ResponseEntity<AppResult> getExclusionJobStatus() {
        return AppResult.success(exclusionSettingService.getAllJobExclusionStatus());
    }

    @RequestMapping(
            value = "/jobStatus",
            method = RequestMethod.POST
    )
    public ResponseEntity<AppResult> addExclusionJobStatus(@RequestBody ExclusionJobStatusDTO request) {
        return AppResult.created(exclusionSettingService.addJobExclusionStatus(request));
    }

    @RequestMapping(
            value = "/jobStatus/{id}",
            method = RequestMethod.DELETE
    )
    public ResponseEntity<AppResult> removeExclusionJobStatus(@PathVariable Long id) {
        return AppResult.success(exclusionSettingService.removeJobExclusionStatus(id));
    }
}
