import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import UserProfileContent from "@/components/UserConfig/UserProfile/UserProfileContent"

const UserProfilePage = async () => {

    const session = await getServerSession(authOptions);
    const user = session?.user;

    return (
      <div className="w-full flex flex-col">
        <UserProfileContent {...user} />
      </div>
    )
};

export default UserProfilePage;
