# Rick & Morty GraphQL Explorer

A React 19 + Vite application for browsing Rick & Morty characters backed by the public GraphQL API. The app demonstrates a modular architecture with Apollo Client, generated TypeScript types, and a simple pagination experience.

## Features

- Typed GraphQL operations generated via GraphQL Code Generator (`TypedDocumentNode` output)
- Apollo Client 3 with cache persistence and an explicit service/view-model abstraction layer
- Responsive character grid with sticky app shell and client-side pagination controls
- React Router–based routing scaffold ready for additional pages
- Modern build tooling: Vite 7, TypeScript 5.8, ESLint 9, Vitest + Testing Library

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Generate GraphQL artifacts** (rerun whenever the schema or `.graphql` documents change)
   ```bash
   npm run codegen
   ```
3. **Start the dev server**
   ```bash
   npm run dev
   ```
4. Open the printed URL (defaults to `http://localhost:5173`). Hot Module Replacement is enabled for everything under `src/`.
5. *(Optional)* **Run the test suite**
   ```bash
   npm test -- --run
   ```

## NPM Scripts

- `npm run dev` – Launch Vite in development mode.
- `npm run build` – Type-check and build the production bundle.
- `npm run preview` – Serve the production build locally.
- `npm run lint` – Run ESLint across the repo.
- `npm run codegen` – Regenerate typed GraphQL documents and helpers.
- `npm test` – Execute Vitest with the default watch mode (pass `--run` for CI-style runs).

## Project Structure

```
src/
├─ api/
│  ├─ generated/              # GraphQL Codegen output (TypedDocumentNode helpers)
│  └─ graphql/                # *.graphql operation documents
│
├─ apollo/
│  └─ client.ts               # Apollo Client setup with cache persistence
│
├─ app/
│  ├─ AppShell/               # Sticky header layout container
│  ├─ providers/              # ApolloProvider wrapper
│  └─ index.tsx               # Top-level routing + providers
│
├─ services/
│  └─ characters/             # Data/query hooks and mapping to view models
│
├─ ui/
│  ├─ components/             # Presentational components (CharacterCard, Pagination)
│  └─ pages/                  # Route-level pages (CharactersPage)
│
├─ styles/                    # Global styles
└─ main.tsx                   # App entry point
```

## GraphQL Codegen Notes

- Configuration lives in `codegen.config.ts` and targets `https://rickandmortyapi.com/graphql`.
- Documents in `src/api/graphql/**/*.graphql` are used to produce generated helpers in `src/api/generated/`.
- Generated artifacts include typed hooks/documents; import `GetCharactersDocument` (etc.) directly rather than adding generics to `useQuery`.
- Commit generated files so teammates can install dependencies and run the app without running codegen first.

## Development Tips

- Pagination state lives in the `CharactersPage` component; Apollo automatically refetches when the page changes.
- When touching the API schema or queries, re-run `npm run codegen` before starting the dev server to keep types in sync.
- The architecture separates fetching (`services`) from presentation (`ui`), which keeps React components focused on UI logic.
- Tests live under `src/**/*.test.tsx` and use Vitest with React Testing Library; keep view-model dependencies mocked when unit-testing page logic.
