# Deployment Guide for Calzone Financial Services

This guide provides step-by-step instructions for deploying the Calzone Financial Services application to a production environment (e.g., Ubuntu Server).

## 1. Server Preparation

### 1.1. Update System
```bash
sudo apt update && sudo apt upgrade -y
```

### 1.2. Install Dependencies
You need Java 21, Maven, Node.js, Nginx, and MySQL.

**Install Java 21:**
```bash
sudo apt install openjdk-21-jdk -y
java -version
```

**Install Maven:**
```bash
sudo apt install maven -y
mvn -version
```

**Install Node.js (LTS):**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
node -v
```

**Install MySQL:**
```bash
sudo apt install mysql-server -y
sudo systemctl start mysql
sudo systemctl enable mysql
```

**Install Nginx:**
```bash
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx
```

## 2. Database Setup

1.  Log in to MySQL:
    ```bash
    sudo mysql -u root -p
    ```
2.  Create Database and User:
    ```sql
    CREATE DATABASE calkit_db;
    CREATE USER 'app_user'@'localhost' IDENTIFIED BY 'StrongPassword123!';
    GRANT ALL PRIVILEGES ON calkit_db.* TO 'app_user'@'localhost';
    FLUSH PRIVILEGES;
    EXIT;
    ```

## 3. Backend Deployment

### 3.1. Configure Application
1.  Navigate to `backend/src/main/resources/application.properties`.
2.  Update database credentials:
    ```properties
    spring.datasource.username=app_user
    spring.datasource.password=StrongPassword123!
    ```
3.  Set `spring.jpa.hibernate.ddl-auto=update` (or `validate` for strict prod).

### 3.2. Build JAR
```bash
cd backend
mvn clean package -DskipTests
```
This creates a JAR file in `target/financial-backend-0.0.1-SNAPSHOT.jar`.

### 3.3. Create Systemd Service
Create a service to keep the backend running.
```bash
sudo nano /etc/systemd/system/calzone-backend.service
```
Content:
```ini
[Unit]
Description=Calzone Backend Service
After=network.target mysql.service

[Service]
User=ubuntu
ExecStart=/usr/bin/java -jar /path/to/your/project/backend/target/financial-backend-0.0.1-SNAPSHOT.jar
SuccessExitStatus=143
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```
*Replace `/path/to/your/project` and `User` with actual values.*

Start the service:
```bash
sudo systemctl daemon-reload
sudo systemctl start calzone-backend
sudo systemctl enable calzone-backend
```

## 4. Frontend Deployment

### 4.1. Build Frontend
1.  Navigate to `frontend`.
2.  Create `.env` for production:
    ```bash
    nano .env
    ```
    Content:
    ```env
    VITE_API_BASE_URL=http://your-domain.com/api
    ```
3.  Install and Build:
    ```bash
    npm install
    npm run build
    ```
    This creates a `dist` folder.

### 4.2. Configure Nginx
Create an Nginx config file.
```bash
sudo nano /etc/nginx/sites-available/calzone
```
Content:
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    root /path/to/your/project/frontend/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```
Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/calzone /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## 5. Verification
- Visit `http://your-domain.com` to see the frontend.
- API requests should correctly route to the backend.
- Check backend logs: `sudo journalctl -u calzone-backend -f`.
