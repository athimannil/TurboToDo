import { RootRoute, Route, Router } from "@tanstack/react-router";
import Root from "./routes/__root";
import Home from "./routes/index";
import UsersPage from "./routes/users/index";
import UserDetail from "./routes/users/$userId";
import TodoPage from "./routes/todos";

const rootRoute = new RootRoute({
  component: Root,
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const usersRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/users",
  component: UsersPage,
});

const userDetailRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/users/$userId",
  component: UserDetail,
});

const todoRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/todos",
  component: TodoPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  usersRoute,
  userDetailRoute,
  todoRoute,
]);

export const router = new Router({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
