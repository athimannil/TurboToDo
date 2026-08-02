import { http, HttpResponse, delay } from "msw";
import { users } from "./data";

const BASE_URL = typeof window !== "undefined" ? "" : "http://localhost";

const handlers = [
  http.get(`${BASE_URL}/api/users`, async () => {
    await delay(500);
    return HttpResponse.json({ data: users });
  }),
];

export default handlers;
