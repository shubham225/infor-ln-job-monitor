package com.shubham225.model.mapper;

import com.shubham225.model.dto.AppSettingDTO;
import com.shubham225.model.entity.AppSetting;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AppSettingMapper {
    AppSetting toEntity(AppSettingDTO settingDTO);
    AppSettingDTO toDTO(AppSetting settingDTO);
}
