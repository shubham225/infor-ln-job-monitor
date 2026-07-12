use std::collections::HashMap;
use std::fs;
use std::io;
use std::path::Path;

/// Parses a simple INI file into a nested `HashMap<section, HashMap<key, value>>`.
pub fn parse_ini_file(path: &Path) -> io::Result<HashMap<String, HashMap<String, String>>> {
    let content = fs::read_to_string(path)?;
    let mut result: HashMap<String, HashMap<String, String>> = HashMap::new();
    let mut current_section: Option<String> = None;

    for line in content.lines() {
        let line = line.trim();

        // Skip empty lines and comments
        if line.is_empty() || line.starts_with(';') || line.starts_with('#') {
            continue;
        }

        // Section header: [SectionName]
        if line.starts_with('[') && line.ends_with(']') {
            let section = line[1..line.len() - 1].to_string();
            result.entry(section.clone()).or_default();
            current_section = Some(section);
            continue;
        }

        // Key=Value pair inside a section
        if let Some(ref section) = current_section {
            if let Some((key, value)) = line.split_once('=') {
                result
                    .get_mut(section)
                    .unwrap()
                    .insert(key.trim().to_string(), value.trim().to_string());
            }
        }
    }

    Ok(result)
}

/// Extracts the `BSE_COMPNR` value from a command-line string.
pub fn extract_company(command_line: &str) -> String {
    const KEY: &str = "BSE_COMPNR=";

    if let Some(idx) = command_line.find(KEY) {
        let start = idx + KEY.len();
        let rest = &command_line[start..];
        let end = rest.find(' ').unwrap_or(rest.len());
        rest[..end].trim().to_string()
    } else {
        "UNKNOWN".to_string()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_extract_company_found() {
        let cmd = "some_program BSE_COMPNR=550 --flag";
        assert_eq!(extract_company(cmd), "550");
    }

    #[test]
    fn test_extract_company_at_end() {
        let cmd = "some_program BSE_COMPNR=999";
        assert_eq!(extract_company(cmd), "999");
    }

    #[test]
    fn test_extract_company_missing() {
        let cmd = "some_program --flag";
        assert_eq!(extract_company(cmd), "UNKNOWN");
    }
}
