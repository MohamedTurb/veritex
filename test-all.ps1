#!/usr/bin/env pwsh

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "Testing All Testing Tools" -ForegroundColor Cyan  
Write-Host "================================================" -ForegroundColor Cyan

Write-Host ""
Write-Host "1. Testing Vitest..." -ForegroundColor Yellow
npm run test 2>&1 | Select-String -Pattern "(passed|failed|test)" -ErrorAction SilentlyContinue | Select-Object -First 5

Write-Host ""
Write-Host "2. Testing Playwright..." -ForegroundColor Yellow
npm run e2e 2>&1 | Select-String -Pattern "(passed|failed|test)" -ErrorAction SilentlyContinue | Select-Object -First 5

Write-Host ""
Write-Host "3. Testing Cypress..." -ForegroundColor Yellow
npm run cy:run 2>&1 | Select-String -Pattern "(passed|failed|test)" -ErrorAction SilentlyContinue | Select-Object -First 5

Write-Host ""
Write-Host "4. Testing Postman (Newman)..." -ForegroundColor Yellow
npm run postman:run 2>&1 | Select-String -Pattern "(passed|failed|error)" -ErrorAction SilentlyContinue | Select-Object -First 5

Write-Host ""
Write-Host "5. Testing Selenium..." -ForegroundColor Yellow
npm run selenium:run 2>&1 | Select-String -Pattern "(passed|failed|error)" -ErrorAction SilentlyContinue | Select-Object -First 5

Write-Host ""
Write-Host "================================================" -ForegroundColor Green
Write-Host "Test Summary Complete" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green
