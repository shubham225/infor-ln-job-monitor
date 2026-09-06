package com.shubham225.jobmonitor.service.impl;

import com.shubham225.jobmonitor.exception.ServerMappingNotFoundException;
import com.shubham225.jobmonitor.model.dto.AppSettingDTO;
import com.shubham225.jobmonitor.model.dto.ServerMappingDTO;
import com.shubham225.jobmonitor.model.entity.AppSetting;
import com.shubham225.jobmonitor.model.entity.ServerMapping;
import com.shubham225.jobmonitor.model.mapper.AppSettingMapper;
import com.shubham225.jobmonitor.model.mapper.ServerMappingMapper;
import com.shubham225.jobmonitor.repository.AppSettingRepository;
import com.shubham225.jobmonitor.repository.ServerMappingRepository;
import com.shubham225.jobmonitor.service.AppSettingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.text.MessageFormat;
import java.util.List;

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
        return serverMappingRepository.findFirstByHostName(hostname)
                .orElseGet(() ->
                        serverMappingRepository.findFirstByHostName("")
                                .orElseThrow( () ->
                                        new ServerMappingNotFoundException(
                                                MessageFormat.format("Mapping not found for hostname: {0}", hostname))
                                )
                );
    }

    @Override
    public ServerMappingDTO addServerMapping(ServerMappingDTO mappingDTO) {
        ServerMapping mapping = mappingMapper.toEntity(mappingDTO);
        mapping = serverMappingRepository.save(mapping);
        return mappingMapper.toDTO(mapping);
    }

    @Override
    public ServerMappingDTO updateServerMapping(Long id, ServerMappingDTO mappingDTO) {
        ServerMapping mapping = findServerMappingByID(id);
        mapping.setHostName(mappingDTO.getHostname());
        mapping.setApiUrl(mappingDTO.getApiUrl());
        mapping = serverMappingRepository.save(mapping);
        return mappingMapper.toDTO(mapping);
    }

    @Override
    public List<ServerMappingDTO> getAllServerMappings() {
        return serverMappingRepository.findAll().stream()
                .map(mappingMapper::toDTO).toList();
    }

    @Override
    public ServerMappingDTO deleteServerMapping(Long id) {
        ServerMapping mapping = serverMappingRepository.findById(id).orElse(null);

        if (mapping != null)
            serverMappingRepository.delete(mapping);

        return mapping == null ? new ServerMappingDTO() : mappingMapper.toDTO(mapping);
    }

    private ServerMapping findServerMappingByID(Long id) {
        return serverMappingRepository.findById(id).orElse(new ServerMapping());
    }
}
