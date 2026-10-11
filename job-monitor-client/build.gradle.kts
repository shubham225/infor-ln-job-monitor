import org.gradle.internal.os.OperatingSystem

description = "Rust based client app to interact with JobMonitor server."

val os = OperatingSystem.current()

val buildClient by tasks.registering(Exec::class) {
    description = "Build rust binaries"
    workingDir = project.projectDir

    when {
        os.isWindows -> {
            commandLine(
                "cmd",
                "/c",
                file("build.cmd").absolutePath
            )
        }
        else -> {
            commandLine(
                "bash",
                file("build.sh").absolutePath
            )
        }
    }

    // Re-run when the Rust sources or build scripts change.
    inputs.files(fileTree(projectDir) {
        exclude("target/**", ".gradle/**")
    })

    outputs.dir(layout.projectDirectory.dir("target"))
}

tasks.register("assemble") {
    dependsOn(buildClient)
}

tasks.register("build") {
    dependsOn(buildClient)
}

tasks.register("clean") {
    delete("target")
}