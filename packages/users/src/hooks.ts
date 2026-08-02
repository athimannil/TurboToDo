import { useQuery } from "@tanstack/react-query";
import { getUsers } from "./api";
import { userKeys } from "./query-keys";

const useUsers = () => {
  return useQuery({
    queryKey: userKeys.all,
    queryFn: getUsers,
  });
};

export { useUsers };
