# Quick Start Script for Backend
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "  Starting Backend Setup" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

Set-Location backend

Write-Host "Creating virtual environment..." -ForegroundColor Yellow
python -m venv venv

Write-Host "Activating virtual environment..." -ForegroundColor Yellow
& .\venv\Scripts\Activate.ps1

Write-Host "Installing dependencies..." -ForegroundColor Yellow
pip install -r requirements.txt

Write-Host ""
Write-Host "==================================" -ForegroundColor Green
Write-Host "  Backend setup complete!" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Green
Write-Host ""
Write-Host "To run the backend server:" -ForegroundColor Yellow
Write-Host "  python main.py" -ForegroundColor White
Write-Host ""
