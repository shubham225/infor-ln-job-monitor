package com.shubham225.service;

import com.shubham225.model.dto.AppSettingDTO;
import com.shubham225.model.dto.ServerMappingDTO;
import com.shubham225.model.entity.AppSetting;
import com.shubham225.model.entity.ServerMapping;

import java.util.List;

public interface AppSettingService {
    AppSetting findAppSettings();
    AppSetting saveOrUpdateAppSettings(AppSettingDTO settingsDTO);
    ServerMapping findFirstServerMappingByServer(String server);
    ServerMappingDTO addServerMapping(ServerMappingDTO mapping);
    ServerMappingDTO updateServerMapping(Long id, ServerMappingDTO mappingDTO);
    List<ServerMappingDTO> getAllServerMappings();
    ServerMappingDTO deleteServerMapping(Long id);
}
