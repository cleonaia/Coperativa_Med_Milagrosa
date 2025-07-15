@echo off
title Servidor Web - Cooperativa Medalla Milagrosa
color 0A
cd /d "%~dp0"
echo.
echo ====================================
echo    SERVIDOR WEB COOPERATIVA
echo    MEDALLA MILAGROSA
echo ====================================
echo.
echo Iniciando servidor local...
echo.
echo URL: http://localhost:8000
echo.
echo Presiona Ctrl+C para detener
echo ====================================
echo.
start "" "http://localhost:8000"
python -m http.server 8000
pause
