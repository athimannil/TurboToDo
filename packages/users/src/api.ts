import type { User, ApiResponse } from "@repo/shared";

const API_BASE = "/api";

const getUsers = async (): Promise<User[]> => {
  const response = await fetch(`${API_BASE}/users`);

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const json: ApiResponse<User[]> = await response.json();
  return json.data;
};

export { getUsers };
