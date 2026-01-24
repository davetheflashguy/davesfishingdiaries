# Dave's Fishing Diaries

A full-stack application for managing and sharing fishing diary entries.

## Services

The application consists of three main services:

### Database (PostgreSQL)
- **Port**: 5433
- **Container**: davesfishingdiaries_db
- **Image**: postgres:16
- Stores all application data
- Initialized with SQL scripts from the `db/` folder

### Backend API (FastAPI)
- **Port**: 8000
- **Container**: davesfishingdiaries_api
- **URL**: http://localhost:8000
- Built with Python FastAPI
- Connects to the PostgreSQL database
- Provides REST API endpoints for the UI
- Main file: `backend/main.py`

### Frontend UI (Angular + Nginx)
- **Port**: 80
- **Container**: davesfishingdiaries_ui
- **URL**: http://localhost
- Angular-based single-page application
- Served by Nginx with proper routing and caching
- Built files served from `ui/app/dist/`

## Prerequisites

- Docker
- Docker Compose
- (Optional) Node.js 20+ for local Angular development
- (Optional) Python 3.10+ for local backend development

## Getting Started

### 1. Environment Setup

Create a `.env` file in the project root with the following variables:

```env
POSTGRES_USER=your_db_user
POSTGRES_PASSWORD=your_db_password
POSTGRES_DB=fishingdb
POSTGRES_HOST=db
POSTGRES_PORT=5432
```

### 2. Run with Docker Compose

Start all services:

```bash
docker-compose up --build
```

To run in the background:

```bash
docker-compose up -d --build
```

### 3. Access the Application

Once all services are running:

- **Frontend UI**: http://localhost
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs (Swagger UI)

### 4. Stop the Services

```bash
docker-compose down
```

To also remove volumes:

```bash
docker-compose down -v
```

## Project Structure

```
davesfishingdiaries/
├── backend/               # FastAPI backend
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   ├── requirements.txt
│   ├── Dockerfile
│   └── routers/          # API route modules
│       └── about_me.py
├── ui/                   # Angular frontend
│   ├── app/
│   │   ├── src/         # Angular source code
│   │   ├── angular.json
│   │   ├── nginx.conf   # Nginx configuration
│   │   └── package.json
│   └── Dockerfile
├── db/                   # Database initialization
│   ├── 001_schema.sql
│   └── 002_seed.sql
├── docker-compose.yml    # Docker Compose configuration
└── .env                  # Environment variables (not in git)
```

## Development

### Local Backend Development

```bash
cd backend
pip install -r requirements.txt
python main.py
```

### Local Frontend Development

```bash
cd ui/app
npm install
npm start
```

The Angular dev server will run on http://localhost:4200

## Database

The database is automatically initialized when the PostgreSQL container starts. SQL scripts are located in the `db/` folder and are executed in numeric order.

## API Documentation

Once the backend is running, interactive API documentation is available at:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Troubleshooting

### Port Already in Use
If a port is already in use, you can modify the port mappings in `docker-compose.yml`

### Database Connection Issues
Ensure the `.env` file contains the correct database credentials and that they match in `backend/database.py`

### Frontend Not Loading
Check that the backend is running and accessible. The frontend needs to communicate with the API.
