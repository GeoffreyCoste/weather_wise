'use client'

import { useTheme } from "@/hooks/useTheme"

type Props = {
  classNames: string;
}

const CameraIcon = ({classNames}: Props) => {

  const {themeState} = useTheme();

  return (
    <svg className={classNames} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="CameraIcon_bgCarrier" strokeWidth="0"></g><g id="CameraIcon_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="CameraIcon_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12 10.25C12.4142 10.25 12.75 10.5858 12.75 11V12.25H14C14.4142 12.25 14.75 12.5858 14.75 13C14.75 13.4142 14.4142 13.75 14 13.75H12.75V15C12.75 15.4142 12.4142 15.75 12 15.75C11.5858 15.75 11.25 15.4142 11.25 15V13.75H10C9.58579 13.75 9.25 13.4142 9.25 13C9.25 12.5858 9.58579 12.25 10 12.25H11.25V11C11.25 10.5858 11.5858 10.25 12 10.25Z" fill={themeState.theme === 'light' ? '#ffffff' : '#0f1a3e'}></path> <path fillRule="evenodd" clipRule="evenodd" d="M9.77778 21H14.2222C17.3433 21 18.9038 21 20.0248 20.2646C20.51 19.9462 20.9267 19.5371 21.251 19.0607C22 17.9601 22 16.4279 22 13.3636C22 10.2994 22 8.76721 21.251 7.6666C20.9267 7.19014 20.51 6.78104 20.0248 6.46268C19.3044 5.99013 18.4027 5.82123 17.022 5.76086C16.3631 5.76086 15.7959 5.27068 15.6667 4.63636C15.4728 3.68489 14.6219 3 13.6337 3H10.3663C9.37805 3 8.52715 3.68489 8.33333 4.63636C8.20412 5.27068 7.63685 5.76086 6.978 5.76086C5.59733 5.82123 4.69555 5.99013 3.97524 6.46268C3.48995 6.78104 3.07328 7.19014 2.74902 7.6666C2 8.76721 2 10.2994 2 13.3636C2 16.4279 2 17.9601 2.74902 19.0607C3.07328 19.5371 3.48995 19.9462 3.97524 20.2646C5.09624 21 6.65675 21 9.77778 21ZM16 13C16 15.2091 14.2091 17 12 17C9.79086 17 8 15.2091 8 13C8 10.7909 9.79086 9 12 9C14.2091 9 16 10.7909 16 13ZM18 9.25C17.5858 9.25 17.25 9.58579 17.25 10C17.25 10.4142 17.5858 10.75 18 10.75H19C19.4142 10.75 19.75 10.4142 19.75 10C19.75 9.58579 19.4142 9.25 19 9.25H18Z" fill={themeState.theme === 'light' ? '#ffffff' : '#0f1a3e'}></path> </g></svg>
  )
}

export default CameraIcon;