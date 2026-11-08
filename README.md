# Bloglist - Full Stack Open

Continuous Integration - Part 11

**Live Bloglist app:** [full-stack-open-part11-bloglist.onrender.com](https://full-stack-open-part11-bloglist.onrender.com/)

## Setup

Install all dependencies:

    npm install
    npm install --prefix frontend
    npm install --prefix e2etests

Create a `.env` file in the project root:

    MONGODB_URI=<MongoDB connection string>
    TEST_MONGODB_URI=<MongoDB connection string - for tests only>
    JWT_SECRET=<long random string>

## Commands

### Backend (project root)

- `npm start` runs the production server
- `npm run start:test` runs the server in test mode (used by the E2E tests)

- `npm run dev` runs the development server
- `npm test` runs the backend unit and integration tests
- `npm run build:ui` builds the frontend and copies it to the backend
- `npm run lint` runs ESLint
- `npm run format` formats the code with Prettier
- `npm run format:check` checks the formatting

### Frontend (`frontend/`)

- `npm run dev` runs the Vite development server
- `npm test` runs the component tests (Vitest)
- `npm run build` creates a production build
- `npm run lint` runs ESLint
- `npm run format` formats the code with Prettier
- `npm run format:check` checks the formatting

### End-to-end tests (`e2etests/`)

Build the frontend first (`npm run build:ui` in the root), then:

- `npm test` starts the backend in test mode and runs the Playwright tests
- `npm run test:report` opens the last test report

# Related project: Pokedex

The other half of Part 11 submission (exercises 11.1 - 11.20) lives in a separate repository:

**Live Pokedex app:** [full-stack-open-part11-pokedex.onrender.com](https://full-stack-open-part11-pokedex.onrender.com/)

**Pokedex repo:** [github.com/hiwersen/full-stack-open-part11-pokedex.git](https://github.com/hiwersen/full-stack-open-part11-pokedex.git)
