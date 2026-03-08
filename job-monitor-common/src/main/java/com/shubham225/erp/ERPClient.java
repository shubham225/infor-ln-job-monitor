package com.shubham225.erp;

import com.shubham225.erp.domain.*;

public interface ERPClient {
    public ERPJob findERPJob(ERPJobQuery jobQuery);
}
