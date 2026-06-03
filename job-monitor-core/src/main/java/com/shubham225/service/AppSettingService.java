package com.shubham225.service;

import com.shubham225.model.dto.AppSettingDTO;
import com.shubham225.model.dto.ServerMappingDTO;
import com.shubham225.model.entity.AppSetting;
import com.shubham225.model.entity.ServerMapping;

import java.util.List;
import java.util.UUID;

public interface AppSettingService {
    AppSetting findAppSettings();
    AppSetting saveOrUpdateAppSettings(AppSettingDTO settingsDTO);
    ServerMapping findFirstServerMappingByServer(String server);
    ServerMapping addServerMapping(ServerMappingDTO mapping);
    ServerMapping updateServerMapping(UUID id, ServerMappingDTO mappingDTO);
    List<ServerMappingDTO> getAllServerMappings();
    ServerMapping deleteServerMapping(UUID id);
}
