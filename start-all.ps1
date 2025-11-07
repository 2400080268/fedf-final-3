# Virtual Art Gallery - Start Script
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Starting Virtual Art Gallery Application" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Change to script directory
Set-Location $PSScriptRoot

# Check and install server dependencies
Write-Host "[1/2] Installing server dependencies..." -ForegroundColor Yellow
Set-Location server
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing server dependencies, please wait..." -ForegroundColor Yellow
    npm install
} else {
    Write-Host "Server dependencies already installed." -ForegroundColor Green
}
Set-Location ..

Write-Host ""

# Check and install client dependencies
Write-Host "[2/2] Installing client dependencies..." -ForegroundColor Yellow
Set-Location client
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing client dependencies, please wait..." -ForegroundColor Yellow
    npm install
} else {
    Write-Host "Client dependencies already installed." -ForegroundColor Green
}
Set-Location ..

Write-Host ""

# Start Backend Server
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Starting Backend Server (Port 5000)..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\server'; node server.js" -WindowStyle Normal

Start-Sleep -Seconds 3

# Start React App
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Starting React App (Port 3000)..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\client'; npm start" -WindowStyle Normal

Write-Host ""
Write-Host "Waiting for servers to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "Both servers are starting!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host "Backend: http://localhost:5000" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Opening React app in browser..." -ForegroundColor Yellow

# Open browser
Start-Process "http://localhost:3000"

Write-Host ""
Write-Host "Browser opened! Keep both PowerShell windows open while using the app." -ForegroundColor Green
Write-Host "Press any key to exit this window (servers will keep running)..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

