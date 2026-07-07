# Next.js Production-Ready Setup

## Project Overview

This is a completely brand-new, clean, production-ready Next.js project setup. It serves as a scalable foundation for any full-stack Next.js application, pre-configured with essential tools and an organized clean architecture-based folder structure.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Linting & Formatting**: ESLint, Prettier

## Folder Structure

```
├── app/          # Next.js App Router and page components
│   └── api/      # Next.js API Routes
├── components/   # Reusable React components
├── constants/    # Global constants and configuration values
├── hooks/        # Custom React hooks
├── lib/          # Utility libraries and core setup (e.g., MongoDB connection)
├── models/       # Mongoose database models
├── public/       # Static assets like images and fonts
├── services/     # Business logic and external API communication
├── styles/       # Global styling configuration
├── types/        # TypeScript type definitions and interfaces
└── utils/        # General helper functions
```

## Installation Steps

1. Clone the repository and navigate into the directory.
2. Install dependencies using npm (do not use yarn or pnpm):

```bash
npm install
```

## Environment Setup

1. Copy the `.env.example` file to create a `.env.local` file:

```bash
cp .env.example .env.local
```

2. Update the environment variables in `.env.local` with your actual configuration values:
   - `MONGODB_URI`: Your MongoDB connection string.
   - `NEXT_PUBLIC_SITE_URL`: Your application's URL.

## Available npm Scripts

- `npm run dev`: Starts the development server with hot-reload.
- `npm run build`: Builds the application for production.
- `npm start`: Starts the production server.
- `npm run lint`: Runs ESLint to analyze the code for errors.
