package com.shubham225.model.mapper;

import com.shubham225.model.dto.ServerMappingDTO;
import com.shubham225.model.entity.ServerMapping;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ServerMappingMapper {
    public ServerMapping toEntity(ServerMappingDTO mappingDTO);
    public ServerMappingDTO toDTO(ServerMapping mapping);
}
