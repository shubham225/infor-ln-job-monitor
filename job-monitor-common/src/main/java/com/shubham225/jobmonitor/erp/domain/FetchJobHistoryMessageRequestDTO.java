package com.shubham225.jobmonitor.erp.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FetchJobHistoryMessageRequestDTO {
    String jobCode;
    String company;
    String keywords;
}
