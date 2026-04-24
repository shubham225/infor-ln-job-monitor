use std::path::Path;
use std::process;

use clap::Args;
use serde_json::json;

use crate::config;
use crate::file_utils;
use crate::http_util;

/// Registers a job with the job-monitor service for real-time monitoring.
#[derive(Args)]
pub struct MonitorArgs {
    /// Job name
    #[arg(short = 'j', long = "job")]
    job_name: String,

    /// BWC file path
    #[arg(short = 'b', long = "bwc")]
    bwc_file_path: String,
}

impl MonitorArgs {
    pub fn execute(&self) -> i32 {
        let server_url = config::monitor_url();
        let bwc_path = Path::new(&self.bwc_file_path);

        // Parse INI file
        let data = match file_utils::parse_ini_file(bwc_path) {
            Ok(d) => d,
            Err(e) => {
                eprintln!("ERROR: I/O error while reading BWC file.");
                eprintln!("Reason: {e}");
                return 1;
            }
        };

        // Helper to safely extract a value from the parsed INI data
        let get = |section: &str, key: &str| -> String {
            data.get(section)
                .and_then(|s| s.get(key))
                .cloned()
                .unwrap_or_else(|| {
                    eprintln!("WARNING: [{section}].{key} not found in BWC file.");
                    String::new()
                })
        };

        let bse = get("ApplicationServer", "bse");
        let command = get("ApplicationServer", "command");
        let hostname = get("Remote", "hostname");
        let username = get("Remote", "username");

        let bse_company = file_utils::extract_company(&command);

        let payload = json!({
            "jobName":     self.job_name,
            "commandLine": command,
            "bseCompany":  bse_company,
            "user":        username,
            "bwHostName":  hostname,
            "bse":         bse,
        });

        // Send POST request
        let result = http_util::post(&server_url, &payload);

        if !result.is_success() {
            eprintln!("ERROR: {}", result.error.as_deref().unwrap_or("Unknown error"));
            return result.code;
        }

        println!("Response Code: {}", result.code);
        println!("Status: {}", result.body.as_deref().unwrap_or(""));

        0
    }
}

pub fn run(args: &MonitorArgs) {
    let code = args.execute();
    if code != 0 {
        process::exit(code);
    }
}
