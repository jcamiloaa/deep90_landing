# Guardar la rama actual
$currentBranch = git branch --show-current

# Instalar dependencias
Write-Host "Instalando dependencias..." -ForegroundColor Yellow
npm install

# Construir el sitio
Write-Host "Construyendo el sitio..." -ForegroundColor Yellow
npm run build

# Crear carpeta temporal
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$tempDir = "..\temp_deploy_$timestamp"
New-Item -ItemType Directory -Path $tempDir -Force | Out-Null

# Copiar archivos de dist a carpeta temporal
Copy-Item -Path ".\dist\*" -Destination $tempDir -Recurse -Force

# Verificar si existe la rama deploy
$branchExists = git show-ref --verify --quiet refs/heads/deploy
if ($LASTEXITCODE -eq 0) {
    git checkout deploy
} else {
    git checkout --orphan deploy
    git rm -rf .
}

# Eliminar todo excepto .git
Get-ChildItem -Force | Where-Object { $_.Name -ne ".git" } | Remove-Item -Recurse -Force

# Copiar contenido de dist a directorio actual
Copy-Item -Path "$tempDir\*" -Destination "." -Recurse -Force

# Añadir y hacer commit
git add .
git commit -m "Deploy website $(Get-Date)"

# Push forzado
git push -f origin deploy

# Volver a la rama original
git checkout $currentBranch

# Eliminar directorio temporal
Remove-Item -Path $tempDir -Recurse -Force

Write-Host "Despliegue completado. La rama 'deploy' ahora contiene solo el contenido de 'dist'." -ForegroundColor Green