package com.shubham225.jobmonitor.model.mapper;

import com.shubham225.jobmonitor.model.dto.ExclusionJobStatusDTO;
import com.shubham225.jobmonitor.model.entity.ExclusionJobStatus;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface ExclusionJobStatusMapper {
    ExclusionJobStatusDTO toDto(ExclusionJobStatus entity);

    @Mappings({
            @Mapping(target = "id", ignore = true),
    })
    ExclusionJobStatus toEntity(ExclusionJobStatusDTO entity);
}
