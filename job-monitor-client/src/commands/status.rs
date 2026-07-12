use std::process;

use crate::config;
use crate::http_util;

/// Checks the status of the job-monitor service.
pub fn run() {
    let server_url = config::status_url();

    // Send GET request
    let result = http_util::get(&server_url);

    if !result.is_success() {
        eprintln!("ERROR: {}", result.error.as_deref().unwrap_or("Unknown error"));
        process::exit(result.code);
    }

    println!("Response Code: {}", result.code);
    println!("Status: {}", result.body.as_deref().unwrap_or(""));
}
