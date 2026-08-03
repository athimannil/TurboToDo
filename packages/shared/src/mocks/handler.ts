import { http, HttpResponse, delay } from "msw";
import { users } from "./data";

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
];

export default handlers;
