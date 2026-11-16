@echo off
setlocal
cd /d "%~dp0"
title Circulo Invierno - vista local

where npm >nul 2>nul
if errorlevel 1 goto sinnode

if not exist "node_modules\react\package.json" (
    echo.
    echo Instalando dependencias. La primera vez puede tardar unos minutos...
    echo.
    call npm install
    if errorlevel 1 goto fallo
)

echo.
echo Abriendo la web en http://localhost:3000
echo Para detener el servidor, cierra esta ventana.
echo.
start "" powershell -NoProfile -WindowStyle Hidden -Command "Start-Sleep -Seconds 6; Start-Process 'http://localhost:3000'"
call npm run dev
if errorlevel 1 goto fallo
exit /b 0

:sinnode
echo.
echo No se encontro Node.js en este computador.
echo Instalalo desde https://nodejs.org (version LTS) y vuelve a ejecutar este archivo.
echo.
pause
exit /b 1

:fallo
echo.
echo No se pudo iniciar la web.
echo Revisa que Node.js este instalado escribiendo:  node -v
echo.
pause
exit /b 1
