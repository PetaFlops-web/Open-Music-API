# 🎵 Open Music API v1

> A production-ready RESTful API for managing music catalogs, albums, playlists, and user authentication with enterprise-grade features.

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.2%2B-blue)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-336791)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/License-ISC-yellow)](LICENSE)

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Architecture](#project-architecture)
- [API Endpoints](#api-endpoints)
- [Installation & Setup](#installation--setup)
- [Environment Configuration](#environment-configuration)
- [Running the Application](#running-the-application)
- [API Usage Examples](#api-usage-examples)
- [Database Migrations](#database-migrations)
- [Code Quality](#code-quality)
- [Project Highlights](#project-highlights)
- [Contributing](#contributing)
- [Author](#author)

## 🎯 Overview

Open Music API is a comprehensive backend solution for music streaming and management platforms. It provides a robust foundation for building music applications with features like user authentication, album management, song catalogs, and personalized playlists. The API is designed with scalability, security, and performance in mind.

### Use Cases

- 🎼 Music streaming platforms
- 📻 Radio and podcast management systems
- 🎧 Music discovery applications
- 💿 Digital music library management
- 🎪 Event and concert ticketing platforms

## ✨ Key Features

### 🔐 Authentication & Security

- **JWT-based Authentication**: Secure token generation and refresh mechanisms
- **Password Hashing**: Industry-standard bcryptjs implementation
- **Token Blacklisting**: Logout functionality with secure token invalidation
- **Input Validation**: Comprehensive schema validation using Joi

### 🎵 Music Management

- **Album Management**: Create, read, update, and delete albums with metadata
- **Song Catalog**: Full CRUD operations for songs with album associations
- **Album Covers**: Upload and serve album artwork
- **Album Ratings**: Like/unlike albums with engagement tracking

### 📝 Playlist Features

- **Personal Playlists**: Users can create and manage their own playlists
- **Dynamic Playlist Management**: Add/remove songs from playlists
- **Playlist Export**: Export playlists to various formats (JSON, CSV)
- **Playlist Access Control**: Secure playlist management with authentication

### ⚡ Performance & Scalability

- **Redis Caching**: In-memory caching for frequently accessed data
- **Message Queue**: RabbitMQ integration for asynchronous operations
- **Database Optimization**: Optimized PostgreSQL queries with indexing
- **Static File Serving**: Efficient serving of album covers and media

### 🛡️ Enterprise Features

- **Error Handling**: Centralized error management with custom exceptions
- **Request Validation**: Joi schema validation on all inputs
- **Database Migrations**: Version-controlled database schema management
- **Code Linting**: ESLint configuration for code quality enforcement
- **Environment-based Configuration**: Development, production, and staging support

## 🛠 Tech Stack

| Category                | Technology             |
| ----------------------- | ---------------------- |
| **Runtime**             | Node.js (v18+)         |
| **Framework**           | Express.js 5.2         |
| **Database**            | PostgreSQL 13+         |
| **Cache**               | Redis 5.11             |
| **Message Queue**       | RabbitMQ (amqplib)     |
| **Authentication**      | JWT + bcryptjs         |
| **Validation**          | Joi 17.9               |
| **File Upload**         | Multer 2.1             |
| **Utilities**           | nanoid (ID generation) |
| **Development**         | Nodemon, ESLint        |
| **Database Migrations** | node-pg-migrate        |

## 🏗 Project Architecture

```
open-music-api/
├── src/
│   ├── app.js                          # Express app configuration
│   ├── auth/                           # Authentication & user management
│   │   ├── controller/
│   │   ├── validation/
│   │   └── model/
│   ├── music/                          # Album management
│   │   ├── controller/
│   │   ├── validation/
│   │   └── model/
│   ├── song/                           # Song catalog
│   │   ├── controller/
│   │   ├── validation/
│   │   └── model/
│   ├── playlists/                      # Playlist management
│   │   ├── controller/
│   │   ├── validation/
│   │   └── model/
│   ├── export/                         # Playlist export functionality
│   │   ├── controller/
│   │   └── validation/
│   ├── middleware/                     # Custom middleware
│   │   ├── auth.js                    # JWT authentication
│   │   ├── validate.js                # Request validation
│   │   └── error.js                   # Global error handler
│   ├── cache/                          # Redis cache management
│   ├── security/                       # Security utilities
│   ├── storage/                        # File upload configuration
│   ├── exceptions/                     # Custom error classes
│   ├── utils/                          # Utility functions
│   └── routes/                         # API route definitions
├── migrations/                         # Database migrations
├── server.js                           # Application entry point
├── package.json                        # Dependencies
├── eslint.config.js                    # Linting rules
└── .env                                # Environment variables
```

## 📡 API Endpoints

### Authentication

```
POST   /users                           # Register new user
POST   /authentications                 # Login
PUT    /authentications                 # Refresh JWT token
DELETE /authentications                 # Logout
```

### Albums

```
POST   /albums                          # Create album
GET    /albums/:albumId                 # Get album details
PUT    /albums/:albumId                 # Update album
DELETE /albums/:albumId                 # Delete album
POST   /albums/:albumId/covers          # Upload album cover
```

### Album Engagement

```
POST   /albums/:albumId/likes           # Like album (requires auth)
GET    /albums/:albumId/likes           # Get like count
DELETE /albums/:albumId/likes           # Unlike album (requires auth)
```

### Songs

```
POST   /songs                           # Create song
GET    /songs                           # List all songs
GET    /songs/:songId                   # Get song details
PUT    /songs/:songId                   # Update song
DELETE /songs/:songId                   # Delete song
```

### Playlists

```
POST   /playlists                       # Create playlist (requires auth)
GET    /playlists                       # Get user playlists (requires auth)
POST   /playlists/:playlistId/songs     # Add song to playlist (requires auth)
GET    /playlists/:playlistId/songs     # Get playlist songs (requires auth)
DELETE /playlists/:playlistId/songs     # Remove song from playlist (requires auth)
DELETE /playlists/:playlistId           # Delete playlist (requires auth)
```

### Export

```
POST   /export/playlists/:playlistId    # Export playlist (requires auth)
```

## 🚀 Installation & Setup

### Prerequisites

- **Node.js** v18 or higher
- **PostgreSQL** 13 or higher
- **Redis** 5.0 or higher (optional, for caching)
- **RabbitMQ** (optional, for message queuing)
- **npm** or **yarn**

### Step 1: Clone the Repository

```bash
git clone https://github.com/PetaFlops-web/Open-Music-API-v1.git
cd Open-Music-API-v1
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Set Up Environment Variables

```bash
cp .env.example .env
# Edit .env with your configuration
```

### Step 4: Run Database Migrations

```bash
npm run migrate
```

### Step 5: Start the Server

```bash
# Development mode (with auto-reload)
npm run start:dev

# Production mode
npm run start:prod

# Simple start
npm start
```

The server will start on the port specified in your `.env` file (default: 5000).

## ⚙️ Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=5000
HOST=localhost
NODE_ENV=development

# Database Configuration
PGUSER=postgres
PGPASSWORD=yourpassword
PGHOST=localhost
PGPORT=5432
PGDATABASE=openmusic_db

# JWT Configuration
ACCESS_TOKEN_KEY=your_access_token_secret_key_here
REFRESH_TOKEN_KEY=your_refresh_token_secret_key_here
ACCESS_TOKEN_AGE=1800  # 30 minutes in seconds
REFRESH_TOKEN_AGE=604800  # 7 days in seconds

# Redis Configuration (optional)
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# RabbitMQ Configuration (optional)
RABBITMQ_HOST=localhost
RABBITMQ_PORT=5672
RABBITMQ_USER=guest
RABBITMQ_PASS=guest

# File Upload Configuration
UPLOAD_DIR=src/storage/images
MAX_FILE_SIZE=5242880  # 5MB in bytes
```

## 🎮 Running the Application

### Development Mode

```bash
npm run start:dev
```

Automatically reloads on code changes using Nodemon.

### Production Mode

```bash
npm run start:prod
```

Optimized for production with proper error handling and logging.

### Linting

```bash
# Check for code quality issues
npm run lint

# Fix linting issues automatically
npm run lint:fix
```

## 📚 API Usage Examples

### 1. User Registration

```bash
curl -X POST http://localhost:5000/users \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "password": "securepassword123",
    "fullname": "John Doe"
  }'
```

### 2. Login

```bash
curl -X POST http://localhost:5000/authentications \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "password": "securepassword123"
  }'
```

### 3. Create Album

```bash
curl -X POST http://localhost:5000/albums \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Thriller",
    "year": 1982,
    "artist": "Michael Jackson"
  }'
```

### 4. Create Playlist

```bash
curl -X POST http://localhost:5000/playlists \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "name": "My Favorite Songs",
    "description": "My collection of favorite songs"
  }'
```

### 5. Add Song to Playlist

```bash
curl -X POST http://localhost:5000/playlists/{playlistId}/songs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "songId": "song-123"
  }'
```

## 🗄 Database Migrations

Migrations are version-controlled and ensure database schema consistency.

### Run Migrations

```bash
npm run migrate
```

### Create New Migration

```bash
npm run migrate create [migration_name]
```

### Rollback Migrations

```bash
npm run migrate down
```

All migrations are stored in the `migrations/` directory and automatically tracked.

## ✅ Code Quality

### ESLint Configuration

The project includes a comprehensive ESLint setup to maintain code quality.

```bash
# Check code quality
npm run lint

# Fix issues automatically
npm run lint:fix
```

### Code Standards

- Consistent code formatting
- No unused variables or imports
- Proper error handling
- Security best practices
- Clean, readable code structure

## 🌟 Project Highlights

### 1. **Scalable Architecture**

- Modular folder structure separating concerns
- Middleware-based request processing
- Service-oriented design pattern

### 2. **Security First**

- JWT authentication with token refresh
- Password hashing with bcryptjs
- Input validation on all endpoints
- Protected routes with authentication middleware

### 3. **Performance Optimization**

- Redis caching layer for frequently accessed data
- Async operations with message queues
- Database query optimization
- Efficient file serving

### 4. **Developer Experience**

- Auto-reload with Nodemon in development
- Comprehensive error messages
- Joi validation for clear feedback
- ESLint for code quality

### 5. **Production Ready**

- Environment-based configuration
- Database migrations for versioning
- Error handling and logging
- Stateless API design

## 📝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 👤 Author

**Akbar**

- GitHub: [@PetaFlops-web](https://github.com/PetaFlops-web)
- Email: [contact information]

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 🤝 Support

For support, please open an issue on [GitHub Issues](https://github.com/PetaFlops-web/Open-Music-API-v1/issues).

---

<div align="center">

Made with ❤️ by [Akbar](https://github.com/PetaFlops-web)

⭐ If this project helped you, please consider giving it a star!

</div>
