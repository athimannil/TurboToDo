export const todoKeys = {
  all: ["todos"] as const,
  byUser: (userId: string) => ["todos", userId] as const,
};
