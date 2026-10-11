
import com.github.gradle.node.NodeExtension
import com.github.gradle.node.NodePlugin

plugins {
    `maven-publish`
    id("idea")
    id("java")
    alias(libs.plugins.node) apply false
    alias(libs.plugins.spring.boot) apply false
}

allprojects {
    group = "com.shubham225"
    version = "1.0.0"
}
description = "The real-time Infor LN Job Monitoring Application."

subprojects {
    if (name != "job-monitor-client") {
        apply(plugin = "java")
        java {
            toolchain {
                languageVersion.set(JavaLanguageVersion.of(17))
            }
        }

        tasks.withType<JavaCompile>().configureEach {
            options.release.set(17)
        }
    }

    repositories {
        mavenCentral()
        mavenLocal()
    }

    if (project.name in listOf("job-monitor-web")) {
        plugins.apply(NodePlugin::class)
        configure<NodeExtension> {
            version.set("20.19.0")
            pnpmVersion.set("9.x")
            nodeProjectDir.set(file("$rootDir/.node"))
            download.set(true)
        }
    }
}

publishing {
    publications {
        create<MavenPublication>("mavenJava") {
            pom {
                developers {
                    developer {
                        id.set("shubhamshinde225")
                        name.set("Shubham Shinde")
                        email.set("shubhamshinde225@gmail.com")
                    }
                }
            }
        }
    }
}