import { motion } from "framer-motion"

type Props = {
    value: number;
}

const CircularChart = ({value}: Props) => {
    const r = 35;
    const circonference = 2 * Math.PI * r;
    const percentage = value * 6.25;
    const strokePercentage = ((100 - percentage) * circonference) / 100;

    const draw = {
        hidden: {pathLength: 0, opacity: 0},
        visible: (i: number) => {
            const delay = 1 + i * 0.5;
            return {
                pathLength: (value * 0.0625),
                opacity: 1,
                transition: {
                    pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
                    opacity: { delay, duration: 0.01 }
                }
            }
        }
    }

    return (
        <div className="w-20 h-20 relative flex justify-center items-center">
            <span className="text-2xl font-bold text-blue-700 dark:text-sky-400">{value}</span>
            <motion.svg
                width={80}
                height={80}
                className="absolute top-0 left-0"
            >
                <g transform={`rotate(-90 ${"40 40"})`}>
                    <linearGradient id="GradientColor">
                        <stop offset={0} stopColor="#1d4ed8" />
                        <stop offset={value * 0.0625} stopColor="#38bdf8" />
                    </linearGradient>
                    <circle
                        r={r}
                        cx={40}
                        cy={40}
                        fill="transparent"
                        stroke="#f4f4f5"
                        strokeWidth={8}
                        strokeLinecap="round"
                        strokeDasharray={circonference}
                        strokeDashoffset={0}
                    ></circle>
                    <motion.circle
                        r={r}
                        cx={40}
                        cy={40}
                        fill="transparent"
                        stroke="#1d4ed8"
                        strokeWidth={8}
                        strokeLinecap="round"
                        strokeDasharray={circonference}
                        strokeDashoffset={strokePercentage}
                        initial="hidden"
                        animate="visible"
                        variants={draw}
                    ></motion.circle>
                </g>
            </motion.svg>
        </div>
    )
}

export default CircularChart;