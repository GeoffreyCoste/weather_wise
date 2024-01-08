type Props = {
    isClicked: boolean
}

const DottedToggle = ({isClicked}: Props) => {

    return (
        <div 
            id="dotted-toggle" 
            className={`relative flex flex-col justify-center items-center gap-y-1 cursor-pointer ${isClicked && 'transition-transform rotate-45'}`} 
        >
            <div className="w-1 h-1 rounded-full bg-gray-200 dark:bg-gray-400 transition-color group-hover:bg-blue-700 group-hover:transition-color group-hover:dark:bg-sky-400"></div>
            <div className="w-1 h-1 rounded-full bg-gray-200 dark:bg-gray-400 transition-color group-hover:bg-blue-700 group-hover:transition-color group-hover:dark:bg-sky-400"></div>
            <div className="w-1 h-1 rounded-full bg-gray-200 dark:bg-gray-400 transition-color group-hover:bg-blue-700 group-hover:transition-color group-hover:dark:bg-sky-400"></div>
            <div className={`absolute top-1/2 left-1/2 ${isClicked ? 'opacity-100' : 'opacity-0'} mt-[-2px] ml-[-10px] w-1 h-1 rounded-full bg-gray-200 dark:bg-gray-400 transition-color group-hover:bg-blue-700 group-hover:transition-color group-hover:dark:bg-sky-400`}></div>
            <div className={`absolute top-1/2 left-1/2 ${isClicked ? 'opacity-100' : 'opacity-0'} mt-[-2px] ml-[6px] w-1 h-1 rounded-full bg-gray-200 dark:bg-gray-400 transition-color group-hover:bg-blue-700 group-hover:transition-color group-hover:dark:bg-sky-400`}></div>
        </div>
    )
}

export default DottedToggle;