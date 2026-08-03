import type {
  ToDoItem,
  ApiResponse,
  CreateToDoItemRequest,
  ToDoStatus,
} from "@repo/shared";

const API_BASE = "/api";

const getTodos = async (userId?: string): Promise<ToDoItem[]> => {
  const url = userId
    ? `${API_BASE}/todos?userId=${encodeURIComponent(userId)}`
    : `${API_BASE}/todos`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }

  const json: ApiResponse<ToDoItem[]> = await response.json();
  return json.data;
};

const createTodo = async (data: CreateToDoItemRequest): Promise<ToDoItem> => {
  const response = await fetch(`${API_BASE}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.error || "Failed to create todo");
  }

  const json: ApiResponse<ToDoItem> = await response.json();
  return json.data;
};

const updateTodoStatus = async (
  todoId: string,
  status: ToDoStatus,
): Promise<ToDoItem> => {
  const response = await fetch(`${API_BASE}/todos/${todoId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.error || "Failed to update todo status");
  }

  const json: ApiResponse<ToDoItem> = await response.json();
  return json.data;
};

export { getTodos, createTodo, updateTodoStatus };
