# Rick & Morty GraphQL Assessment

This project is a Vite + React TypeScript starter for exploring the Rick and Morty GraphQL API. It ships with Apollo Client configured against the public endpoint and a placeholder character listing page ready to be expanded.

## Stack

- React 19 with TypeScript and Vite 7 for a fast, modern SPA workflow
- Apollo Client 4 and GraphQL 16 for data fetching against `https://rickandmortyapi.com/graphql`
- ESLint 9 with the recommended React Hooks and Refresh plugins for linting

## Getting Started

1. Install dependencies: `npm install`
2. Start the dev server: `npm run dev`
3. Open the printed URL (defaults to `http://localhost:5173`) in your browser.

The app will hot-reload as you edit files inside `src/`.

## Available Scripts

- `npm run dev` – launch Vite in development mode
- `npm run build` – type-check and build the production bundle
- `npm run preview` – serve the production build locally
- `npm run lint` – run ESLint across the project

## Project Layout

```
src/
├─ apollo/
│   └─ client.ts              // Apollo Client instance with cache + persistence
│
├─ components/
│   ├─ CharacterCard/
│   │   ├─ index.tsx          // CharacterCard component
│   │   └─ CharacterCard.module.css
│   │
│   └─ Pagination/
│       ├─ index.tsx          // Pagination component
│       └─ Pagination.module.css
│
├─ graphql/
│   ├─ queries.ts             // GraphQL queries
│   └─ types.ts               // (TODO: replace with GraphQL Codegen)
│
├─ pages/
│   └─ CharactersPage.tsx     // Main page displaying character list + pagination
│
├─ App.tsx                    // Root app component
└─ main.tsx                   // React entry point, wraps App with ApolloProvider

```

## TODO

1. Use GraphQL Codegen to generate types from schema and queries
