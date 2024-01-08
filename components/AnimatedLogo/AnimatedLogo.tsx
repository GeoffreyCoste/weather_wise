'use client';

import {motion, Variants} from 'framer-motion'

export function AnimatedLogo() {
  const lineVariants: Variants = {
    hidden: {pathLength: 0, opacity: 0},
    visible: (i) => {
      const delay = 0.5 + i * 0.25;
      return {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: {delay, type: 'spring', duration: 1.5, bounce: 0},
          opacity: {delay, duration: 0.01}
        }
      };
    }
  };

  const bulbCircleVariant: Variants = {
    hidden: {pathLength: 0, opacity: 0, x: 180, y: 130},
    visible: () => {
      return {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: {type: 'spring', duration: 0.5, bounce: 0},
          opacity: {duration: 0.5}
        }
      };
    }
  };

  const circleVariant: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.5
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {duration: 0.5}
    }
  };

  return (
    <motion.svg
      className="w-1/4"
      width="600"
      height="600"
      viewBox="0 0 600 600"
      initial="hidden"
      animate="visible"
    >
      <motion.circle
        cx="300"
        cy="300"
        r="100"
        fill="#facc15"
        variants={circleVariant}
      />
      <motion.path
        className="scale-150"
        d="m204.4578225,230.8210653h.0000096c1.8969931,0,3.5855198,1.2023307,4.2060553,2.9949596l3.2758689,9.4634677c.5809499,1.6782724,2.9528467,1.6827747,3.5401637.0067198l3.330859-9.505434c.6212352-1.7728492,2.2947547-2.9597131,4.1732987-2.9597131h.0000095c3.0888299,0,5.2260243,3.0862336,4.1394795,5.9776503l-6.0101353,15.9936392c-.5250514,1.3972201-.5141108,2.9393755.0307115,4.3290056l.0000067.000017c2.0305549,5.1791572,9.3901912,5.091376,11.2966385-.1347394l8.360913-22.919646c.7438944-2.0392267,2.6830977-3.3960229,4.8537715-3.3960229h.0000112c3.6552137,0,6.1546172,3.6916966,4.7971089,7.0854789l-16.7869301,41.9674695c-1.0096351,2.5240965-3.4542847,4.1792069-6.1728185,4.1792069h-.0000089c-2.6781714,0-5.0948526-1.6069653-6.130806-4.0766622l-5.9264187-14.1284895c-.6438085-1.5348294-2.8195831-1.5317182-3.4589996.0049461l-5.8732714,14.114816c-1.0293227,2.473698-3.4456108,4.0853895-6.124918,4.0853895h-.0000089c-2.7156219,0-5.1570306-1.6550818-6.1625176-4.1776992l-16.7658773-42.0630918c-1.3355233-3.3506295,1.1326068-6.9913644,4.7395917-6.9913644h.0000111c2.1436064,0,4.0586287,1.3398776,4.7932471,3.353676l8.3763471,22.9619552c1.906452,5.2261285,9.2661069,5.31391,11.2966669.1347397l.0000067-.000017c.5448135-1.3896078.5557642-2.9317366.0307398-4.3289413l-5.9952843-15.9547628c-1.0935787-2.9102522,1.057543-6.0165536,4.1664789-6.0165536Z"
        fill="#1d4ed8"
        initial={{fillOpacity: 0}}
        animate={{
          fillOpacity: 1,
          transition: {
            ease: 'easeInOut',
            duration: 0.5
          }
        }}
      />
      <motion.path
        d="
          M200, 300
          a 110,110 0 1,0 -120,0
        "
        fill="transparent"
        stroke="#1d4ed8"
        strokeLinecap="round"
        strokeWidth={15}
        variants={bulbCircleVariant}
      />
      <motion.line
        x1="290"
        y1="460"
        x2="350"
        y2="460"
        stroke="#1d4ed8"
        strokeWidth={15}
        strokeLinecap="round"
        variants={lineVariants}
        custom={1}
      />
      <motion.line
        x1="335"
        y1="490"
        x2="305"
        y2="490"
        stroke="#1d4ed8"
        strokeWidth={15}
        strokeLinecap="round"
        variants={lineVariants}
        custom={1}
      />
      <motion.line
        x1={300 + 130 * Math.cos((170 / 180) * Math.PI)}
        y1={300 + 130 * Math.sin((170 / 180) * Math.PI)}
        x2={300 + 150 * Math.cos((170 / 180) * Math.PI)}
        y2={300 + 150 * Math.sin((170 / 180) * Math.PI)}
        stroke="#1d4ed8"
        strokeWidth={15}
        strokeLinecap="round"
        variants={lineVariants}
        custom={2}
      />
      <motion.line
        x1={300 + 130 * Math.cos((195 / 180) * Math.PI)}
        y1={300 + 130 * Math.sin((195 / 180) * Math.PI)}
        x2={300 + 150 * Math.cos((195 / 180) * Math.PI)}
        y2={300 + 150 * Math.sin((195 / 180) * Math.PI)}
        stroke="#1d4ed8"
        strokeWidth={15}
        strokeLinecap="round"
        variants={lineVariants}
        custom={1.5}
      />
      <motion.line
        x1={300 + 130 * Math.cos((220 / 180) * Math.PI)}
        y1={300 + 130 * Math.sin((220 / 180) * Math.PI)}
        x2={300 + 150 * Math.cos((220 / 180) * Math.PI)}
        y2={300 + 150 * Math.sin((220 / 180) * Math.PI)}
        stroke="#1d4ed8"
        strokeWidth={15}
        strokeLinecap="round"
        variants={lineVariants}
        custom={2}
      />
      <motion.line
        x1={300 + 130 * Math.cos((245 / 180) * Math.PI)}
        y1={300 + 130 * Math.sin((245 / 180) * Math.PI)}
        x2={300 + 150 * Math.cos((245 / 180) * Math.PI)}
        y2={300 + 150 * Math.sin((245 / 180) * Math.PI)}
        stroke="#1d4ed8"
        strokeWidth={15}
        strokeLinecap="round"
        variants={lineVariants}
        custom={2.5}
      />
      <motion.line
        x1={300 + 130 * Math.cos((270 / 180) * Math.PI)}
        y1={300 + 130 * Math.sin((270 / 180) * Math.PI)}
        x2={300 + 150 * Math.cos((270 / 180) * Math.PI)}
        y2={300 + 150 * Math.sin((270 / 180) * Math.PI)}
        stroke="#1d4ed8"
        strokeWidth={15}
        strokeLinecap="round"
        variants={lineVariants}
        custom={3}
      />
      <motion.line
        x1={300 + 130 * Math.cos((295 / 180) * Math.PI)}
        y1={300 + 130 * Math.sin((295 / 180) * Math.PI)}
        x2={300 + 150 * Math.cos((295 / 180) * Math.PI)}
        y2={300 + 150 * Math.sin((295 / 180) * Math.PI)}
        stroke="#1d4ed8"
        strokeWidth={15}
        strokeLinecap="round"
        variants={lineVariants}
        custom={3.5}
      />
    </motion.svg>
  );
}