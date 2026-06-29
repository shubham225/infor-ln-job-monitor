package com.shubham225.erp;

import com.shubham225.erp.domain.*;
import com.shubham225.model.dto.ErrorMessageDTO;

import java.util.List;

public interface ERPClient {
    FetchERPJobResponseDTO fetchERPJobDetails(String apiBaseURL, String jobCode, String company);
    List<ErrorMessageDTO> getJobHistoryErrorMessages(String apiBaseURL, String jobCode, String company, String keywords);
}
