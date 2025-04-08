#!/usr/bin/env powershell

# Guardar la rama actual
$currentBranch = git branch --show-current

# Comprobar que estamos en la rama main
if ($currentBranch -ne "main") {
    $switchToBranch = Read-Host "No estás en la rama main. ¿Quieres cambiar a main? (s/n)"
    if ($switchToBranch -eq "s") {
        git checkout main
        if ($LASTEXITCODE -ne 0) {
            Write-Host "No se pudo cambiar a la rama main. Abortando." -ForegroundColor Red
            exit 1
        }
    } else {
        Write-Host "Operación cancelada." -ForegroundColor Yellow
        exit 0
    }
}

# Verificar si hay cambios remotos que no están en local
Write-Host "Verificando si hay cambios remotos..." -ForegroundColor Yellow
git fetch origin main

$behindOrigin = git rev-list --count "HEAD..origin/main"
if ($behindOrigin -gt 0) {
    Write-Host "ADVERTENCIA: Tu rama local está $behindOrigin commits por detrás de origin/main." -ForegroundColor Yellow
    $confirm = Read-Host "Es necesario actualizar el repositorio local antes de continuar. ¿Deseas hacer pull ahora? (s/n)"
    if ($confirm -eq "s") {
        git pull origin main
        if ($LASTEXITCODE -ne 0) {
            Write-Host "Error al actualizar desde origin/main. Abortando." -ForegroundColor Red
            exit 1
        }
    } else {
        Write-Host "Operación cancelada. Por favor, actualiza tu repositorio local primero." -ForegroundColor Red
        exit 1
    }
}

# Verificar si hay cambios locales sin agregar o commitear
$localChanges = git status --porcelain
if ($localChanges) {
    Write-Host "ADVERTENCIA: Hay cambios locales sin agregar o commitear:" -ForegroundColor Yellow
    Write-Host $localChanges
    $confirm = Read-Host "¿Deseas incluir estos cambios en el deploy? (s/n)"
    if ($confirm -ne "s") {
        Write-Host "Operación cancelada. Resuelve los cambios pendientes antes de continuar." -ForegroundColor Red
        exit 1
    }
}

# Solicitar mensaje de commit
$commitMessage = Read-Host "Introduce el mensaje del commit"
if ([string]::IsNullOrWhiteSpace($commitMessage)) {
    $commitMessage = "Actualización del proyecto"
}

# Agregar fecha al mensaje
$dateFormatted = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
$commitMessage = "$commitMessage ($dateFormatted)"

# Añadir todos los cambios
git add .

# Hacer commit con el mensaje
git commit -m "$commitMessage"

# Subir cambios a origin main
git push -u origin main

Write-Host "Cambios subidos a la rama main con el mensaje: $commitMessage" -ForegroundColor Green

# Preguntar si quiere hacer deploy inmediatamente
$doDeploy = Read-Host "¿Quieres hacer deploy ahora? (s/n)"
if ($doDeploy -eq "s") {
    Write-Host "Iniciando script de deploy..." -ForegroundColor Green
    & "$PSScriptRoot\deploy.ps1"
} else {
    Write-Host "Deploy no realizado. Puedes ejecutar deploy.ps1 manualmente cuando lo desees." -ForegroundColor Yellow
}