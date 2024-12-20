import React from 'react';
import { PlayerList } from '../PlayerList';
import { useGameStore } from '../../store/gameStore';

export const VotingPhase: React.FC = () => {
  const { players, eliminatePlayer } = useGameStore();
  const alivePlayers = players.filter(p => !p.isEliminated);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-center">Qui est l'Undercover ?</h2>
      <PlayerList 
        players={alivePlayers}
        onPlayerClick={(player) => eliminatePlayer(player.id)}
      />
    </div>
  );
};