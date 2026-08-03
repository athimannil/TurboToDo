# ToDo Application - Monorepo Architecture

A React application demonstrating modular architecture through strategic package separation, optimistic updates, and type-safe data flow.

## 🏗️ Architecture & Key Decisions

### Monorepo Structure

```
apps/web/           → Route orchestration & composition only
packages/
  users/            → User domain (isolated)
  todos/            → Todo domain (isolated)
  shared/           → Common utilities & UI
```

**Dependency rule**: Feature packages (`users`, `todos`) never import from each other — only from `shared`.

### Why Split This Way?

**Decision**: Separate domains into isolated packages instead of colocating in the app.

**Reasoning**:

- **Team scalability**: Multiple teams can work on `users` and `todos` without conflicts
- **Clear ownership**: Each package has explicit public APIs
- **Reusability**: Packages can be consumed by mobile app, admin dashboard, etc.
- **Testability**: Domains tested in complete isolation
- **Safe refactoring**: Changes to user logic cannot accidentally break todos

**Trade-off**: More upfront structure, but prevents the "big ball of mud" as features grow.

### Technical Choices

| Decision                | Why                                                        | Trade-off                                                  |
| ----------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- |
| **TanStack Query**      | Built-in caching, optimistic updates, revalidation         | ~20KB bundle, but eliminates manual cache logic            |
| **Jotai**               | Atomic UI state without prop drilling                      | Learning curve vs Context API, but better performance      |
| **Query Key Factories** | Type-safe cache invalidation (`todoKeys.all()`)            | Extra abstraction, but prevents cache bugs                 |
| **MSW**                 | Intercepts real network requests for realistic dev/testing | Mock maintenance overhead vs backend dependency            |
| **Zod**                 | Runtime validation + TypeScript type inference             | ~8KB vs manual validation, but catches API contract breaks |

### Implementation Highlights

**Optimistic Updates**: Todos appear instantly with automatic rollback on API failure ([hooks.tsx](packages/todos/src/hooks.tsx#L45-L72))

**State Management**:

- Server state → TanStack Query (users, todos)
- Cross-cutting UI state → Jotai (user filter)
- Form state → React (no library needed)

**Type Safety**: Strict TypeScript + Zod validation at all API boundaries

## 🚀 Quick Start

```bash
npm install
npm run dev  # → http://localhost:3000
```

**Build**: `npm run build` | **Test**: `npm run test` | **Lint**: `npm run lint`

## 🧪 Testing Approach

Test infrastructure configured (Vitest + Testing Library). Ready for:

- Unit tests: Hooks, validation schemas
- Integration tests: User flows with MSW
- E2E: Playwright setup-ready

## 📦 Tech Stack

React 19, TypeScript, Vite, Turborepo, TanStack Router/Query, Jotai, TailwindCSS, Zod, MSW

---

**Key Principle**: This structure prioritizes maintainability and team velocity over simplicity. Each package can evolve independently without breaking others.
