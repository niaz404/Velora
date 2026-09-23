<div align="center">

# 🧶 Velora
### Boutique Handcrafted Crochet & Accessories E-Commerce Platform

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.13-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Better Auth](https://img.shields.io/badge/Better_Auth-1.6-9333EA?style=for-the-badge&logo=auth0&logoColor=white)](https://better-auth.com/)

<p align="center">
  A full-stack, luxury e-commerce web application built for boutique handcrafted crochet bags, plushies, keychains, and bespoke orders. Crafted with modern web technologies, smooth animations, role-based access control, and an administrative operations dashboard.
</p>

</div>

---

## 📖 Table of Contents

- [Features](#-features)
  - [Customer Storefront](#-customer-storefront)
  - [Admin Operations Suite](#-admin-operations-suite)
  - [Authentication & Security](#-authentication--security)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
- [API & Architecture](#-api--architecture)
- [License & Authors](#-license--authors)

---

## ✨ Features

### 🛍️ Customer Storefront
- **Dynamic Product Catalog**: Browse handcrafted crochet bags, plush toys, accessories, and seasonal collections.
- **Advanced Filtering & Sorting**: Filter items by category, price ranges, in-stock status, and popularity.
- **Rich Product Detail Pages**: High-resolution image galleries, pricing, stock levels, detailed descriptions, and verified customer reviews.
- **Custom Bespoke Orders**: Dedicated interface for customers to request tailor-made crochet creations.
- **Seamless Cart & Checkout**: Real-time cart state management, promotional badges, and streamlined order placement.
- **Customer Account & Order History**: User profile dashboard to track recent orders, delivery status, and review submitted feedback.
- **Newsletter & Contact Support**: Interactive contact inquiries and subscriber newsletter integration.

### ⚙️ Admin Operations Suite (`/ops-v8k92qx7m1`)
- **Executive Analytics Dashboard**: Real-time business overview tracking revenue, total orders, active customer count, and low-stock alerts.
- **Product Inventory Management**: Complete CRUD operations for products (pricing, sale discounts, tags, stock counts, and image links).
- **Category & Collection Control**: Organize catalog taxonomies and homepage showcases effortlessly.
- **Order Processing Pipeline**: Track and update order fulfillment stages (`Pending` ➔ `Processing` ➔ `Shipped` ➔ `Delivered` ➔ `Cancelled`).
- **User Management**: View registered accounts and manage administrative privileges.

### 🔒 Authentication & Security
- **Better Auth Integration**: Fast and secure session-based authentication with email/password verification and password recovery.
- **Role-Based Access Control (RBAC)**: Route-level protection and API authorization separating regular customers from administrative operations.
- **Protected Endpoints**: Server-side session verification on all mutations and private data queries.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Server Actions, API Routes) |
| **UI Library** | [React 19](https://react.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/), [tw-animate-css](https://www.npmjs.com/package/tw-animate-css) |
| **Component Primitives** | [Radix UI](https://www.radix-ui.com/), [Shadcn UI](https://ui.shadcn.com/), [Lucide React](https://lucide.dev/), [React Icons](https://react-icons.github.io/react-icons/) |
| **Database** | [MongoDB](https://www.mongodb.com/) via [Mongoose ODM](https://mongoosejs.com/) |
| **Authentication** | [Better Auth](https://www.better-auth.com/) |
| **Email Service** | [Nodemailer](https://nodemailer.com/) |

---

## 📂 Project Structure

```text
Velora/
├── app/
│   ├── (auth)/                # Authentication routes (Sign-in, Sign-up, Forgot Password)
│   ├── (main)/                # Public storefront (Shop, Products, Cart, Orders, Profile, Custom)
│   ├── ops-v8k92qx7m1/        # Admin management operations & dashboards
│   ├── api/                   # REST API routes (Auth, Products, Orders, Admin, Categories)
│   ├── layout.js              # Root application layout
│   └── globals.css            # Tailwind & global stylesheet
├── components/                # Reusable UI components & shadcn primitives
├── model/                     # Mongoose database models (User, Product, Order, Cart, Category, Review)
├── queries/                   # Database data access layers & query functions
├── service/                   # Database connection & backend services (MongoDB client)
├── lib/                       # Utility functions, Better Auth client & admin auth helpers
├── public/                    # Static media, icons, and assets
└── data/                      # Seed data & static presets
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have the following installed on your machine:
- **Node.js** `>= 18.18.0` (or `v20+` recommended)
- **npm** or **pnpm** / **yarn**
- A **MongoDB** database instance (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

---

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/niaz404/Velora.git
   cd Velora
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

---

### Environment Variables

Create a `.env` or `.env.local` file in the root directory by copying the sample configuration:

```bash
cp .env.example .env
```

Configure your environment keys:

```env
# ------------------------------------------------------------------------------
# Database Configuration
# ------------------------------------------------------------------------------
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/velora?retryWrites=true&w=majority

# ------------------------------------------------------------------------------
# Better Auth Configuration
# ------------------------------------------------------------------------------
BETTER_AUTH_SECRET=your_random_generated_secret_key_at_least_32_chars
BETTER_AUTH_URL=http://localhost:3000

# ------------------------------------------------------------------------------
# Public URLs
# ------------------------------------------------------------------------------
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
```

---

### Running the Application

- **Development Server:**
  ```bash
  npm run dev
  ```
  Open [http://localhost:3000](http://localhost:3000) in your browser.

- **Production Build:**
  ```bash
  npm run build
  npm run start
  ```

- **Code Quality & Linting:**
  ```bash
  npm run lint
  ```

---

## 🛡️ Security & Roles

- **Customer Access**: Can view products, place orders, write reviews, and access personal account settings.
- **Admin Access**: Protected administrative routes under `/ops-v8k92qx7m1` verified via server-side session checks and role validation (`role: "admin"`).
- **Sensitive Operations**: Protected against unauthorized tampering through server-side validation and database isolation.

---

## 📄 License & Authors

Copyright © 2026 **Niaz Uddin**. All rights reserved.

Created with passion for handcrafted artistry and modern web craftsmanship.
