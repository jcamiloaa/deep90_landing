#!/usr/bin/env powershell

# Instalar dependencias si no están instaladas
Write-Host "Verificando dependencias..." -ForegroundColor Yellow
npm install

# Iniciar el servidor de desarrollo
Write-Host "Iniciando servidor de desarrollo..." -ForegroundColor Green
npm run start