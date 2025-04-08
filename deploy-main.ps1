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