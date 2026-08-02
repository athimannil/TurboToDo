import type { User, CreateUserRequest, ApiResponse } from "@repo/shared";

const API_BASE = "/api";

const getUsers = async (): Promise<User[]> => {
  const response = await fetch(`${API_BASE}/users`);

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const json: ApiResponse<User[]> = await response.json();
  return json.data;
};

const getUser = async (userId: string): Promise<User> => {
  const response = await fetch(`${API_BASE}/user/${userId}`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("User not found");
    }
    throw new Error("Failed to fetch user");
  }

  const json: ApiResponse<User> = await response.json();
  return json.data;
};

const createUser = async (data: CreateUserRequest): Promise<User> => {
  const response = await fetch(`${API_BASE}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.status === 409) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.error || "Failed to create user");
  }

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.error || "Failed to create user");
  }

  const json: ApiResponse<User> = await response.json();
  return json.data;
};

export { getUsers, getUser, createUser };
