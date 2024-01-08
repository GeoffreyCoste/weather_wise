import { cookies } from "next/headers";
import UserSettingsContent from "@/components/UserConfig/UserSettings/UserSettingsContent";

const UserSettingsPage = async () => {

    const cookieStore = cookies();
    const themeCookie = cookieStore.get('theme')?.value ?? ''
    const temperatureCookie = cookieStore.get('temperature')?.value ?? ''
    const windspeedCookie = cookieStore.get('windspeed')?.value ?? ''

    return (
      <div className="w-full flex flex-col">
        <UserSettingsContent themeCookie={themeCookie} temperatureCookie={temperatureCookie} windspeedCookie={windspeedCookie} />
      </div>
    )
};

export default UserSettingsPage;
