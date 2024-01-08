import Image from "next/image";
import ProfileIcon from "@/components/SvgIcons/ProfileIcon/ProfileIcon";

type Props = {
    image?: string | undefined | null;
}

export const UserBadge = ({image}: Props) => {

    return (
      <div className="w-11 h-11 flex justify-center items-center py-2  rounded-full shadow border border-2 lg:mr-6 bg-white     hover:bg-gray-200 border-white dark:bg-blue-950     dark:hover:bg-blue-900 dark:border-blue-900 overflow-hidden">
        {image ? (
            <Image 
                width={44}
                height={44}
                className=""
                src={image}
                alt="Profile"
                priority
            />
        ) : (
            <ProfileIcon classNames="w-7 h-7" lightThemeColor="#1d4ed8"  darkThemeColor="#38bdf8" />
        )}
      </div>
    )
}
