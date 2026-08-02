import { APP_SHARED } from "@repo/shared";
import { APP_TODOS } from "@repo/todos";
import { APP_USERS } from "@repo/users";
import { useUsers } from "@repo/users";

function App() {
  const { data: users, isLoading, error } = useUsers();
  console.log("Users:", users);
  console.log("Loading:", isLoading);
  console.log("Error:", error);
  return (
    <>
      <h1>{APP_SHARED}</h1>
      <h2>{APP_TODOS}</h2>
      <h3>{APP_USERS}</h3>
      <ul>
        {users?.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
