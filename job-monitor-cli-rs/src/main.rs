mod commands;
mod config;
mod file_utils;
mod http_util;

use clap::{Parser, Subcommand};

use commands::monitor::MonitorArgs;

const VERSION: &str = env!("CARGO_PKG_VERSION");

/// A command-line interface for managing and interacting with the job-monitor service.
#[derive(Parser)]
#[command(
    name = "job-monitor-cli",
    version = VERSION,
    about = "A command-line interface for managing and interacting with the job-monitor service."
)]
struct Cli {
    #[command(subcommand)]
    command: Option<Commands>,
}

#[derive(Subcommand)]
enum Commands {
    /// Registers a job with the job-monitor service for real-time monitoring.
    Monitor(MonitorArgs),

    /// Checks the status of the job-monitor service.
    Status,
}

fn main() {
    let cli = Cli::parse();

    match cli.command {
        Some(Commands::Monitor(args)) => commands::monitor::run(&args),
        Some(Commands::Status) => commands::status::run(),
        None => {
            println!("Use a subcommand: monitor, status");
            println!("Run with --help for more information.");
        }
    }
}
