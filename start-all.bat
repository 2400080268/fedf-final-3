@echo off
cd /d "%~dp0"
echo ========================================
echo Starting Virtual Art Gallery Application
echo ========================================
echo.

echo [1/2] Installing server dependencies...
cd server
if not exist node_modules (
    echo Installing server dependencies, please wait...
    call npm install
) else (
    echo Server dependencies already installed.
)
cd ..
echo.

echo [2/2] Installing client dependencies...
cd client
if not exist node_modules (
    echo Installing client dependencies, please wait...
    call npm install
) else (
    echo Client dependencies already installed.
)
cd ..
echo.

echo ========================================
echo Starting Backend Server (Port 5000)...
echo ========================================
start "Art Gallery - Backend Server" cmd /k "cd /d %~dp0server && node server.js"
timeout /t 3 /nobreak > nul

echo ========================================
echo Starting React App (Port 3000)...
echo ========================================
start "Art Gallery - React Client" cmd /k "cd /d %~dp0client && npm start"
timeout /t 8 /nobreak > nul

echo.
echo ========================================
echo Both servers are starting!
echo ========================================
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Opening React app in browser...
timeout /t 2 /nobreak > nul
cmd /c start http://localhost:3000
echo.
echo Browser should open automatically!
echo Keep both command windows open while using the app.
echo.
echo You can also manually open: http://localhost:3000
echo.
pause

