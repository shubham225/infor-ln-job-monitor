#!/usr/bin/env bash

set -e

echo "============================================"
echo "  JobMonitor CLI - Rust Build Script"
echo "============================================"
echo

# Ensure cargo exists
if ! command -v cargo >/dev/null 2>&1; then
    echo "ERROR: cargo not found. Please install Rust from https://rustup.rs"
    exit 1
fi

# Navigate to project directory (directory where script is located)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "[1/2] Cleaning previous build..."
cargo clean
echo

echo "[2/2] Building release binary..."
if ! cargo build --release; then
    echo
    echo "ERROR: Build failed!"
    exit 1
fi

echo
echo "============================================"
echo "  Build successful!"
echo "  Binary: target/release/job-monitor-cli"
echo "============================================"

# Show binary size
if [ -f target/release/job-monitor-cli ]; then
    SIZE=$(stat -c%s target/release/job-monitor-cli)
    SIZE_KB=$((SIZE / 1024))
    echo "  Size:   ${SIZE_KB} KB"
fi

echo