package com.shubham225.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.shubham225.constant.ApplicationConstants.VERSION;

@RestController
@RequestMapping(value = VERSION + "/settings/exclusion")
@RequiredArgsConstructor
public class ExclusionController {
}
