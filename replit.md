# VibeMedia - Media Tracker

## Overview

VibeMedia is a personal media tracking application that allows users to catalog their shows, movies, and books while associating them with mood-based "vibes" for discovery. The app features a mobile-first design with bottom navigation, user authentication, media library management, and a vibe-based recommendation system.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with custom Replit plugins for development
- **UI Component Library**: shadcn/ui (New York style) with Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming (light/dark mode support)
- **State Management**: TanStack React Query for server state
- **Fonts**: Inter (primary) and Manrope (accent) via Google Fonts

### Backend Architecture
- **Runtime**: Node.js with Express
- **API Design**: RESTful JSON API with `/api` prefix
- **Validation**: Zod schemas for request validation
- **Development**: Vite dev server integration with HMR support

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` (shared between client and server)
- **Current Storage**: In-memory storage implementation (`MemStorage` class)
- **Database Ready**: Schema configured for PostgreSQL with `@neondatabase/serverless`

### Application Structure
```
client/src/          # React frontend
  components/        # UI components (feature + shadcn/ui)
  hooks/            # Custom React hooks
  lib/              # Utilities and query client
  pages/            # Page components
server/             # Express backend
  routes.ts         # API route definitions
  storage.ts        # Data access layer
shared/             # Shared types and schemas
  schema.ts         # Drizzle schema + Zod validation
```

### Key Design Decisions

1. **Mobile-First Navigation**: Bottom navigation with four tabs (Library, Add, Vibe, Profile) optimized for touch interactions

2. **Vibe-Based Organization**: Media items can be tagged with mood descriptors (vibes) enabling discovery based on current mood rather than just genre

3. **Shared Schema**: Using `drizzle-zod` to generate validation schemas from database schema, ensuring type safety across client and server

4. **In-Memory Storage with DB Schema**: Currently using in-memory storage for rapid development, but PostgreSQL schema is ready for migration

## External Dependencies

### Database
- **PostgreSQL**: Configured via Drizzle with Neon serverless driver
- **Connection**: Requires `DATABASE_URL` environment variable
- **Migrations**: Generated to `./migrations` directory via `drizzle-kit push`

### Third-Party Services
- **Google Fonts CDN**: Inter and Manrope font families

### Key NPM Packages
- `@tanstack/react-query`: Server state management
- `drizzle-orm` + `drizzle-zod`: Database ORM and validation
- `@neondatabase/serverless`: PostgreSQL connection
- `@radix-ui/*`: Accessible UI primitives
- `lucide-react`: Icon library
- `class-variance-authority`: Component variant management