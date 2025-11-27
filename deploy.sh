#!/bin/bash

# Deployment Script for Calzone Financial Services

echo "=========================================="
echo "Starting Build Process"
echo "=========================================="

# 1. Build Backend
echo "[1/2] Building Backend (Spring Boot)..."
cd backend
if [ -f "mvnw" ]; then
    ./mvnw clean package -DskipTests
else
    mvn clean package -DskipTests
fi

if [ $? -ne 0 ]; then
    echo "Backend build failed!"
    exit 1
fi
cd ..

# 2. Build Frontend
echo "[2/2] Building Frontend (React/Vite)..."
cd frontend
npm install
npm run build

if [ $? -ne 0 ]; then
    echo "Frontend build failed!"
    exit 1
fi
cd ..

echo "=========================================="
echo "Build Complete Successfully!"
echo "Backend JAR: backend/target/financial-backend-0.0.1-SNAPSHOT.jar"
echo "Frontend Dist: frontend/dist"
echo "=========================================="
