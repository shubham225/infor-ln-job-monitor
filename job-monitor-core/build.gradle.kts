
description = "Core business logic and services for the JobMonitor Application."

dependencies {
    implementation(project(":job-monitor-common"))

    compileOnly(libs.org.projectlombok.lombok)
    annotationProcessor(libs.org.projectlombok.lombok)

    compileOnly(libs.org.mapstruct.mapstruct)
    annotationProcessor(libs.mapstruct.processor)
    annotationProcessor(libs.lombok.mapstruct.binding)

    implementation(libs.jakarta.persistence.jakarta.persistence.api)
    implementation(libs.org.springframework.data.spring.data.commons)
    implementation(libs.org.springframework.boot.spring.boot.starter.validation)
    implementation(libs.org.springframework.boot.spring.boot.starter.thymeleaf)
    implementation(libs.org.springframework.data.spring.data.jpa)
    implementation(libs.org.hibernate.orm.hibernate.core)
}
