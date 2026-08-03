# ToDo Application - Frontend Coding Challenge

A production-quality React application demonstrating clean architecture, modular design, and senior-level frontend engineering practices using **Turborepo**, **React 19**, **TypeScript**, **TanStack Router**, **TanStack Query**, **Jotai**, and **TailwindCSS**.

## 🏗️ Architecture Overview

This application is built as a **monorepo** to demonstrate clear separation of concerns and maintainable module boundaries. The structure enforces strict dependency rules where feature packages never import from each other, ensuring true modularity.

### Package Structure

```
apps/
  web/                    # Shippable application (routing, composition, providers)
packages/
  users/                  # User domain (components, hooks, API, types)
  todos/                  # Todo domain (components, hooks, API, types)
  shared/                 # Shared utilities, types, query client, UI components
  typescript-config/      # Shared TypeScript configurations
  eslint-config/          # Shared ESLint configurations
```

### Dependency Graph

```
apps/web
    ↓
packages/users  packages/todos
    ↓               ↓
      packages/shared
```

**Key principle**: Feature packages (`users`, `todos`) are **completely independent** and cannot import from each other. All shared functionality flows through the `shared` package.

## 🎯 Key Architectural Decisions

### 1. **Why This Package Structure?**

**Decision**: Separate `users` and `todos` into isolated packages rather than colocating them in the app.

**Reasoning**:

- **Scalability**: As the app grows, teams can own individual packages without conflicts
- **Maintainability**: Changes to user logic cannot accidentally break todo logic
- **Testability**: Each package can be tested in isolation
- **Reusability**: Packages can be reused in different apps (mobile app, admin dashboard, etc.)
- **Clear boundaries**: Enforces thinking about public APIs and contracts between modules

**Trade-off**: Slightly more initial setup complexity, but pays dividends as the codebase scales.

### 2. **Why TanStack Query Over Direct Fetch?**

**Decision**: Use TanStack Query for all data fetching.

**Reasoning**:

- **Caching**: Automatic request deduplication and intelligent cache invalidation
- **Loading/Error states**: Built-in state management eliminates boilerplate
- **Optimistic updates**: First-class support for optimistic UI with rollback
- **Revalidation**: Automatic background refetching keeps data fresh
- **DevTools**: Excellent debugging experience

**Trade-off**: Adds ~20KB to bundle, but eliminates need for manual cache management and loading state logic.

### 3. **Why Jotai for UI State?**

**Decision**: Use Jotai only for cross-cutting UI state (user filter), not server state.

**Reasoning**:

- **Atomic**: Small, composable atoms prevent unnecessary re-renders
- **Simple**: Minimal API compared to Redux or Zustand
- **TypeScript-first**: Excellent type inference
- **React 19 compatible**: Works seamlessly with modern React patterns

**Trade-off**: Could have used React Context, but Jotai provides better performance and composition.

### 4. **Why Query Key Factories?**

**Decision**: Created `todoKeys` and `userKeys` factories for consistent query key management.

**Reasoning**:

- **Type safety**: Centralized query keys prevent typos
- **Maintainability**: Single source of truth for cache keys
- **Invalidation**: Easy to invalidate related queries
- **Refactoring**: Changing key structure only requires updates in one place

### 5. **Why MSW for Mocking?**

**Decision**: Use Mock Service Worker instead of a real backend.

**Reasoning**:

- **Realistic**: Intercepts actual network requests
- **Portable**: Same mocks work in browser and tests
- **Fast**: No real HTTP overhead during development
- **Reliable**: No external dependencies or network issues

**Trade-off**: Adds mock maintenance overhead, but enables rapid development without backend coordination.

### 6. **Why Validate with Zod?**

**Decision**: Use Zod for form and API validation.

**Reasoning**:

- **TypeScript integration**: Inferred types from schemas
- **Runtime safety**: Validates untrusted data at API boundaries
- **Developer experience**: Clear error messages
- **Minimal bundle**: Only ~8KB gzipped

**Trade-off**: Could have used plain validation functions, but Zod provides better maintainability and type safety.

## ✨ Key Features Implemented

### 🔄 Optimistic Updates with Rollback

**Requirement**: Creating a todo must show immediately with proper rollback on failure.

**Implementation**:

- Generates temporary ID on submit
- Updates cache immediately
- Preserves previous cache state
- Rolls back on error
- Revalidates on success

See: [`packages/todos/src/hooks.tsx`](packages/todos/src/hooks.tsx) - `useCreateTodo` hook

### 🎨 State Management Pattern

- **Server state**: Managed by TanStack Query (users, todos)
- **UI state**: Managed by Jotai (selected user filter)
- **Form state**: Local React state (no library needed for simple forms)

### 🔍 User Filtering

The todos page includes a user filter dropdown (powered by Jotai) that demonstrates:

- Cross-component state sharing
- Atomic updates without prop drilling
- Query parameter changes based on state

### ♿ Accessibility

- Semantic HTML throughout
- All form inputs have proper `<label>` elements
- ARIA attributes for invalid states
- Keyboard navigation support
- Focus management
- Screen reader announcements via `role="alert"`

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm 11.6.2+ (or compatible package manager)

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Starts the development server at `http://localhost:3000`

### Build

```bash
npm run build
```

Builds all packages for production.

### Test

```bash
npm run test
```

Runs the test suite.

## 📦 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build all packages
- `npm run lint` - Lint all packages
- `npm run test` - Run tests
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Generate coverage report

## 🎯 Project Structure Details

### `apps/web`

The entry point application. Responsible **only** for:

- Route configuration (TanStack Router)
- Global providers (QueryClient, Jotai)
- Layout and page composition
- **Does not contain business logic**

### `packages/users`

Owns everything related to users:

- `api.ts` - User API calls
- `hooks.ts` - React hooks (useUsers, useUser, useCreateUser)
- `validation.ts` - Zod schemas for user creation
- `components/` - User-specific components
- `query-keys.ts` - Query key factory for caching

**Exports**: Only necessary public APIs

### `packages/todos`

Owns everything related to todos:

- `api.tsx` - Todo API calls
- `hooks.tsx` - React hooks with optimistic updates
- `validation.ts` - Zod schemas for todo creation
- `components/` - Todo-specific components
- `query-keys.ts` - Query key factory for caching

**Exports**: Only necessary public APIs

### `packages/shared`

Contains truly shared code:

- `types.ts` - Shared TypeScript types
- `query-client.ts` - TanStack Query configuration
- `atoms.ts` - Jotai atoms for global UI state
- `ui/` - Reusable UI components (Button, Field, Panel, Spinner)
- `mocks/` - MSW handlers and mock data

**Important**: No feature-specific logic here.

## 🔐 Type Safety

- **Strict mode**: `"strict": true` in all tsconfig files
- **No `any`**: Enforced via ESLint
- **Zod validation**: Runtime type checking at API boundaries
- **TanStack Router**: Type-safe routes and params
- **TanStack Query**: Fully typed queries and mutations

## 📊 Performance Considerations

### Current Optimizations:

1. **Query caching**: 30s stale time prevents redundant requests
2. **Optimistic updates**: Instant UI feedback without waiting for server
3. **Query deduplication**: Multiple components requesting same data only trigger one fetch
4. **Lazy route loading**: Routes could be code-split (not implemented to keep bundle analysis simple)
5. **Minimal re-renders**: Jotai atoms only trigger updates on subscribers
6. **MSW in dev only**: Mock server only runs in development

### Future Optimizations (if scaling):

1. **Code splitting**: Dynamic imports for route components
2. **Virtual scrolling**: For large todo lists (react-virtual)
3. **Memoization**: Strategic `useMemo`/`useCallback` after profiling
4. **Prefetching**: Prefetch user data on hover
5. **Service worker**: Actual service worker for offline support

## 🧪 Testing Strategy (Production Approach)

**Note**: Tests are not implemented per requirements, but here's the strategy:

### Unit Tests (Vitest + Testing Library)

**Coverage Target**: 80%+

**What to test**:

- **Hooks**: All custom hooks in isolation
  - `useCreateTodo` - verify optimistic updates and rollback
  - `useUsers`, `useTodos` - verify correct query keys and params
- **Validation**: All Zod schemas
  - Valid inputs pass
  - Invalid inputs return correct errors
- **Utils**: Pure functions (date formatters, etc.)

**Example**:

```typescript
describe("useCreateTodo", () => {
  it("should add todo optimistically and rollback on error", async () => {
    // Test optimistic update and rollback logic
  });
});
```

### Integration Tests (Testing Library)

**Coverage Target**: Critical user paths

**What to test**:

- **User creation flow**: Form validation → submission → success/error
- **Todo creation with optimistic update**: Immediate appearance → rollback on error
- **Todo filtering**: Jotai state changes → correct query params
- **Error states**: Network failures show proper error messages

**Example**:

```typescript
describe("TodoCreationFlow", () => {
  it("should show todo immediately and rollback on API failure", async () => {
    // Mock API failure, verify rollback
  });
});
```

### E2E Tests (Playwright)

**Coverage Target**: Happy paths + critical errors

**What to test**:

- Complete user journey: Create user → Create todo → Filter todos
- Accessibility: Keyboard navigation, screen reader announcements
- Error recovery: Network failures, form validation

**Example**:

```typescript
test("user can create todo and see it in list", async ({ page }) => {
  // Full user flow
});
```

### Visual Regression (Chromatic/Percy)

- Component library snapshots
- Error state screenshots
- Loading state screenshots

### Performance Testing (Lighthouse CI)

- Bundle size monitoring
- Core Web Vitals thresholds
- Accessibility score enforcement

## 📝 Tech Stack

- **React 19** - UI library with latest concurrent features
- **TypeScript 6.0** - Type safety and developer experience
- **Vite 8** - Lightning-fast build tool
- **Turborepo 2** - Monorepo task orchestration
- **TanStack Router** - Type-safe routing
- **TanStack Query 5** - Server state management
- **Jotai 2** - Atomic state management
- **TailwindCSS 4** - Utility-first styling
- **Zod 4** - Schema validation
- **MSW 2** - API mocking
- **Vitest** - Unit testing framework

## 🏆 Why This Approach?

This architecture prioritizes:

1. **Maintainability** - Clear boundaries make changes safe
2. **Scalability** - Can grow to 100+ routes without becoming a monolith
3. **Developer Experience** - Type safety and fast feedback loops
4. **User Experience** - Optimistic updates, instant feedback, error recovery
5. **Team Velocity** - Multiple teams can work on different packages without conflicts

The goal was to demonstrate **senior-level thinking** about:

- Module boundaries and dependency management
- Data flow and state management patterns
- Type safety and runtime validation
- User experience and error handling
- Performance and scalability considerations

## 📄 License

MIT
