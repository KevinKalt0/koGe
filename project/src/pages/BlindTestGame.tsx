import React from 'react';
import { motion } from 'framer-motion';
import { LockClosedIcon } from '@heroicons/react/24/outline';

export const BlindTestGame: React.FC = () => {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="mb-8"
      >
        <LockClosedIcon className="h-24 w-24 mx-auto text-orange-500" />
      </motion.div>
      
      <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-violet-500 bg-clip-text text-transparent">
        Blind Test Premium
      </h1>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl shadow-lg"
      >
        <p className="text-xl text-gray-700 dark:text-gray-300">
          Le Blind Test est une fonctionnalité premium. Abonnez-vous pour accéder à :
        </p>
        
        <ul className="text-left space-y-4 text-gray-600 dark:text-gray-400">
          <li className="flex items-center gap-2">
            <span className="text-orange-500">•</span>
            Plus de 1000 chansons
          </li>
          <li className="flex items-center gap-2">
            <span className="text-orange-500">•</span>
            Des playlists thématiques
          </li>
          <li className="flex items-center gap-2">
            <span className="text-orange-500">•</span>
            Mode multijoueur en ligne
          </li>
          <li className="flex items-center gap-2">
            <span className="text-orange-500">•</span>
            Classement mondial
          </li>
        </ul>

        <button className="mt-8 bg-gradient-to-r from-orange-500 to-violet-500 text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity">
          S'abonner maintenant
        </button>
      </motion.div>
    </div>
  );
};