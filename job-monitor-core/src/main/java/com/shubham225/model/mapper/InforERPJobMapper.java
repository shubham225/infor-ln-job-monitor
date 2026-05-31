package com.shubham225.model.mapper;

import com.shubham225.erp.domain.FetchERPJobResponseDTO;
import com.shubham225.model.entity.InforERPJob;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface InforERPJobMapper {
    @Mapping(target = "winTask", ignore = true)
    InforERPJob toEntity(FetchERPJobResponseDTO inforERPJob);

    @Mappings({
            @Mapping(target = "jobCode", ignore = true),
            @Mapping(target = "company", ignore = true),
            @Mapping(target = "hostName", ignore = true),
            @Mapping(target = "winTask", ignore = true)
    })
    void updateEntity(
            FetchERPJobResponseDTO source,
            @MappingTarget InforERPJob target);
}
