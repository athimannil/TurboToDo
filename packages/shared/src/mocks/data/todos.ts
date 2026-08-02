import type { ToDoItem } from "../../types";

const todoItems: ToDoItem[] = [
  {
    id: "1",
    userId: "1",
    title: "Learn React",
    status: "pending",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    userId: "1",
    title: "Learn TypeScript",
    status: "pending",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    userId: "2",
    title: "Build a ToDo App",
    status: "done",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    userId: "3",
    title: "Write Tests",
    status: "done",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export { todoItems };
