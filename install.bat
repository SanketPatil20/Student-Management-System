@echo off
echo 🎓 Student Management System - Installation Script
echo ==================================================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js v16 or higher.
    pause
    exit /b 1
)

echo ✅ Node.js version: 
node --version

REM Install backend dependencies
echo 📦 Installing backend dependencies...
npm install

if %errorlevel% neq 0 (
    echo ❌ Failed to install backend dependencies
    pause
    exit /b 1
)

REM Install frontend dependencies
echo 📦 Installing frontend dependencies...
cd client
npm install

if %errorlevel% neq 0 (
    echo ❌ Failed to install frontend dependencies
    pause
    exit /b 1
)

cd ..

REM Create .env file if it doesn't exist
if not exist .env (
    echo 🔧 Creating .env file...
    (
        echo PORT=5000
        echo MONGODB_URI=mongodb://localhost:27017/student-management
        echo NODE_ENV=development
    ) > .env
    echo ✅ .env file created
) else (
    echo ✅ .env file already exists
)

echo.
echo 🎉 Installation completed successfully!
echo.
echo 🚀 To start the application:
echo    npm run dev:full
echo.
echo 📚 For more information, see setup.md
echo.
echo 🌐 Access points:
echo    Frontend: http://localhost:4200
echo    Backend:  http://localhost:5000
echo.
pause
