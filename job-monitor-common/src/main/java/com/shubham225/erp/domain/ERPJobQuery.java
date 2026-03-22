package com.shubham225.erp.domain;

public record ERPJobQuery (
    String jobName,
    String company,
    String apiURL,
    Integer pageSize,
    Integer pageNumber
){}
