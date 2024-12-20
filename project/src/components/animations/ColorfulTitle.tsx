import React from 'react';
import { motion } from 'framer-motion';

interface ColorfulTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const ColorfulTitle: React.FC<ColorfulTitleProps> = ({ children, className = '' }) => {
  return (
    <motion.h1
      className={`bg-gradient-to-r from-orange-500 via-violet-500 to-orange-500 bg-clip-text text-transparent ${className}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
    >
      {children}
    </motion.h1>
  );
};