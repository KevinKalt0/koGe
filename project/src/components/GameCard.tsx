import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface GameCardProps {
  title: string;
  description: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  color: 'orange' | 'violet';
  index: number;
}

export const GameCard: React.FC<GameCardProps> = ({
  title,
  description,
  path,
  icon: Icon,
  color,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
    >
      <Link to={path} className="block">
        <motion.div
          className={`p-6 rounded-xl shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm 
            border-2 border-transparent hover:border-${color}-500 
            hover:shadow-${color}-200/50 dark:hover:shadow-${color}-900/50 
            transition-all duration-200`}
          whileHover={{ scale: 1.02, y: -5 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            className={`inline-flex p-3 rounded-lg bg-gradient-to-br from-${color}-500 to-${color}-600 text-white`}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <Icon className="h-6 w-6" />
          </motion.div>
          <h3 className={`mt-4 text-xl font-semibold text-${color}-600 dark:text-${color}-400`}>
            {title}
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            {description}
          </p>
        </motion.div>
      </Link>
    </motion.div>
  );
};