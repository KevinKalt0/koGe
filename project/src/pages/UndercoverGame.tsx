import React from 'react';
import { useGameStore } from '../store/gameStore';
import { SetupPhase } from '../components/GamePhases/SetupPhase';
import { PlayingPhase } from '../components/GamePhases/PlayingPhase';
import { VotingPhase } from '../components/GamePhases/VotingPhase';
import { EndedPhase } from '../components/GamePhases/EndedPhase';

export const UndercoverGame: React.FC = () => {
  const gamePhase = useGameStore(state => state.gamePhase);

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Undercover</h1>
      
      {gamePhase === 'setup' && <SetupPhase />}
      {gamePhase === 'playing' && <PlayingPhase />}
      {gamePhase === 'voting' && <VotingPhase />}
      {gamePhase === 'ended' && <EndedPhase />}
    </div>
  );
};