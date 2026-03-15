use std::env;

// ── Default constants ───────────────────────────────────────────────
pub const DEFAULT_SERVER_URL: &str = "http://localhost:8080";
pub const DEFAULT_MONITOR_API_PATH: &str = "/api/v1/monitor";
pub const DEFAULT_STATUS_API_PATH: &str = "/api/v1/status";

// ── Config helpers ──────────────────────────────────────────────────

/// Returns the job-monitor server base URL from `JOB_MONITOR_SERVER_URL`,
/// falling back to [`DEFAULT_SERVER_URL`].
pub fn server_url() -> String {
    env_or_default("JOB_MONITOR_SERVER_URL", DEFAULT_SERVER_URL)
}

/// Returns the monitor API endpoint (base URL + path).
pub fn monitor_url() -> String {
    format!("{}{}", server_url(), DEFAULT_MONITOR_API_PATH)
}

/// Returns the status API endpoint (base URL + path).
pub fn status_url() -> String {
    format!("{}{}", server_url(), DEFAULT_STATUS_API_PATH)
}

fn env_or_default(key: &str, default: &str) -> String {
    match env::var(key) {
        Ok(val) if !val.trim().is_empty() => val,
        _ => default.to_string(),
    }
}
