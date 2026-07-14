package com.shubham225.jobmonitor.model.mapper;

import com.shubham225.jobmonitor.model.dto.TaskJobMappingDTO;
import com.shubham225.jobmonitor.model.entity.WinTaskToJobMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface TaskJobMappingMapper {
    @Mappings({
            @Mapping(target="jobName", source = "jobCode")
    })
    TaskJobMappingDTO toDTO(WinTaskToJobMapping mapping);
}
