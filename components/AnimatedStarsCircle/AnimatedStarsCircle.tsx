"use client"

import { LazyMotion, m, domAnimation } from "framer-motion"
import { useTheme } from "@/hooks/useTheme"

const pathVariants = {
    hidden: {
        pathLength: 0,
        opacity: 0
    },
    visible : (i: number) => {
      const delay = i * 0.1;
      return {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: { delay, type: 'spring', bounce: 0, ease: "linear"}, // To add repeat: repeat: Infinity, repeatType: "loop", repeatDelay: 5
          opacity: { delay, type: 'spring', bounce: 0, ease: "linear"},
        }
      }
    },
}

export const AnimatedStarsCircle = () => {

    const {themeState} = useTheme();

    return (
            <div className="w-full h-full relative">
                <LazyMotion features={domAnimation}>
                    <m.svg 
                        version="1.1" 
                        xmlns="http://www.w3.org/2000/svg" 
                        xmlnsXlink="http://www.w3.org/1999/xlink" 
                        x="0px" 
                        y="0px"
	                    viewBox="0 0 350 285.3" 
                        xmlSpace="preserve"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{once: true, amount: 'all'}}
                    >
                        <g>
                        	<g>
                        		<m.path fill={themeState.theme === "light" ?  '#bae6fd' :  '#172554'} variants={pathVariants} custom={7} d="M305.7,162.7l-14.1-7c-1.8-0.9-3.9-0.8-5.6,0.1l-13.8,7.7c-4.4,2.4-9.6-1.2-8.9-6.2l2.3-15.6c0.3-2-0.4-4-1.9-5.3
                        			l-11.6-10.8c-3.7-3.4-1.8-9.5,3.1-10.4l15.6-2.6c2-0.3,3.6-1.6,4.5-3.4l6.7-14.3c2.1-4.5,8.5-4.7,10.8-0.3l7.3,14
                        			c0.9,1.8,2.7,3,4.6,3.2l15.7,1.9c5,0.6,7.1,6.6,3.6,10.2l-11,11.3c-1.4,1.4-2,3.4-1.6,5.4l3,15.5
                        			C315.3,161,310.2,164.9,305.7,162.7z"/>
                        	</g>
                        	<g>
                        		<m.path fill={themeState.theme === "light" ?  '#bae6fd' :  '#172554'} variants={pathVariants} custom={6} d="M271,239.2l-12.5-6.2c-1.6-0.8-3.4-0.7-5,0.1l-12.2,6.8c-3.9,2.2-8.5-1.1-7.9-5.4l2-13.8c0.3-1.7-0.4-3.5-1.6-4.7
                        			l-10.2-9.5c-3.2-3-1.6-8.4,2.7-9.2l13.8-2.3c1.7-0.3,3.2-1.4,4-3l5.9-12.7c1.9-4,7.5-4.1,9.6-0.2l6.5,12.4
                        			c0.8,1.6,2.3,2.6,4.1,2.8l13.9,1.7c4.4,0.5,6.3,5.9,3.2,9l-9.8,10c-1.2,1.3-1.8,3-1.4,4.8l2.7,13.7
                        			C279.5,237.7,275,241.2,271,239.2z"/>
                        	</g>
                        	<g>
                        		<m.path fill={themeState.theme === "light" ?  '#bae6fd' :  '#172554'} variants={pathVariants} custom={5} d="M189.7,269.3l-10.9-5.4c-1.4-0.7-3-0.6-4.3,0.1l-10.6,5.9c-3.4,1.9-7.4-0.9-6.8-4.7l1.8-12c0.2-1.5-0.3-3-1.4-4.1
                        			l-8.9-8.3c-2.8-2.6-1.4-7.3,2.4-8l12-2c1.5-0.3,2.8-1.2,3.4-2.6l5.1-11c1.6-3.5,6.5-3.6,8.3-0.2l5.6,10.7c0.7,1.4,2,2.3,3.6,2.5
                        			l12,1.5c3.8,0.5,5.4,5.1,2.8,7.9l-8.5,8.7c-1.1,1.1-1.5,2.6-1.2,4.1l2.3,11.9C197.1,268.1,193.2,271,189.7,269.3z"/>
                        	</g>
                        	<g>
                        		<m.path fill={themeState.theme === "light" ?  '#bae6fd' :  '#172554'} variants={pathVariants} custom={4} d="M107.4,232.7l-9.2-4.6c-1.2-0.6-2.5-0.5-3.7,0.1l-9,5c-2.9,1.6-6.3-0.8-5.8-4l1.5-10.2c0.2-1.3-0.3-2.6-1.2-3.5l-7.5-7
                        			c-2.4-2.2-1.2-6.2,2-6.8l10.1-1.7c1.3-0.2,2.4-1,2.9-2.2l4.3-9.3c1.4-3,5.5-3.1,7.1-0.2l4.8,9.1c0.6,1.1,1.7,1.9,3,2.1l10.2,1.2
                        			c3.2,0.4,4.6,4.3,2.3,6.7l-7.2,7.4c-0.9,0.9-1.3,2.2-1.1,3.5l2,10.1C113.6,231.6,110.3,234.1,107.4,232.7z"/>
                        	</g>
                        	<g>
                        		<m.path fill={themeState.theme === "light" ?  '#bae6fd' :  '#172554'} variants={pathVariants} custom={3} d="M71.6,148.9l-7.6-3.8c-1-0.5-2.1-0.4-3,0.1l-7.4,4.1c-2.3,1.3-5.2-0.6-4.8-3.3l1.2-8.4c0.2-1.1-0.2-2.1-1-2.8l-6.2-5.8
                        			c-2-1.8-1-5.1,1.7-5.6l8.3-1.4c1.1-0.2,1.9-0.9,2.4-1.8l3.6-7.7c1.1-2.4,4.6-2.5,5.8-0.1l3.9,7.5c0.5,0.9,1.4,1.6,2.5,1.7l8.4,1
                        			c2.7,0.3,3.8,3.6,1.9,5.5l-5.9,6c-0.7,0.8-1.1,1.8-0.9,2.9l1.6,8.3C76.8,148,74,150.1,71.6,148.9z"/>
                        	</g>
                        	<g>
                        		<m.path fill={themeState.theme === "light" ?  '#bae6fd' :  '#172554'} variants={pathVariants} custom={2} d="M102.9,65.3l-5.9-2.9c-0.7-0.4-1.6-0.4-2.4,0.1l-5.8,3.2c-1.8,1-4-0.5-3.7-2.6l1-6.6c0.1-0.8-0.2-1.7-0.8-2.2l-4.9-4.5
                        			c-1.5-1.4-0.8-4,1.3-4.4l6.5-1.1c0.8-0.1,1.5-0.7,1.9-1.4l2.8-6c0.9-1.9,3.6-2,4.5-0.1l3.1,5.9c0.4,0.7,1.1,1.2,1.9,1.3l6.6,0.8
                        			c2.1,0.3,3,2.8,1.5,4.3l-4.6,4.7c-0.6,0.6-0.8,1.4-0.7,2.3l1.3,6.5C106.9,64.6,104.8,66.3,102.9,65.3z"/>
                        	</g>
                        	<g>
                        		<m.path fill={themeState.theme === "light" ?  '#bae6fd' :  '#172554'} variants={pathVariants} custom={1} d="M181.6,29l-4.3-2.1c-0.5-0.3-1.2-0.3-1.7,0l-4.2,2.3c-1.3,0.7-2.9-0.4-2.7-1.9l0.7-4.7c0.1-0.6-0.1-1.2-0.6-1.6l-3.5-3.3
                        			c-1.1-1-0.6-2.9,0.9-3.2l4.7-0.8c0.6-0.1,1.1-0.5,1.4-1l2-4.3C175,7,177,7,177.7,8.3l2.2,4.2c0.3,0.5,0.8,0.9,1.4,1l4.8,0.6
                        			c1.5,0.2,2.2,2,1.1,3.1l-3.4,3.4c-0.4,0.4-0.6,1-0.5,1.6l0.9,4.7C184.5,28.5,183,29.7,181.6,29z"/>
                        	</g>
                        </g>
                    </m.svg>
                </LazyMotion>
            </div>
    )
}
