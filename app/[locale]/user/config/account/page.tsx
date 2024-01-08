import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import UserAccountContent from "@/components/UserConfig/UserAccount/UserAccountContent";

const UserAccountPage = async () => {

    const session = await getServerSession(authOptions);
    const user = session?.user;

    return (
      <div className="w-full flex flex-col">
        <UserAccountContent {...user} />
      </div>
    )
};

export default UserAccountPage;
