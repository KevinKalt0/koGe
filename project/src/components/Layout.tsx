import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { GradientBackground } from './animations/GradientBackground';
import { ThemeToggle } from './ThemeToggle';

export const Layout: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen dark:bg-gray-900 transition-colors duration-200">
      <GradientBackground />
      
      <motion.header
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center gap-2">
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="w-8 h-8"
              >
                <img 
                  src="/koge-logo.svg" 
                  alt="KoGe Logo" 
                  className="w-full h-full object-contain"
                />
              </motion.div>
              <span className="font-bold text-lg bg-gradient-to-r from-orange-500 to-violet-500 bg-clip-text text-transparent">
                koGe
              </span>
            </Link>
            
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <AnimatePresence mode="wait">
                {!isHome && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <Link
                      to="/"
                      className="text-orange-500 dark:text-orange-400 hover:text-violet-500 dark:hover:text-violet-400 transition-colors font-medium"
                    >
                      Retour à l'accueil
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
};