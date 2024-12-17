// "use client";

import { motion } from "framer-motion";

export const Boxes = () => {
  const rows = 8;
  const cols = 12;

  const generateBoxes = () => {
    const boxes = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        boxes.push(
          <motion.div
            key={`${i}-${j}`}
            className="bg-slate-900/20 border border-slate-800/50 rounded-lg"
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              delay: (i + j) * 0.05,
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: 10,
            }}
          />
        );
      }
    }
    return boxes;
  };

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
      >
        <div
          className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%]"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
            gap: "1rem",
            transform: "rotate(-12deg)",
          }}
        >
          {generateBoxes()}
        </div>
      </motion.div>
    </div>
  );
};

