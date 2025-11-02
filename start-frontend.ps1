# Quick Start Script for Frontend
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "  Starting Frontend Setup" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

Set-Location frontend

Write-Host "Installing npm dependencies..." -ForegroundColor Yellow
Write-Host "(This may take a few minutes)" -ForegroundColor Gray
npm install

Write-Host ""
Write-Host "==================================" -ForegroundColor Green
Write-Host "  Frontend setup complete!" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Green
Write-Host ""
Write-Host "To run the development server:" -ForegroundColor Yellow
Write-Host "  npm run dev" -ForegroundColor White
Write-Host ""
