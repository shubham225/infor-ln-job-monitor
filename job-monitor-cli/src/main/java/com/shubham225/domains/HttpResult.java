package com.shubham225.domains;

public record HttpResult(int code, String body, String error) {

    public boolean isSuccess() {
        return error == null && code < 400;
    }
}