# Vendora – A Time -Limited Creator Commerce Platform

## 1. Project Overview

**CreatorDrop** is a unique e-commerce platform where creators launch **limited-time product drops** instead of permanent listings.

Products can be **physical or digital**, and once the drop ends, the product becomes unavailable.

The goal is to build urgency-driven commerce while giving creators a dedicated storefront experience.

This project is designed to demonstrate:

- Real-world backend architecture
- RESTful API design
- ORM usage with SQLite
- Full deployment workflow
- Practical problem-solving (CORS, environment configs)

---

## 2. Problem Statement

Traditional e-commerce platforms focus on infinite listings and generic products.

Creators often struggle to:

- Launch exclusive products
- Create urgency
- Maintain ownership of their audience

CreatorDrop solves this by:

- Allowing **time-bound product drops**
- Supporting **creator-first storefronts**
- Enabling **limited stock mechanics**

---

## 3. Core Features

### 3.1 User Roles

- **Creator**
    - Can create and manage product drops
- **Buyer**
    - Can browse and purchase products

### 3.2 Product Drops

- Products have:
    - Limited stock
    - Drop expiration date
    - Creator ownership
- Once the drop expires:
    - Product becomes unavailable
    - API blocks further purchases

### 3.3 Product Types

- **Physical products** (merch, accessories)
- **Digital products** (templates, assets, packs)

---

## 4. Tech Stack

### Backend

- Node.js
- Express.js
- Typescript
- MongoDB (Database)
- Prisma (ORM)
- RESTful API architecture

### Frontend

- React

### Deployment

- Backend: Render
- Frontend: Vercel

---

## 5. Database Design (MongoDB)

### 5.1 User Model

- Stores creator and buyer accounts
- Determines permissions via role field

### 5.2 Product Model

- Stores product data
- Links product to creator
- Contains drop expiration logic

### 5.3 Order Model

- Tracks purchases
- Stores total amount and buyer

---

## 6. API Design (Full CRUD)

### Product API (Required CRUD)

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/products` | Create a product |
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get product by ID |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |

### Additional APIs

- `/api/users`
- `/api/orders`
- `/api/creators/:id/products`