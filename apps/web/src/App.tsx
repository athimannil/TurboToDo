import { APP_SHARED } from "@repo/shared";
import { APP_TODOS } from "@repo/todos";
import { APP_USERS } from "@repo/users";

function App() {
  return (
    <>
      <h1>{APP_SHARED}</h1>
      <h2>{APP_TODOS}</h2>
      <h3>{APP_USERS}</h3>
    </>
  );
}

export default App;
