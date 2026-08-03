import { z } from "zod";

export const createTodoSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(200, "Title must not exceed 200 characters"),
  userId: z.string().min(1, "Please select a user"),
  description: z
    .string()
    .max(1000, "Description must not exceed 1000 characters")
    .optional(),
});

export type CreateTodoInput = z.infer<typeof createTodoSchema>;
