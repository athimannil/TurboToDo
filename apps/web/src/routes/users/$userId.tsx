import { Link } from "@tanstack/react-router";
import { Panel } from "@repo/shared";
import { UserDetails } from "@repo/users";
import { useParams } from "@tanstack/react-router";

const UserDetail = () => {
  const { userId } = useParams({ from: "/users/$userId" });

  return (
    <div className="flex flex-col gap-6">
      <Link
        to="/users"
        className="text-sm text-primary underline-offset-4 hover:underline"
      >
        ← All users
      </Link>

      <Panel title="User Details" description="View and edit user details.">
        <UserDetails userId={userId} />
      </Panel>
    </div>
  );
};

export default UserDetail;
