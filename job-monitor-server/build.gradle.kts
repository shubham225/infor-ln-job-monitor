plugins {
    alias(libs.plugins.spring.boot)
}

description = "Job monitoring service for Infor LN, providing real-time job tracking and status APIs."

dependencies {
    implementation(project(":job-monitor-common"))
    implementation(project(":job-monitor-core"))
    implementation(project(":job-monitor-web"))

    compileOnly(libs.org.projectlombok.lombok)
    annotationProcessor(libs.org.projectlombok.lombok)

    implementation(libs.org.springframework.boot.spring.boot.starter.web)
    implementation(libs.org.springframework.boot.spring.boot.starter.data.jpa)
    implementation(libs.org.springframework.boot.spring.boot.starter.thymeleaf)
    implementation(libs.org.springframework.boot.spring.boot.starter.validation)
    implementation(libs.org.hibernate.orm.hibernate.community.dialects)
    implementation(libs.org.springframework.boot.spring.boot.starter.security)
    implementation(libs.org.springframework.boot.spring.boot.starter.oauth2.client)
    runtimeOnly(libs.org.xerial.sqlite.jdbc)
    runtimeOnly(libs.com.h2database.h2)
    testImplementation(libs.org.springframework.boot.spring.boot.starter.test)
}

tasks.withType<Test>().configureEach {
    useJUnitPlatform()
    failOnNoDiscoveredTests = false
}

tasks.named<org.springframework.boot.gradle.tasks.bundling.BootJar>("bootJar") {
    dependsOn(project(":job-monitor-web").tasks.jar)
}