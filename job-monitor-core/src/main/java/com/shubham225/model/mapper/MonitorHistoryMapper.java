package com.shubham225.model.mapper;

import com.shubham225.model.dto.ExecutionHistoryDTO;
import com.shubham225.model.entity.MonitoringTaskHistory;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MonitorHistoryMapper {
    ExecutionHistoryDTO toDTO(MonitoringTaskHistory history);
}
