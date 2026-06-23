package com.shubham225.model.mapper;

import com.shubham225.model.dto.ExclusionJobStatusDTO;
import com.shubham225.model.entity.ExclusionJobStatus;
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
