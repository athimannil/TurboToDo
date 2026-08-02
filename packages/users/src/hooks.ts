import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUser, getUsers, createUser } from "./api";
import type { CreateUserRequest } from "@repo/shared";
import { userKeys } from "./query-keys";

const useUsers = () => {
  return useQuery({
    queryKey: userKeys.all,
    queryFn: getUsers,
  });
};

const useUser = (userId: string) => {
  return useQuery({
    queryKey: userKeys.detail(userId),
    queryFn: () => getUser(userId),
    enabled: !!userId,
  });
};

const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUserRequest) => createUser(data),
    onSuccess: (newUser) => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
      queryClient.setQueryData(userKeys.detail(newUser.id), newUser);
    },
  });
};

export { useUsers, useUser, useCreateUser };
