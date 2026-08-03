import { http, delay, HttpResponse } from "msw";

import { users, todoItems } from "./data";

import type {
  User,
  ToDoItem,
  CreateUserRequest,
  CreateToDoItemRequest,
} from "./../types";

const BASE_URL = typeof window !== "undefined" ? "" : "http://localhost";

const handlers = [
  http.get(`${BASE_URL}/api/users`, async () => {
    await delay(500);
    return HttpResponse.json({ data: users });
  }),

  http.get(`${BASE_URL}/api/user/:id`, async ({ params }) => {
    await delay(500);
    const { id } = params;
    const user = users.find((user) => user.id === id);

    if (!user) {
      return HttpResponse.json({ error: "User not found" }, { status: 404 });
    }

    return HttpResponse.json({ data: user });
  }),

  http.post(`${BASE_URL}/api/user`, async ({ request }) => {
    await delay(200);
    const body = (await request.json()) as CreateUserRequest;

    // Validate username
    if (!body.username || body.username.trim().length < 3) {
      return HttpResponse.json(
        { error: "Username must be at least 3 characters" },
        { status: 400 },
      );
    }

    // Check for duplicate username
    if (users.some((u) => u.username === body.username)) {
      return HttpResponse.json(
        { error: "Username already exists" },
        { status: 409 },
      );
    }

    const newUser: User = {
      id: String(users.length + 1),
      username: body.username.trim(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    users.push(newUser);
    return HttpResponse.json({ data: newUser }, { status: 201 });
  }),

  http.get(`${BASE_URL}/api/todos`, async ({ request }) => {
    await delay(500);
    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");

    if (userId) {
      const userTodos = todoItems.filter((todo) => todo.userId === userId);
      return HttpResponse.json({ data: userTodos });
    }
    return HttpResponse.json({ data: todoItems });
  }),

  http.post(`${BASE_URL}/api/todos`, async ({ request }) => {
    await delay(200);

    const body = (await request.json()) as CreateToDoItemRequest;

    // Validate title
    if (!body.title || body.title.trim().length < 2) {
      return HttpResponse.json(
        { error: "Title must be at least 2 characters" },
        { status: 400 },
      );
    }

    if (!body.userId || !users.some((u) => u.id === body.userId)) {
      return HttpResponse.json({ error: "Invalid userId" }, { status: 400 });
    }

    const { userId, title, description, status } = body;
    const newTodo: ToDoItem = {
      id: String(todoItems.length + 1),
      userId,
      title: title.trim(),
      description: description?.trim(),
      status: status || "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    todoItems.push(newTodo);
    return HttpResponse.json({ data: newTodo }, { status: 201 });
  }),

  http.patch(`${BASE_URL}/api/todos/:id`, async ({ params, request }) => {
    await delay(200);
    const { id } = params;
    const body = (await request.json()) as { status: ToDoItem["status"] };

    const todoIndex = todoItems.findIndex((todo) => todo.id === id);
    if (todoIndex === -1) {
      return HttpResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    if (!body.status) {
      return HttpResponse.json(
        { error: "Status is required" },
        { status: 400 },
      );
    }

    if (!["pending", "done"].includes(body.status)) {
      return HttpResponse.json(
        { error: "Invalid status value" },
        { status: 400 },
      );
    }

    todoItems[todoIndex] = {
      ...todoItems[todoIndex],
      status: body.status,
      updatedAt: new Date(),
    };

    return HttpResponse.json({ data: todoItems[todoIndex] });
  }),
];

export default handlers;
