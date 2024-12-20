import React from 'react';
import { Button } from '../Button';
import { useGameStore } from '../../store/gameStore';

export const EndedPhase: React.FC = () => {
  const { players, resetGame } = useGameStore();
  const winner = players.some(p => p.isUndercover && !p.isEliminated) 
    ? "L'Undercover a gagné !"
    : "Les citoyens ont gagné !";

  return (
    <div className="space-y-6 text-center">
      <h2 className="text-2xl font-bold">{winner}</h2>
      <Button onClick={resetGame} className="w-full">
        Nouvelle partie
      </Button>
    </div>
  );
};