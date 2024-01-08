import { motion } from "framer-motion";

type Props = {
    value: number;
}

const draw = {
    hidden: {pathLength: 0, opacity: 0},
    visible: (i: number) => {
        const delay = 1 + i * 0.5;
        return {
            pathLength: 1,
            opacity: 1,
            transition: {
                pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
                opacity: { delay, duration: 0.01 }
            }
        }
    }
    
}

const CircularProgressBar = ({value}: Props) => {

  return (
    <div className="w-20 h-20 relative">
        <div className="w-full h-full p-2 rounded-full shadow-[6px_6px_10px_-1px_rgba(0,0,0,0.15),-6px_-6px_10px_-1px_rgba(255,255,255,0.6)]">
            <div className="w-16 h-16 flex justify-center items-center rounded-full shadow-[inset_-4px_-4px_6px_-1px_rgba(255,255,255,0.7),-0.5px_-0.5px_0_rgba(255,255,255,1),0_12px_10px_-10px_rgba(0,0,0,0.05)]">
                <span className="text-2xl font-bold text-blue-700 dark:text-sky-400">{value}</span>
            </div>
        </div>
        <motion.svg
            className="absolute top-0 left-0"
            width="80"
            height="80"
            viewBox="0 0 80 80"
            initial="hidden"
            animate="visible"
        >
            <linearGradient id="GradientColor">
                <stop offset={0} stopColor="#38bdf8" />
                <stop offset={100} stopColor="#1d4ed8" />
            </linearGradient>
            <motion.circle
                cx="40"
                cy="40"
                r="35"
                fill="none"
                stroke="url(#GradientColor)"
                strokeWidth={8}
                strokeLinecap="round"
                strokeDasharray={16}
                strokeDashoffset={value}
                variants={draw}
            />
        </motion.svg>
    </div>
  )
}

export default CircularProgressBar;