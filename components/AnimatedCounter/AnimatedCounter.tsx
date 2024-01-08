import { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion"

type Props = {
    from: number;
    to: number;
    afterDecimal: number;
    classNames: string;
}

const AnimatedCounter = ({from, to, afterDecimal, classNames}: Props) => {

    const nodeRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const node = nodeRef.current;
        
        const controls = animate(from, to, {
          duration: 1,
          onUpdate(value) {
            if (node) {
              node.textContent = value.toFixed(afterDecimal);
            }
          }
        });
      
        return () => controls.stop();
    }, [from, to]);

    return <p ref={nodeRef} className={classNames} />;
}

export default AnimatedCounter;