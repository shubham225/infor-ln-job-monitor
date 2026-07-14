package com.shubham225.jobmonitor.controller;

import com.shubham225.jobmonitor.domain.AppResult;
import com.shubham225.jobmonitor.model.dto.AppSettingDTO;
import com.shubham225.jobmonitor.service.AppSettingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.shubham225.jobmonitor.constant.ApplicationConstants.VERSION;

@RestController
@RequestMapping(value = VERSION + "/settings")
@RequiredArgsConstructor
public class AppSettingsController {
    private final AppSettingService settingService;

    @RequestMapping(
            value = "",
            method = RequestMethod.POST
    )
    public ResponseEntity<AppResult> addAppSetting(@RequestBody AppSettingDTO request) {
        return AppResult.created(settingService.saveOrUpdateAppSettings(request));
    }

    @RequestMapping(
            value = "",
            method = RequestMethod.GET
    )
    public ResponseEntity<AppResult> getAppSetting() {
        return AppResult.success(settingService.findAppSettings());
    }
}
