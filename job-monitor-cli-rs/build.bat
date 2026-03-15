@echo off
setlocal

echo ============================================
echo   JobMonitor CLI - Rust Build Script
echo ============================================
echo.

:: Set up PATH for Rust and MinGW
set "PATH=%USERPROFILE%\.cargo\bin;D:\Installations\mingw64\bin;%PATH%"

:: Verify cargo is available
where cargo >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo ERROR: cargo not found. Please install Rust from https://rustup.rs
    exit /b 1
)

:: Navigate to project directory
cd /d "%~dp0"

echo [1/2] Cleaning previous build...
cargo clean
echo.

echo [2/2] Building release binary...
cargo build --release
if %ERRORLEVEL% neq 0 (
    echo.
    echo ERROR: Build failed!
    exit /b 1
)

echo.
echo ============================================
echo   Build successful!
echo   Binary: target\release\job-monitor-cli.exe
echo ============================================

:: Show binary size
for %%F in (target\release\job-monitor-cli.exe) do (
    set "SIZE=%%~zF"
)
set /a SIZE_KB=%SIZE% / 1024
echo   Size:   %SIZE_KB% KB
echo.

endlocal
