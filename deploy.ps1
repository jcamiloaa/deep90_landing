# Guardar la rama actual
$currentBranch = git branch --show-current

# Verificar si hay cambios pendientes por sincronizar con main
Write-Host "Verificando sincronización con la rama main..." -ForegroundColor Yellow
git fetch origin

# Verificar si estamos en main o no
if ($currentBranch -eq "main") {
    # Si estamos en main, verificar si hay cambios locales sin subir
    $localChanges = git status --porcelain
    if ($localChanges) {
        $confirm = Read-Host "Hay cambios locales sin subir a main. ¿Deseas continuar con el deploy? (s/n)"
        if ($confirm -ne "s") {
            Write-Host "Despliegue cancelado. Por favor, sube tus cambios a main primero." -ForegroundColor Red
            exit 1
        }
    }
} else {
    # Si no estamos en main, verificar si la rama actual está actualizada con main
    git checkout main
    git pull origin main
    git checkout $currentBranch
    
    $behindMain = git rev-list --count "$currentBranch..main"
    $aheadOfMain = git rev-list --count "main..$currentBranch"
    
    if ($behindMain -gt 0) {
        Write-Host "ADVERTENCIA: La rama actual está $behindMain commits por detrás de main." -ForegroundColor Yellow
        $confirm = Read-Host "Es recomendable actualizar desde main antes de desplegar. ¿Deseas continuar con el deploy? (s/n)"
        if ($confirm -ne "s") {
            Write-Host "Despliegue cancelado. Por favor, actualiza tu rama desde main primero." -ForegroundColor Red
            exit 1
        }
    }
    
    if ($aheadOfMain -gt 0) {
        Write-Host "ADVERTENCIA: La rama actual tiene $aheadOfMain commits por delante de main que no han sido integrados." -ForegroundColor Yellow
        $confirm = Read-Host "Es recomendable integrar tus cambios en main antes de desplegar. ¿Deseas continuar con el deploy? (s/n)"
        if ($confirm -ne "s") {
            Write-Host "Despliegue cancelado. Por favor, integra tus cambios a main primero." -ForegroundColor Red
            exit 1
        }
    }
}

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