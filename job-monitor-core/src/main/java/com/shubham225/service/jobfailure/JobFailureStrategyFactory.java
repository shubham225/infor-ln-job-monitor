package com.shubham225.service.jobfailure;

import com.shubham225.model.enums.FailureReason;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.text.MessageFormat;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class JobFailureStrategyFactory {
    private final Map<String, JobFailureStrategy> jobFailureStrategyMap;

    public JobFailureStrategy getJobFailureStrategy(FailureReason reason) {
        String strategyName = getStrategyComponent(reason);
        JobFailureStrategy jobFailureStrategy = jobFailureStrategyMap.get(strategyName);

        if (jobFailureStrategy == null) {
            throw new IllegalArgumentException(
                    MessageFormat.format("Problem generator for problem type: {0} is not implemented", reason)
            );
        }

        return jobFailureStrategy;
    }

    private String getStrategyComponent(FailureReason reason) {
        return switch (reason) {
            case PENDING -> "PendingStrategy";
            case JOB_DETAILS_MISSING -> "JobDetailsMissingStrategy";
            case NOT_FOUND -> "NotFoundStrategy";
            case NOT_EXECUTED -> "NotExecutedStrategy";
            case RUNTIME_ERROR -> "RuntimeErrorStrategy";
            case EXECUTED_WITH_RUNTIME_ERROR -> "ExecutedWithRuntimeErrorStrategy";
            case TIME_LIMIT_EXCEEDED -> "TimeLimitExceededStrategy";
            case CANCELED -> "CanceledStrategy";
            case ERP_API_DOWN -> "ErpApiNotRespondingStrategy";
            case EXECUTED, EXEC_WITH_ERROR_MESSAGE, WIN_SCHEDULER_RUNNING -> "ExecutedStrategy";
        };
    }
}
