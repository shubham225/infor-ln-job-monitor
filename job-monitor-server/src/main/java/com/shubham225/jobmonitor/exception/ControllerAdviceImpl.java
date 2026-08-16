package com.shubham225.jobmonitor.exception;

import com.shubham225.jobmonitor.domain.AppResult;
import com.shubham225.jobmonitor.model.dto.ExceptionDTO;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.ConstraintViolationException;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.orm.jpa.JpaSystemException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.io.IOException;

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
    public ResponseEntity<AppResult> handleDataIntegrityViolation(Exception exception,
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

    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<AppResult> handleNoResourceFound(NoResourceFoundException exception,
                                        HttpServletRequest request,
                                        HttpServletResponse response) throws IOException {
        String uri = request.getRequestURI();
        String method = request.getMethod();

        boolean isFrontendGet =
                "GET".equalsIgnoreCase(method)
                        && !uri.startsWith("/api/");

        if (isFrontendGet) {
            // Trigger Spring's error handling → /error → 404.html
            response.sendError(HttpStatus.NOT_FOUND.value());
            return null;
        }

        // Return Exception JSON
        ExceptionDTO error = new ExceptionDTO(exception, request);
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;

        error.setStatus(status.toString());

        return AppResult.error(exception.getMessage(), error);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<AppResult> handleException(Exception exception, HttpServletRequest request) {
        ExceptionDTO error = new ExceptionDTO(exception, request);
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;

        error.setStatus(status.toString());

        return AppResult.error(exception.getMessage(), error);
    }
}
