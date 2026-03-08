package com.shubham225.model.mapper;

import com.shubham225.model.dto.AppSettingDTO;
import com.shubham225.model.entity.AppSettings;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AppSettingsMapper {
    AppSettings toEntity(AppSettingDTO settingDTO);
    AppSettingDTO toDTO(AppSettings settingDTO);
}
