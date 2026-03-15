use std::fmt;

// ── HTTP result ─────────────────────────────────────────────────────

/// Mirrors the Java `HttpResult` record.
pub struct HttpResult {
    pub code: i32,
    pub body: Option<String>,
    pub error: Option<String>,
}

impl HttpResult {
    pub fn is_success(&self) -> bool {
        self.error.is_none() && self.code < 400
    }
}

impl fmt::Display for HttpResult {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        if let Some(ref err) = self.error {
            write!(f, "ERROR: {err}")
        } else {
            write!(
                f,
                "Response Code: {}\nStatus: {}",
                self.code,
                self.body.as_deref().unwrap_or("")
            )
        }
    }
}

// ── HTTP GET ────────────────────────────────────────────────────────

pub fn get(url: &str) -> HttpResult {
    match reqwest::blocking::Client::new()
        .get(url)
        .header("Content-Type", "application/json")
        .send()
    {
        Ok(resp) => {
            let code = resp.status().as_u16() as i32;
            let body = resp.text().unwrap_or_default();
            HttpResult {
                code,
                body: Some(body),
                error: None,
            }
        }
        Err(e) => map_reqwest_error(url, e),
    }
}

// ── HTTP POST ───────────────────────────────────────────────────────

pub fn post(url: &str, json_body: &serde_json::Value) -> HttpResult {
    match reqwest::blocking::Client::new()
        .post(url)
        .header("Content-Type", "application/json")
        .json(json_body)
        .send()
    {
        Ok(resp) => {
            let code = resp.status().as_u16() as i32;
            let body = resp.text().unwrap_or_default();
            HttpResult {
                code,
                body: Some(body),
                error: None,
            }
        }
        Err(e) => map_reqwest_error(url, e),
    }
}

// ── Error mapping (mirrors Java error codes) ────────────────────────

fn map_reqwest_error(url: &str, e: reqwest::Error) -> HttpResult {
    if e.is_connect() {
        HttpResult {
            code: 2,
            body: None,
            error: Some(format!("Could not connect to server: {url} | {e}")),
        }
    } else if e.is_timeout() {
        HttpResult {
            code: 3,
            body: None,
            error: Some(format!("Connection timed out: {url} | {e}")),
        }
    } else {
        HttpResult {
            code: 4,
            body: None,
            error: Some(format!("I/O error: {e}")),
        }
    }
}
