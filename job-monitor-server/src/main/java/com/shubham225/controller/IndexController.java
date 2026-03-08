package com.shubham225.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class IndexController {
    @GetMapping("/")
    String getIndex(final Model model) {
        return "redirect:/index.html";
    }

    @GetMapping("/tasks")
    public String tasks() {
        return "forward:/tasks.html";
    }
}
