# Lightweight SaaS Starter (Laravel + Nuxt 4)

A lightweight SaaS starter template built with a modern **API + SPA architecture**.

## Stack

**Backend**

* Laravel 12 (REST API only)
* MySQL
* Laravel Sanctum (token authentication)
* Spatie Laravel Permission
* Laravel Filament (admin panel for managing roles & permissions)

**Frontend**

* Nuxt 4 (SPA mode)
* TypeScript
* Pinia
* TailwindCSS
* GSAP animations
* FontAwesome 6

---

# Architecture

```
saas-app/
│
├── backend/      # Laravel API
└── frontend/     # Nuxt 4 SPA
```

Backend responsibilities:

* authentication
* authorization
* business logic
* database

Frontend responsibilities:

* UI
* state management
* route protection
* animations

---

# Versioning

The API uses **versioned routes**.

```
/api/v1/*
```

Example:

```
POST /api/v1/login
GET  /api/v1/me
GET  /api/v1/users
```

This allows future expansion:

```
/api/v2/
```

without breaking existing clients.

---

# Authentication

Authentication uses **Laravel Sanctum**.

Flow:

1. User logs in
2. Backend returns token
3. Token stored in **secure cookie**
4. Pinia store fetches `/api/v1/me`
5. Roles & permissions loaded into frontend state

---

# Roles & Permissions

Using **Spatie Laravel Permission**.

### Roles

| Role    | Permissions                        |
| ------- | ---------------------------------- |
| admin   | all permissions                    |
| manager | dashboard + reports + manage users |
| user    | dashboard only                     |

---

# Laravel Filament Admin Panel

Filament provides a simple UI to manage:

* users
* roles
* permissions

Admin panel URL:

```
/admin
```

Features:

* assign roles
* assign permissions
* manage users
* audit roles quickly

Only **admin** can access the Filament panel.

---

# Frontend Pages

```
/login
/register
/dashboard
/users
/reports
/settings
/unauthorized
```

### Access Rules

| Page      | Access          |
| --------- | --------------- |
| dashboard | authenticated   |
| users     | admin           |
| reports   | admin + manager |
| settings  | authenticated   |

---

# API Endpoints

### Auth

| Method | Endpoint         |
| ------ | ---------------- |
| POST   | /api/v1/register |
| POST   | /api/v1/login    |
| POST   | /api/v1/logout   |
| GET    | /api/v1/me       |

### Admin

| Method | Endpoint      |
| ------ | ------------- |
| GET    | /api/v1/users |

### Reports

| Method | Endpoint        |
| ------ | --------------- |
| GET    | /api/v1/reports |

---

# Frontend Features

### TailwindCSS

Used for all styling.

Example:

```html
<div class="p-6 bg-white rounded-lg shadow">
Dashboard
</div>
```

---

### GSAP Animations

Used for:

* page transitions
* list reveals
* dashboard animations

Example:

```ts
gsap.from(".card", {
  y: 30,
  opacity: 0,
  duration: 0.6,
  stagger: 0.1
})
```

---

### FontAwesome

Global component:

```
<fa icon="user" />
```

---

# Vue Permission Directives

Custom directives for UI permissions.

```
v-role="'admin'"
v-can="'edit users'"
```

Example:

```vue
<button v-can="'delete users'">
Delete User
</button>

<div v-role="'admin'">
Admin Controls
</div>
```

---

# Nuxt 4 Folder Structure

```
frontend/

app.vue

assets/
css/

layouts/
default.vue
dashboard.vue

middleware/
auth.ts
guest.ts
role.ts

pages/
login.vue
register.vue
dashboard.vue
users.vue
reports.vue
settings.vue
unauthorized.vue

plugins/
gsap.client.ts
fontawesome.ts
directives.ts

stores/
auth.ts

composables/
useApi.ts
useAuth.ts
```

---

# Laravel Folder Structure

```
backend/

app/
Http/
Controllers/
AuthController.php
UserController.php
ReportController.php

Middleware/

Models/
User.php

routes/
api.php

database/
migrations/
seeders/

config/
permission.php
```

---

# Installation

# 1 Clone Repository

```
git clone https://github.com/yourname/saas-starter.git
cd saas-starter
```

---

# Backend Setup

```
cd backend
```

Install dependencies:

```
composer install
```

Create environment file:

```
cp .env.example .env
```

Configure database:

```
DB_DATABASE=saas
DB_USERNAME=root
DB_PASSWORD=
```

Generate key:

```
php artisan key:generate
```

Run migrations:

```
php artisan migrate
```

Install Filament:

```
php artisan filament:install
```

Seed roles:

```
php artisan db:seed
```

Start server:

```
php artisan serve
```

Backend URL:

```
http://127.0.0.1:8000
```

---

# Frontend Setup

```
cd frontend
```

Install dependencies:

```
npm install
```

Create environment file:

```
cp .env.example .env
```

Add API URL:

```
NUXT_PUBLIC_API_URL=http://127.0.0.1:8000/api/v1
```

Run dev server:

```
npm run dev
```

Frontend URL:

```
http://localhost:3000
```

---

# Authentication State (Pinia)

Pinia store manages:

```
user
roles
permissions
token
login()
logout()
fetchUser()
```

User is automatically fetched if cookie exists.

---

# Backend Route Protection

Using middleware:

```
auth:sanctum
role:admin
permission:view reports
```

---

# Frontend Route Protection

Nuxt middleware:

```
auth.ts
guest.ts
role.ts
```

Example:

```
definePageMeta({
  middleware: ['auth']
})
```

---

# Production Build

## Backend

```
php artisan config:cache
php artisan route:cache
php artisan optimize
```

---

## Frontend

Build Nuxt:

```
npm run build
```

Preview:

```
npm run preview
```

---

# Security Notes

* Sanctum authentication
* cookie-based tokens
* no localStorage secrets
* backend authorization enforcement
* role-based UI rendering

---

# Future SaaS Upgrades

* Stripe billing
* multi-tenancy
* team workspaces
* audit logs
* notifications
* usage analytics

---

# License

MIT
