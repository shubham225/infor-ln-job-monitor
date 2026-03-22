package com.shubham225.controller;

import com.shubham225.domain.AppResult;
import com.shubham225.model.dto.ServerMappingDTO;
import com.shubham225.service.AppSettingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

import static com.shubham225.constant.ApplicationConstants.VERSION;

@RestController
@RequestMapping(value = VERSION + "/mappings")
@RequiredArgsConstructor
public class ServerMappingController {
    private final AppSettingService settingService;

    @RequestMapping(
            value = "",
            method = RequestMethod.GET
    )
    public ResponseEntity<AppResult> getServerMappings() {
        return AppResult.success(settingService.getAllServerMappings());
    }

    @RequestMapping(
            value = "",
            method = RequestMethod.POST
    )
    public ResponseEntity<AppResult> addServerMapping(@RequestBody ServerMappingDTO request) {
        return AppResult.created(settingService.addServerMapping(request));
    }

    @RequestMapping(
            value = "/{id}",
            method = RequestMethod.POST
    )
    public ResponseEntity<AppResult> updateServerMapping(@PathVariable("id") UUID id,
                                                         @RequestBody ServerMappingDTO request) {
        return AppResult.created(settingService.updateServerMapping(id, request));
    }

    @RequestMapping(
            value = "/{id}",
            method = RequestMethod.DELETE
    )
    public ResponseEntity<AppResult> deleteServerMapping(@PathVariable("id") UUID id) {
        return AppResult.created(settingService.deleteServerMapping(id));
    }
}
