import React from 'react';
import { Button } from '../Button';
import { useGameStore } from '../../store/gameStore';

export const PlayingPhase: React.FC = () => {
  const { players, currentPlayerIndex, currentRound, nextTurn } = useGameStore();
  const currentPlayer = players[currentPlayerIndex];

  return (
    <div className="space-y-6 text-center">
      <h2 className="text-xl font-bold">Tour {currentRound}</h2>
      <div className="p-6 bg-white rounded-lg shadow-sm space-y-4">
        <p className="text-lg">Tour de {currentPlayer.name}</p>
        <p className="text-2xl font-bold">{currentPlayer.word}</p>
        <Button onClick={nextTurn}>Terminer mon tour</Button>
      </div>
    </div>
  );
};