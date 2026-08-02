export interface User {
  id: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ToDoStatus = "pending" | "done";

export interface ToDoItem {
  id: string;
  userId: string;
  title: string;
  description?: string;
  status: ToDoStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

export interface CreateUserRequest {
  username: string;
}

export interface CreateToDoItemRequest {
  userId: string;
  title: string;
  description?: string;
  status?: ToDoStatus;
}
