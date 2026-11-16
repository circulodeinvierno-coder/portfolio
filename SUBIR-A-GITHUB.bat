@echo off
setlocal
cd /d "%~dp0"
title Subir Circulo Invierno a GitHub

set "REPO="
for /f "delims=" %%i in ('git remote get-url origin 2^>nul') do set "REPO=%%i"

if "%REPO%"=="" (
    echo.
    echo Pega la direccion del repositorio de GitHub.
    echo Ejemplo: https://github.com/tu-usuario/portfolio.git
    echo.
    set /p REPO=Repositorio: 
)

if "%REPO%"=="" goto vacio

git remote remove origin >nul 2>nul
git remote add origin "%REPO%"
git branch -M main

echo.
echo Preparando cambios...
git add -A
git diff --cached --quiet
if errorlevel 1 (
    git commit -m "Actualizacion del sitio" >nul
    echo Cambios guardados en un commit nuevo.
) else (
    echo No hay cambios nuevos que guardar.
)

echo.
echo Subiendo a %REPO%
echo Si GitHub pide iniciar sesion, hazlo en la ventana que se abra.
echo.
git push -u origin main
if errorlevel 1 goto error

echo.
echo Listo: los cambios ya estan en GitHub.
echo Vercel va a reconstruir el sitio solo en unos segundos.
echo.
pause
exit /b 0

:vacio
echo.
echo No escribiste ninguna direccion.
pause
exit /b 1

:error
echo.
echo No se pudo subir. Revisa que el repositorio exista y que hayas iniciado sesion.
pause
exit /b 1
