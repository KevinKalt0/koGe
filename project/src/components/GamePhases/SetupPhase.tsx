import React, { useState } from 'react';
import { Button } from '../Button';
import { PlayerList } from '../PlayerList';
import { useGameStore } from '../../store/gameStore';

export const SetupPhase: React.FC = () => {
  const [playerName, setPlayerName] = useState('');
  const { players, addPlayer, startGame } = useGameStore();

  const handleAddPlayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim()) {
      addPlayer(playerName.trim());
      setPlayerName('');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Ajouter des joueurs (min 3)</h2>
      
      <form onSubmit={handleAddPlayer} className="flex gap-2">
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Nom du joueur"
          className="flex-1 p-2 rounded-lg border"
        />
        <Button type="submit">Ajouter</Button>
      </form>

      <PlayerList players={players} />

      <Button
        onClick={startGame}
        disabled={players.length < 3}
        className="w-full"
      >
        Commencer la partie
      </Button>
    </div>
  );
};