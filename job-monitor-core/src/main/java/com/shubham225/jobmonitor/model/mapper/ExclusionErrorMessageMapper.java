package com.shubham225.jobmonitor.model.mapper;

import com.shubham225.jobmonitor.model.dto.ExclusionErrorMessageDTO;
import com.shubham225.jobmonitor.model.entity.ExclusionErrorMessage;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface ExclusionErrorMessageMapper {
    ExclusionErrorMessageDTO toDto(ExclusionErrorMessage exclusionErrorMessage);

    @Mappings({
            @Mapping(target = "id", ignore = true),
    })
    ExclusionErrorMessage toEntity(ExclusionErrorMessageDTO exclusionErrorMessageDTO);
}
