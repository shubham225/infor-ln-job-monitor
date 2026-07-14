package com.shubham225.jobmonitor.model.mapper;

import com.shubham225.jobmonitor.model.dto.ServerMappingDTO;
import com.shubham225.jobmonitor.model.entity.ServerMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface ServerMappingMapper {
    @Mappings({
            @Mapping(target="hostName", source = "hostname")
    })
    ServerMapping toEntity(ServerMappingDTO mappingDTO);

    @Mappings({
            @Mapping(target="hostname", source = "hostName")
    })
    ServerMappingDTO toDTO(ServerMapping mapping);
}
