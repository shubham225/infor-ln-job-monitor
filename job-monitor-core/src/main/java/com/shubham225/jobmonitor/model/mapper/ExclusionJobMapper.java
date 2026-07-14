package com.shubham225.jobmonitor.model.mapper;

import com.shubham225.jobmonitor.model.dto.ExclusionJobDTO;
import com.shubham225.jobmonitor.model.entity.ExclusionJob;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface ExclusionJobMapper {
    ExclusionJobDTO toDto(ExclusionJob exclusionJobMapper);

    @Mappings({
            @Mapping(target = "id", ignore = true)
    })
    ExclusionJob toEntity(ExclusionJobDTO exclusionJobDTO);
}
