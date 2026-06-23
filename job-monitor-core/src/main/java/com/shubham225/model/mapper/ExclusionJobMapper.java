package com.shubham225.model.mapper;

import com.shubham225.model.dto.ExclusionJobDTO;
import com.shubham225.model.entity.ExclusionJob;
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
