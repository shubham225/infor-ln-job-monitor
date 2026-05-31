package com.shubham225.erp;

import com.shubham225.erp.domain.*;

public interface ERPClient {
    FetchERPJobResponseDTO fetchERPJobDetails(String apiURL, String jobCode, String company);

}
