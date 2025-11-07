@echo off
echo Installing server dependencies...
cd server
call npm install
echo.
echo Starting server...
node server.js

