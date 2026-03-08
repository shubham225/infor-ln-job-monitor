package com.shubham225.exception;

public class ErpApiException extends RuntimeException {
    private final int statusCode;

    public ErpApiException(String message, Throwable cause) {
        super(message, cause);
        this.statusCode = -1;
    }

    public ErpApiException(String message, int statusCode) {
        super(message);
        this.statusCode = statusCode;
    }

    public int getStatusCode() {
        return statusCode;
    }
}
