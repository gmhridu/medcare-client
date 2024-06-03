import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const TextAnimation = () => {
  const [currentWord, setCurrentWord] = useState(0);
  const words = [
    { text: "learn.", color: "red", size: "text-8xl" },
    { text: "act.", color: "blue", size: "text-8xl" },
    { text: "engage.", color: "green", size: "text-8xl" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prevWord) => (prevWord + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const variants = {
    initial: (direction) => ({
      opacity: 0,
      x: direction === "left" ? -100 : 0,
      y: direction === "top" ? -100 : direction === "bottom" ? 100 : 0,
    }),
    animate: { opacity: 1, x: 0, y: 0 },
    exit: (direction) => ({
      opacity: 0,
      x: direction === "left" ? 100 : 0,
      y: direction === "top" ? 100 : direction === "bottom" ? -100 : 0,
    }),
  };

  const getDirection = (word) => {
    switch (word.text) {
      case "learn.":
        return "left";
      case "act.":
        return "top";
      case "engage.":
        return "bottom";
      default:
        return "left";
    }
  };

  return (
    <div className="flex justify-center items-center h-24">
      <AnimatePresence mode="wait">
        <motion.h1
          key={words[currentWord].text}
          className={`${words[currentWord].size} font-black`}
          style={{ color: words[currentWord].color }}
          custom={getDirection(words[currentWord])}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{
            duration: 1,
          }}
        >
          {words[currentWord].text}
        </motion.h1>
      </AnimatePresence>
    </div>
  );
};

export default TextAnimation;
