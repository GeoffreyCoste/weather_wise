import { useTheme } from "@/hooks/useTheme"

export const EyeSlashIcon = () => {

  const {themeState} = useTheme();

  return (
    <svg className="w-6 h-6 absolute" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill={themeState.theme === 'light' ? "#1d4ed8" : "#38bdf8"}><g id="eyeSlashIcon_bgCarrier" strokeWidth="0"></g><g id="eyeSlashIcon_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="eyeSlashIcon_iconCarrier"> <title>eye_close_line</title> <g id="eyeSlashIcon_0" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="eyeSlashIcon_System" transform="translate(-384.000000, 0.000000)" fillRule="nonzero"> <g id="eyeSlashIcon_close_line" transform="translate(384.000000, 0.000000)"> <path d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z" id="eyeSlashIcon_1" fillRule="nonzero"> </path> <path d="M3.04923,9.31077 C3.01728,9.21295 3,9.10849 3,9 C3,8.44772 3.44772,8 4,8 C4.4597,8 4.84695,8.31019 4.96387,8.73268 C7.04968,15.7186 16.9456,15.7202 19.0348,8.73735 C19.1502,8.31248 19.5386,8 20,8 C20.5523,8 21,8.44772 21,9 C21,9.10681 20.9833,9.2097 20.9522,9.30621 C20.5515,10.6482 19.9241,11.7876 19.1387,12.7244 L20.4143,14 C20.8048,14.3905 20.8048,15.0237 20.4143,15.4142 C20.0238,15.8047 19.3906,15.8047 19.0001,15.4142 L17.6887,14.1028 C16.9745,14.6426 16.1912,15.0655 15.3686,15.3716 L15.7264,16.7071 C15.8694,17.2406 15.5528,17.7889 15.0193,17.9318 C14.4858,18.0748 13.9375,17.7582 13.7946,17.2247 L13.4311,15.8682 C12.4836,16.0084 11.5164,16.0084 10.5689,15.8682 L10.2054,17.2247 C10.0625,17.7582 9.51416,18.0748 8.9807,17.9318 C8.44723,17.7889 8.13065,17.2406 8.27359,16.7071 L8.63144,15.3716 C7.80891,15.0655 7.0256,14.6426 6.31146,14.1029 L5.00017,15.4142 C4.60964,15.8047 3.97648,15.8047 3.58596,15.4142 C3.19543,15.0237 3.19543,14.3905 3.58596,14 L4.86147,12.7245 C4.07689,11.7887 3.45009,10.6508 3.04923,9.31077 Z" id="eyeSlashIcon_2" fill={themeState.theme === 'light' ? "#1d4ed8" : "#38bdf8"}> </path> </g> </g> </g> </g></svg>
  )
}