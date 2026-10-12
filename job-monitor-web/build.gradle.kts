import com.github.gradle.node.pnpm.task.PnpmTask
import org.gradle.kotlin.dsl.withType

description = "UI for Job Monitor, providing real-time job tracking and status APIs."

tasks.withType(PnpmTask::class) {
    workingDir.set(file("${project.projectDir}"))
}

tasks {
    // Install dependencies
    val installDeps by registering(PnpmTask::class) {
        args = listOf("install")
    }

    val webpack by registering(PnpmTask::class) {
        dependsOn(installDeps)
        args = listOf("build")
        environment.put("NODE_ENV", "production")
    }

    jar {
        dependsOn(webpack)
        from("out") {
            into("/META-INF/resources")
        }
    }

    clean {
        delete("build")
        delete(".next")
        delete("out")
        delete("node_modules")
        delete("yarn-error.log")
    }
}
