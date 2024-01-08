import { UserProfileInputFile } from './UserProfileInputFile'
import { UserProfileForm } from './UserProfileForm'
import { getCityById } from '@/utils/handleData'
import { User } from '@prisma/client'
import UserProfileTitle from './UserProfileTitle'

export type UserInfos = {
    userId: string | undefined;
    userImage: string | null | undefined;
    userEmail: string | undefined;
    userFirstName: string | undefined;
    userLastName: string | undefined;
    userLocation: {
      value: string;
      labelFr: string;
      labelEn: string;
    },
}

const UserProfileContent = async (props: Partial<User>) => {

    const {id, image, email, firstName, lastName, location} = props;

    const city = await getCityById(location);

    const {geonameId, nameFr, nameEn} = city;

    const userInfos: UserInfos = {
        userId: id,
        userImage: image,
        userEmail: email,
        userFirstName: firstName,
        userLastName: lastName,
        userLocation: {
            value: geonameId,
            labelFr: nameFr,
            labelEn: nameEn
        }
    }

    return (
        <section id="section-profile">
            <div className="w-full flex flex-col justify-center items-center rounded-lg px-4 py-24 text-blue-700 dark:text-white bg-sky-100 dark:bg-[#0F1A3E]">
                <UserProfileInputFile imageUrl={image} />
                <UserProfileTitle {...userInfos} />
                <UserProfileForm {...userInfos} />
            </div>
        </section>
    )
}

export default UserProfileContent;