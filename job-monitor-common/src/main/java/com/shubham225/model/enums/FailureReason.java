package com.shubham225.model.enums;

public enum FailureReason {
    PENDING,
    JOB_DETAILS_MISSING,
    NOT_FOUND,
    NOT_EXECUTED,
    RUNTIME_ERROR,
    EXECUTED_WITH_RUNTIME_ERROR,
    TIME_LIMIT_EXCEEDED,
    CANCELED,
    ERP_API_DOWN,
    EXECUTED,
    /*
        Below failure reasons will be checked in Executed strategy as
        this needs to be checked after job has been successfully executed in ERP
     */
    WIN_SCHEDULER_RUNNING,
    EXEC_WITH_ERROR_MESSAGE
}
