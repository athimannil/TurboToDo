import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { todoKeys } from "./query-keys";
import { getTodos, createTodo, updateTodoStatus } from "./api";
import type { ToDoItem, CreateToDoItemRequest, ToDoStatus } from "@repo/shared";

const useTodos = (userId?: string) => {
  return useQuery<ToDoItem[], Error>({
    queryKey: userId ? todoKeys.byUser(userId) : todoKeys.all,
    queryFn: () => getTodos(userId),
    enabled: userId ? !!userId : true,
  });
};

const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ToDoItem,
    Error,
    CreateToDoItemRequest,
    {
      previousTodos?: ToDoItem[];
      previousUserTodos?: ToDoItem[];
    }
  >({
    mutationFn: (data: CreateToDoItemRequest) => createTodo(data),
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: todoKeys.all });

      const previousTodos = queryClient.getQueryData<ToDoItem[]>(todoKeys.all);
      const previousUserTodos = queryClient.getQueryData<ToDoItem[]>(
        todoKeys.byUser(newTodo.userId),
      );

      const optimisticTodo: ToDoItem = {
        id: `temp-${Date.now()}`,
        title: newTodo.title,
        description: newTodo.description,
        status: newTodo.status || "pending",
        userId: newTodo.userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Optimistically update all todos cache
      queryClient.setQueryData<ToDoItem[]>(todoKeys.all, (old = []) => {
        return [...old, optimisticTodo];
      });

      // Optimistically update user-specific todos cache
      queryClient.setQueryData<ToDoItem[]>(
        todoKeys.byUser(newTodo.userId),
        (old = []) => {
          return [...old, optimisticTodo];
        },
      );

      return { previousTodos, previousUserTodos };
    },

    onError: (_err, newTodo, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(todoKeys.all, context.previousTodos);
      }
      if (context?.previousUserTodos) {
        queryClient.setQueryData(
          todoKeys.byUser(newTodo.userId),
          context.previousUserTodos,
        );
      }
    },

    onSuccess: () => {
      // Invalidate all todo queries to refetch fresh data
      queryClient.invalidateQueries({ queryKey: todoKeys.all });
    },
  });
};

const useToggleTodoStatus = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ToDoItem,
    Error,
    { todoId: string; status: ToDoStatus },
    {
      previousTodos?: ToDoItem[];
    }
  >({
    mutationFn: ({ todoId, status }: { todoId: string; status: ToDoStatus }) =>
      updateTodoStatus(todoId, status),
    onMutate: async ({ todoId, status }) => {
      await queryClient.cancelQueries({ queryKey: todoKeys.all });

      const previousTodos = queryClient.getQueryData<ToDoItem[]>(todoKeys.all);

      queryClient.setQueryData<ToDoItem[]>(todoKeys.all, (current) => {
        return current?.map((todo) =>
          todo.id === todoId ? { ...todo, status } : todo,
        );
      });
      return { previousTodos };
    },

    onError: (_err, _data, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(todoKeys.all, context.previousTodos);
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todoKeys.all });
    },
  });
};

export { useTodos, useCreateTodo, useToggleTodoStatus };
