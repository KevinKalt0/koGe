import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { HomePage } from '../pages/HomePage';
import { UndercoverGame } from '../pages/UndercoverGame';
import { QuizGame } from '../pages/QuizGame';
import { BlindTestGame } from '../pages/BlindTestGame';
import { Layout } from '../components/Layout';

export const AppRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="undercover" element={<UndercoverGame />} />
          <Route path="quiz" element={<QuizGame />} />
          <Route path="blind-test" element={<BlindTestGame />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};