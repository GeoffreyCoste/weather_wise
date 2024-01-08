"use client"

import { LazyMotion, m, domAnimation } from "framer-motion"

const draw = {
    hidden: {
        strokeWidth: 17
    },
    visible: (i: number) => {
        const delay = 1 + i * 0.5;
        return {
            strokeWidth: 4,
            transition: {
                strokeWidth: {
                    delay,
                    duration: 1, 
                    repeat: Infinity, 
                    repeatType: "reverse",
                    ease: "linear",
                }
            },
        }
    }
}

export const AnimatedSun = () => {

    return (
        <div 
            className="w-36 h-36 md:w-48 md:h-48 lg:w-60 lg:h-60 rounded-full overflow-hidden"
        >
            <LazyMotion features={domAnimation}>
                <m.svg
                    viewBox= "0 0 300 300"
                    initial="hidden"
                    animate="visible"
                >
                    <m.line 
                        x1="0"
                        y1="0"
                        x2="300"
                        y2="0"
                        stroke="#facc15"
                        variants={draw}
                        custom={3}
                    />
                    <m.line 
                        x1="0"
                        y1="20"
                        x2="300"
                        y2="20"
                        stroke="#facc15"
                        variants={draw}
                        custom={2.8}
                    />
                    <m.line 
                        x1="0"
                        y1="40"
                        x2="300"
                        y2="40"
                        stroke="#facc15"
                        variants={draw}
                        custom={2.6}
                    />
                    <m.line 
                        x1="0"
                        y1="60"
                        x2="300"
                        y2="60"
                        stroke="#facc15"
                        variants={draw}
                        custom={2.4}
                    />
                    <m.line 
                        x1="0"
                        y1="80"
                        x2="300"
                        y2="80"
                        stroke="#facc15"
                        variants={draw}
                        custom={2.2}
                    />
                    <m.line 
                        x1="0"
                        y1="100"
                        x2="300"
                        y2="100"
                        stroke="#facc15"
                        variants={draw}
                        custom={2}
                    />
                    <m.line 
                        x1="0"
                        y1="120"
                        x2="300"
                        y2="120"
                        stroke="#facc15"
                        variants={draw}
                        custom={1.8}
                    />
                    <m.line 
                        x1="0"
                        y1="140"
                        x2="300"
                        y2="140"
                        stroke="#facc15"
                        variants={draw}
                        custom={1.6}
                    />
                    <m.line 
                        x1="0"
                        y1="160"
                        x2="300"
                        y2="160"
                        stroke="#facc15"
                        variants={draw}
                        custom={1.4}
                    />
                    <m.line 
                        x1="0"
                        y1="180"
                        x2="300"
                        y2="180"
                        stroke="#facc15"
                        variants={draw}
                        custom={1.2}
                    />
                    <m.line 
                        x1="0"
                        y1="200"
                        x2="300"
                        y2="200"
                        stroke="#facc15"
                        variants={draw}
                        custom={1}
                    />
                    <m.line 
                        x1="0"
                        y1="220"
                        x2="300"
                        y2="220"
                        stroke="#facc15"
                        variants={draw}
                        custom={0.8}
                    />
                    <m.line 
                        x1="0"
                        y1="240"
                        x2="300"
                        y2="240"
                        stroke="#facc15"
                        variants={draw}
                        custom={0.6}
                    />
                    <m.line 
                        x1="0"
                        y1="260"
                        x2="300"
                        y2="260"
                        stroke="#facc15"
                        variants={draw}
                        custom={0.4}
                    />
                    <m.line 
                        x1="0"
                        y1="280"
                        x2="300"
                        y2="280"
                        stroke="#facc15"
                        variants={draw}
                        custom={0.2}
                    />
                    <m.line 
                        x1="0"
                        y1="300"
                        x2="300"
                        y2="300"
                        stroke="#facc15"
                        variants={draw}
                        custom={0.2}
                    />
                </m.svg>
            </LazyMotion>
        </div>
    )
}





