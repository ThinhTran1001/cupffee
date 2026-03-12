# Cupffee — Edible Cup Web Application

A full-stack Next.js web application for Cupffee, the world's first edible cup brand.

## Tech Stack

- **Framework**: Next.js 16 (App Router, SSR)
- **Database**: PostgreSQL
- **ORM**: Prisma 5
- **Styling**: Tailwind CSS v4
- **Auth**: NextAuth.js v4
- **Language**: TypeScript

## Features

- 🏠 **Landing Page** — Hero, features, product sizes, stats, branding, testimonials, blog
- 🛍️ **Products** — Product catalog with category filtering
- 🔍 **Product Detail** — Full product view with related products
- 📖 **About Us** — Company story, values, timeline
- ⭐ **Reviews** — Customer testimonials + submission form
- 📝 **Blog** — Blog posts with static + database content
- 📧 **Contact** — Contact form with inquiry types
- 💛 **Share Love** — Customer review submission form
- 🔐 **Admin Login** — JWT-based admin authentication
- 📊 **Admin Dashboard** — Stats overview
- 📦 **Product Management** — Full CRUD for products
- ⭐ **Review Moderation** — Approve/feature/delete reviews
- 💬 **Message Management** — View & manage contact messages

## Setup

### 1. Prerequisites

- Node.js 18+
- PostgreSQL database

### 2. Environment Variables

Update `.env` with your actual database credentials:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Database Setup

```bash
# Push schema to database
npm run db:push

# Seed initial data (admin + sample products + reviews)
npm run db:seed
```

### 5. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Admin Access

- URL: `http://localhost:3000/admin/login`
- Email: `admin@cupffee.me`
- Password: `admin123`

## Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── about/page.tsx              # About Us
│   ├── products/page.tsx           # Products catalog
│   ├── products/[id]/page.tsx      # Product detail
│   ├── reviews/page.tsx            # Reviews
│   ├── blog/page.tsx               # Blog listing
│   ├── blog/[slug]/page.tsx        # Blog post
│   ├── contact/page.tsx            # Contact
│   ├── admin/login/page.tsx        # Admin login
│   └── admin/(protected)/         # Protected admin pages
│       ├── dashboard/
│       ├── products/
│       ├── reviews/
│       ├── messages/
│       └── blog/
├── components/
│   ├── layout/                     # Header, Footer
│   ├── sections/                   # Landing page sections
│   ├── ui/                         # Reusable UI components
│   └── admin/                      # Admin components
├── lib/
│   ├── prisma.ts                   # Prisma client
│   └── auth.ts                     # NextAuth config
└── api/
    ├── auth/[...nextauth]/         # NextAuth handler
    ├── reviews/                    # Review API
    ├── contact/                    # Contact API
    └── admin/                      # Admin APIs (protected)
```

## Color Scheme

- Background: `#f6ece0` (cream)
- Primary Brown: `#6d3018`
- Dark Brown: `#3d1a08`
- Caramel: `#c8956c`
- Light Caramel: `#e8c49a`
