package com.shubham225.model.mapper;

import com.shubham225.erp.domain.FetchERPJobResponseDTO;
import com.shubham225.model.entity.InforERPJob;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface InforERPJobMapperNew {
    @Mapping(target = "winTask", ignore = true)
    InforERPJob toEntity(FetchERPJobResponseDTO inforERPJob);
}
