package com.shubham225.exception;

import com.shubham225.domain.AppResult;
import com.shubham225.model.dto.ExceptionDTO;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ControllerAdviceImpl {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<AppResult> handleException(Exception exception, HttpServletRequest request) {
        ExceptionDTO error = new ExceptionDTO(exception, request);
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;

        error.setStatus(status.toString());

        return AppResult.error(exception.getMessage(), error);
    }
}
