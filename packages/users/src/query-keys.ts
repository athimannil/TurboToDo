export const userKeys = {
  all: ["users"] as const,
  detail: (userId: string) => ["users", userId] as const,
};
