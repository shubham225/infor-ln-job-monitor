package com.shubham225.jobmonitor.exception;

import com.shubham225.jobmonitor.domain.AppResult;
import com.shubham225.jobmonitor.model.dto.ExceptionDTO;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolationException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.orm.jpa.JpaSystemException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ControllerAdviceImpl {
    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<AppResult> handleConstraintViolation(ConstraintViolationException exception,
                                                               HttpServletRequest request) {
        ExceptionDTO error = new ExceptionDTO(exception, request);
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;

        error.setStatus(status.toString());
        StringBuilder message = new StringBuilder();

        exception.getConstraintViolations()
                .forEach(violation -> {
                    message.append("Field ").append(violation.getPropertyPath().toString());
                    message.append("[").append(violation.getMessage()).append("] ");
                });

        return AppResult.error(message.toString(), error);
    }

    @ExceptionHandler({DataIntegrityViolationException.class, JpaSystemException.class})
    public ResponseEntity<AppResult> handleDataIntegrityViolation( Exception exception,
                                                                   HttpServletRequest request) {
        ExceptionDTO error = new ExceptionDTO(exception, request);
        HttpStatus status = HttpStatus.CONFLICT;

        error.setStatus(status.toString());
        String message = "An unexpected error occurred. see server logs for details.";

        if (exception.getMessage().contains("UNIQUE constraint failed")) {
            message = "Duplicate Entry" +
                    " : A UNIQUE constraint failed";
        }

        return AppResult.error(message, error);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<AppResult> handleException(Exception exception, HttpServletRequest request) {
        ExceptionDTO error = new ExceptionDTO(exception, request);
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;

        error.setStatus(status.toString());

        return AppResult.error(exception.getMessage(), error);
    }
}
