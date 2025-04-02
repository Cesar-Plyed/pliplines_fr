import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { useAnimation, motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function Slide2({ children, delay = 0, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { ref: inViewRef, inView } = useInView({ triggerOnce: true });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  return (
    <motion.div
      ref={(node) => {
        ref.current = node;
        inViewRef(node);
      }}
      variants={{
        hidden: { opacity: 0, translateX: 90 },
        visible: { opacity: 1, translateX: 0 },
      }}
      transition={{
        type: "spring",
        duration: 0.2,
        damping: 8,
        delay: delay,
        stiffness: 100,
      }}
      initial="hidden"
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Slide({ children, delay = 0, className = "" }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { ref: inViewRef, inView } = useInView({ triggerOnce: true });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  return (
    <motion.div
      ref={(node) => {
        ref.current = node;
        inViewRef(node);
      }}
      variants={{
        hidden: { opacity: 0, translateX: 90 },
        visible: { opacity: 1, translateX: 0 },
      }}
      transition={{
        type: "spring",
        duration: 0.2,
        damping: 8,
        delay: delay,
        stiffness: 100,
      }}
      initial="hidden"
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  );
}
