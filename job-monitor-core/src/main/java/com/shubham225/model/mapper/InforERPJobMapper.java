package com.shubham225.model.mapper;

import com.shubham225.erp.domain.ERPJob;
import com.shubham225.model.entity.InforERPJob;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface InforERPJobMapper {
    @Mappings({
            @Mapping(target = "jobCode", source = "jobName"),
            @Mapping(target = "company", source = "jobCompany"),
            @Mapping(target = "hostName", source = "jobServer"),
            @Mapping(target = "winTask", ignore = true),
    })
    public InforERPJob toInforJob(ERPJob job);
}
