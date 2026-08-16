package com.shubham225.jobmonitor.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class NotFoundErrorController implements ErrorController {

    @RequestMapping("/error")
    public String error(HttpServletRequest request) {
        return "forward:/404.html";
    }
}
