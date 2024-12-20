import React from 'react';
import { Player } from '../types/game';

interface PlayerListProps {
  players: Player[];
  onPlayerClick?: (player: Player) => void;
}

export const PlayerList: React.FC<PlayerListProps> = ({ players, onPlayerClick }) => {
  return (
    <div className="space-y-2">
      {players.map(player => (
        <div
          key={player.id}
          className={`p-3 rounded-lg ${
            player.isEliminated ? 'bg-gray-200 text-gray-500' : 'bg-white shadow-sm'
          }`}
          onClick={() => onPlayerClick?.(player)}
        >
          {player.name}
        </div>
      ))}
    </div>
  );
};