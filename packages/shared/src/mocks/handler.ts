import { http, HttpResponse, delay } from "msw";
import { users } from "./data";

import type { CreateUserRequest, User } from "@repo/shared";

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
];

export default handlers;
