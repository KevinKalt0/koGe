import { create } from 'zustand';
import { Player, GamePhase, GameResult } from '../types/game';
import { wordPairs } from '../data/wordPairs';

interface GameState {
  players: Player[];
  currentRound: number;
  gamePhase: GamePhase;
  currentPlayerIndex: number;
  addPlayer: (name: string) => void;
  startGame: () => void;
  nextTurn: () => void;
  eliminatePlayer: (playerId: number) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  players: [],
  currentRound: 1,
  gamePhase: 'setup',
  currentPlayerIndex: -1,

  addPlayer: (name: string) => {
    if (get().gamePhase !== 'setup') return;
    
    set(state => ({
      players: [
        ...state.players,
        {
          id: state.players.length,
          name,
          word: '',
          isUndercover: false,
          isEliminated: false
        }
      ]
    }));
  },

  startGame: () => {
    const { players } = get();
    if (players.length < 3) return;

    const wordPair = wordPairs[Math.floor(Math.random() * wordPairs.length)];
    const undercoverIndex = Math.floor(Math.random() * players.length);

    const updatedPlayers = players.map((player, index) => ({
      ...player,
      word: index === undercoverIndex ? wordPair.undercover : wordPair.normal,
      isUndercover: index === undercoverIndex
    }));

    set({
      players: updatedPlayers,
      gamePhase: 'playing',
      currentPlayerIndex: 0
    });
  },

  nextTurn: () => {
    const { players, currentPlayerIndex } = get();
    let nextIndex = currentPlayerIndex;

    do {
      nextIndex = (nextIndex + 1) % players.length;
    } while (players[nextIndex].isEliminated);

    if (nextIndex === 0) {
      set({ gamePhase: 'voting' });
    } else {
      set({ currentPlayerIndex: nextIndex });
    }
  },

  eliminatePlayer: (playerId: number) => {
    const { players } = get();
    const updatedPlayers = players.map(player =>
      player.id === playerId ? { ...player, isEliminated: true } : player
    );

    const result = checkGameEnd(updatedPlayers);
    
    set(state => ({
      players: updatedPlayers,
      currentRound: state.currentRound + 1,
      gamePhase: result ? 'ended' : 'playing',
      currentPlayerIndex: result ? -1 : 0
    }));
  },

  resetGame: () => {
    set({
      players: [],
      currentRound: 1,
      gamePhase: 'setup',
      currentPlayerIndex: -1
    });
  }
}));

function checkGameEnd(players: Player[]): GameResult {
  const alivePlayers = players.filter(p => !p.isEliminated);
  const aliveUndercover = alivePlayers.filter(p => p.isUndercover).length;
  
  if (aliveUndercover === 0) return 'citizens';
  if (aliveUndercover === alivePlayers.length) return 'undercover';
  return null;
}