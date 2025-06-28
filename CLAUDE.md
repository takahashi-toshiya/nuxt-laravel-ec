# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Nuxt.js + Laravel e-commerce application with the following stack:
- **Frontend**: Nuxt.js 3 (TypeScript, Vue 3, Pinia, TailwindCSS, i18n)
- **Backend**: Laravel 11 (PHP 8.2+, Laravel Sanctum for auth)
- **Database**: MySQL 8.0
- **Infrastructure**: Docker Compose with Nginx reverse proxy

## Development Environment Setup

### Docker Development
The entire stack runs in Docker containers. Use these commands:

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f [service_name]
```

Services run on:
- Frontend (Nuxt): http://localhost:3000
- Backend (Laravel): http://localhost:8000
- MySQL: localhost:3306
- Nginx (reverse proxy): http://localhost:80

### Frontend Development (Nuxt.js)
```bash
cd frontend

# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Backend Development (Laravel)
```bash
cd backend

# Install PHP dependencies
composer install

# Run Laravel development server
php artisan serve

# Run migrations
php artisan migrate

# Seed database
php artisan db:seed

# Run tests
php artisan test

# Code style checks
./vendor/bin/pint

# Combined development (server + queue + logs + vite)
composer run dev
```

## Architecture & Code Organization

### Frontend Architecture (Clean Architecture Pattern)

The frontend follows a layered architecture:

- **api/**: HTTP client functions for backend communication
- **services/**: Business logic layer, orchestrates API calls
- **usecases/**: Application-specific business rules
- **store/**: Pinia state management (user, cart, CSRF tokens)
- **composables/**: Reusable Vue composition functions
- **types/**: TypeScript type definitions
  - `model/`: Domain models (Product, User, Cart)
  - `api/`: API request/response types
- **utils/**: Pure utility functions

### Backend Architecture (Repository Pattern)

The Laravel backend follows repository pattern:

- **Controllers**: Handle HTTP requests, minimal logic
- **Services**: Business logic layer
- **Repositories**: Data access layer
- **Models**: Eloquent models for database entities
- **Resources**: API response transformation

Key entities: User, Product, Cart

### Authentication Flow

- Laravel Sanctum for API token authentication
- CSRF token management for SPA
- Frontend stores auth state in Pinia
- Protected routes use `auth:sanctum` middleware

## API Endpoints

```
POST /api/login          - User sign in
POST /api/signup         - User registration
GET  /api/products       - List products (paginated)

Protected routes (require auth:sanctum):
GET  /api/user          - Get current user
GET  /api/signout       - Sign out user
GET  /api/cart          - Get user's cart
POST /api/cart          - Add item to cart
```

## Key Files to Understand

- `frontend/nuxt.config.ts` - Nuxt configuration with Docker HMR setup
- `frontend/DIRECTORY_ROLES.md` - Frontend architecture documentation
- `backend/routes/api.php` - API route definitions
- `docker-compose.yml` - Full stack container orchestration
- `backend/app/Http/Controllers/` - API endpoint handlers
- `frontend/store/` - Application state management

## Development Patterns

### Frontend Patterns
- Use Pinia for state management
- Implement proper TypeScript typing
- Follow component composition over inheritance
- Use VeeValidate + Zod for form validation
- Implement proper error handling with composables

### Backend Patterns
- Follow Laravel conventions and PSR standards
- Use Repository pattern for data access
- Implement proper API resources for responses
- Use Laravel Sanctum for authentication
- Follow strict typing with declare(strict_types=1)

## Common Development Commands

### Database Operations
```bash
# Backend container
php artisan migrate:fresh --seed  # Reset and seed database
php artisan tinker                # Laravel REPL
```

### Code Quality
```bash
# Backend
./vendor/bin/pint                 # PHP code style fixer
php artisan test                  # Run PHPUnit tests

# Frontend
npm run build                     # Check TypeScript compilation
```

## Multi-language Support

The application supports internationalization:
- Default language: Japanese (ja)
- i18n files in `frontend/i18n/locales/`
- Uses `@nuxtjs/i18n` module

## Project Status

This project has transitioned to AI-driven development as noted in the main README.md.