# Calzone Financial Services (BisFilling) - Complete Project Documentation

## 1. Project Overview
Calzone Financial Services (internally "BisFilling") is a comprehensive B2B/B2C platform designed to provide financial and legal services similar to Vakilsearch. It facilitates business registration, tax filing, and other compliance services. The application features a robust backend for managing users, orders, and payments, and a modern, responsive frontend for client interaction.

## 2. Technology Stack

### Backend
- **Framework**: Spring Boot 3.3.4
- **Language**: Java 21
- **Build Tool**: Maven
- **Database**: MySQL 8.0 (Production), H2 (Dev/Test)
- **Security**: Spring Security with JWT (JSON Web Tokens)
- **ORM**: Hibernate / Spring Data JPA
- **External Services**:
  - **Payment**: Razorpay
  - **SMS**: Twilio
  - **Email**: SMTP (Gmail)
  - **Storage**: AWS S3 (configured but optional)

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite 5.0
- **Styling**: Tailwind CSS 3.4, Styled Components
- **State Management**: React Context / Local State
- **Routing**: React Router DOM 6
- **HTTP Client**: Axios
- **UI Components**: Headless UI, Heroicons, React Icons, Framer Motion (Animations)
- **Charts**: Recharts

## 3. System Architecture
The application follows a standard client-server architecture:

1.  **Client (Frontend)**: A Single Page Application (SPA) built with React. It communicates with the backend via RESTful APIs.
2.  **Server (Backend)**: A Spring Boot application exposing REST endpoints. It handles business logic, authentication, and data persistence.
3.  **Database**: MySQL stores user data, orders, transactions, and application state.
4.  **Third-Party APIs**:
    - **Razorpay**: Handles payment processing.
    - **Twilio**: Sends OTPs for phone verification.
    - **Gmail SMTP**: Sends email notifications.

## 4. Prerequisites
Ensure the following are installed on your development machine:
- **Java Development Kit (JDK) 21**
- **Maven 3.8+**
- **Node.js 18+ & npm**
- **MySQL Server 8.0**
- **Git**

## 5. Setup & Installation

### 5.1. Database Setup
1.  Install and start MySQL Server.
2.  Create a database named `calkit_db`.
    ```sql
    CREATE DATABASE calkit_db;
    ```
3.  (Optional) The application is configured to automatically update the schema (`spring.jpa.hibernate.ddl-auto=update`).

### 5.2. Backend Setup
1.  Navigate to the `backend` directory.
    ```bash
    cd backend
    ```
2.  Configure `src/main/resources/application.properties`:
    - Update `spring.datasource.username` and `spring.datasource.password` with your MySQL credentials.
    - Configure JWT secret, Mail, Razorpay, and Twilio keys if needed.
3.  Build the application.
    ```bash
    mvn clean install
    ```
4.  Run the application.
    ```bash
    mvn spring-boot:run
    ```
    The backend will start on `http://localhost:8080`.

### 5.3. Frontend Setup
1.  Navigate to the `frontend` directory.
    ```bash
    cd frontend
    ```
2.  Install dependencies.
    ```bash
    npm install
    ```
3.  Create a `.env` file (if not exists) and configure the backend URL.
    ```env
    VITE_API_URL=http://localhost:8080
    ```
4.  Run the development server.
    ```bash
    npm run dev
    ```
    The frontend will start on `http://localhost:5173` (or similar).

## 6. Configuration Guide

### Backend (`application.properties`)
| Property | Description | Default |
|----------|-------------|---------|
| `server.port` | Port for the backend server | `8080` |
| `spring.datasource.url` | JDBC URL for MySQL | `jdbc:mysql://localhost:3306/calkit_db...` |
| `security.jwt.secret` | Secret key for signing JWTs | (Change in Prod) |
| `spring.mail.*` | SMTP configuration for emails | Gmail SMTP |
| `razorpay.*` | Razorpay API keys | Env Vars |
| `twilio.*` | Twilio API keys | Env Vars |

### Frontend (`.env`)
| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Base URL for backend API | `http://localhost:8080` |

## 7. Deployment

### Docker Deployment
A `docker-compose.yml` is provided for containerized deployment.
1.  Ensure Docker and Docker Compose are installed.
2.  Run `docker-compose up --build -d`.

### Manual Deployment (Linux/Ubuntu)
1.  **Backend**:
    - Build JAR: `mvn clean package -DskipTests`.
    - Run JAR: `java -jar target/financial-backend-0.0.1-SNAPSHOT.jar`.
    - Use `systemd` to keep it running.
2.  **Frontend**:
    - Build static files: `npm run build`.
    - Serve the `dist` folder using Nginx or Apache.
    - Configure Nginx to proxy API requests to `localhost:8080`.

## 8. API Documentation
The backend exposes REST endpoints. (Enable Swagger/OpenAPI in `pom.xml` for auto-generated docs).

- **Auth**: `/api/auth/login`, `/api/auth/register`
- **Users**: `/api/users/profile`, `/api/users/{id}`
- **Services**: `/api/services`
- **Orders**: `/api/orders`

## 9. Troubleshooting
- **CORS Errors**: Ensure `@CrossOrigin` is configured in Controllers or `SecurityConfig`.
- **Database Connection**: Check MySQL service status and credentials in `application.properties`.
- **Port Conflicts**: Ensure ports 8080 and 5173 are free.
