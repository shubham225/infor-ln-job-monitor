package com.shubham225.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class MonthlyExecutionTrendDTO {
    private String month;
    private Long successfulExecutions;
    private Long failedExecutions;
}
