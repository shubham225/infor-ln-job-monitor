package com.shubham225.model.mapper;

import com.shubham225.model.dto.ExecHistoryDTO;
import com.shubham225.model.entity.MonitoringTaskHistory;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MonitorHistoryMapper {
    ExecHistoryDTO toDTO(MonitoringTaskHistory history);
}
