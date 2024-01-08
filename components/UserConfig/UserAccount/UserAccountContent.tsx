import { UserAccountDetailsList } from './UserAccountDetailsList'
import { User } from '@prisma/client'


const UserAccountContent = (props: Partial<User>) => {

    return (
        <section id="section-account">
            <div className="w-full flex justify-center rounded-lg px-4 pb-8 pt-6 text-blue-700 dark:text-white bg-sky-100 dark:bg-[#0F1A3E]">
                <UserAccountDetailsList {...props} />
            </div>
        </section>
    )
}

export default UserAccountContent;