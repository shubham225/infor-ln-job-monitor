package com.shubham225.service.impl;

import com.shubham225.model.dto.AppSettingDTO;
import com.shubham225.model.dto.ServerMappingDTO;
import com.shubham225.model.entity.AppSetting;
import com.shubham225.model.entity.ServerMapping;
import com.shubham225.model.mapper.AppSettingMapper;
import com.shubham225.model.mapper.ServerMappingMapper;
import com.shubham225.repository.AppSettingRepository;
import com.shubham225.repository.ServerMappingRepository;
import com.shubham225.service.AppSettingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AppSettingServiceImpl implements AppSettingService {
    private final AppSettingRepository appSettingsRepository;
    private final ServerMappingRepository serverMappingRepository;
    private final ServerMappingMapper mappingMapper;
    private final AppSettingMapper settingsMapper;

    @Override
    public AppSetting findAppSettings() {
        return appSettingsRepository.findById(1L).orElse(new AppSetting());
    }

    @Override
    public AppSetting saveOrUpdateAppSettings(AppSettingDTO settingDTO) {
        AppSetting settings = settingsMapper.toEntity(settingDTO);
        settings.setId(1L);
        return appSettingsRepository.save(settings);
    }

    @Override
    public ServerMapping findFirstServerMappingByServer(String hostname) {
        // TODO: Exception handling
        return serverMappingRepository.findFirstByHostName(hostname)
                .orElse(new ServerMapping());
    }

    @Override
    public ServerMapping addServerMapping(ServerMappingDTO mappingDTO) {
        ServerMapping mapping = mappingMapper.toEntity(mappingDTO);
        return serverMappingRepository.save(mapping);
    }

    @Override
    public ServerMapping updateServerMapping(Long id, ServerMappingDTO mappingDTO) {
        ServerMapping mapping = findServerMappingByID(id);
        mapping.setHostName(mappingDTO.getHostname());
        mapping.setApiUrl(mappingDTO.getApiUrl());
        mapping = serverMappingRepository.save(mapping);
        return mapping;
    }

    @Override
    public List<ServerMappingDTO> getAllServerMappings() {
        return serverMappingRepository.findAll().stream()
                .map(mappingMapper::toDTO).toList();
    }

    @Override
    public ServerMapping deleteServerMapping(Long id) {
        ServerMapping mapping = serverMappingRepository.findById(id).orElse(null);

        if (mapping != null)
            serverMappingRepository.delete(mapping);

        return mapping == null ? new ServerMapping() : mapping;
    }

    private ServerMapping findServerMappingByID(Long id) {
        return serverMappingRepository.findById(id).orElse(new ServerMapping());
    }
}
