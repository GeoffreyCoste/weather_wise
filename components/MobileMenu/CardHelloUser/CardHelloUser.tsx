
import { User } from "@prisma/client"
import { UserBadge } from "./UserBadge"
import { UserHelloText } from "./UserHelloText"

type Props = {
    user?: Partial<User>;
}

export const CardHelloUser = ({user}: Props) => {

    return (
        <div className="w-full mb-14 p-4 text-white dark:text-[#0F1A3E] bg-gradient-to-tr from-blue-700 to-blue-400 dark:text-[#172554] dark:bg-gradient-to-tr dark:from-sky-400 dark:to-cyan-300 rounded-lg">
            <div className="flex mx-4">
                <div className="mr-4">
                    <UserBadge image={user?.image} />
                </div>
                <div className="flex-col">
                    <UserHelloText />
                    <p className="font-extrabold">{user?.firstName}</p>
                </div>
            </div>
        </div>
    )
}
