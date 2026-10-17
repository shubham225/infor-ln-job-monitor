
description = "Shared utilities, models, and helper functions used across all JobMonitor modules."

dependencies {
    compileOnly(libs.org.projectlombok.lombok)
    annotationProcessor(libs.org.projectlombok.lombok)

    implementation(libs.com.fasterxml.jackson.core.jackson.databind)
    implementation(libs.com.fasterxml.jackson.datatype.jackson.datatype.jsr310)
    implementation(libs.com.sun.mail.jakarta.mail)
    implementation(libs.org.slf4j.slf4j.api)
    implementation(libs.jakarta.validation.jakarta.validation.api)
    compileOnly(libs.jakarta.servlet.jakarta.servlet.api)
}

