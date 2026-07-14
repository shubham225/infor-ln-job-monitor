package com.shubham225.jobmonitor.erp;

import com.shubham225.jobmonitor.erp.domain.FetchERPJobResponseDTO;
import com.shubham225.jobmonitor.model.dto.ErrorMessageDTO;

import java.util.List;

public interface ERPClient {
    FetchERPJobResponseDTO fetchERPJobDetails(String apiBaseURL, String jobCode, String company);
    List<ErrorMessageDTO> getJobHistoryErrorMessages(String apiBaseURL, String jobCode, String company, String keywords);
}
