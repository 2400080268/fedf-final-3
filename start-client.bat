@echo off
echo Installing client dependencies...
cd client
call npm install
echo.
echo Starting React app...
call npm start

