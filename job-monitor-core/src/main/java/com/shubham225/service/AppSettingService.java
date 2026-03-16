package com.shubham225.service;

import com.shubham225.model.dto.AppSettingDTO;
import com.shubham225.model.dto.ServerMappingDTO;
import com.shubham225.model.entity.AppSettings;
import com.shubham225.model.entity.ServerMapping;

import java.util.List;
import java.util.UUID;

public interface AppSettingService {
    public AppSettings findAppSettings();
    public AppSettings saveOrUpdateAppSettings(AppSettingDTO settingsDTO);
    public ServerMapping findFirstServerMappingByServer(String server);
    public ServerMapping addServerMapping(ServerMappingDTO mapping);
    public ServerMapping updateServerMapping(UUID id, ServerMappingDTO mappingDTO);
    public List<ServerMappingDTO> getAllServerMappings();
    public ServerMapping deleteServerMapping(UUID id);
}
