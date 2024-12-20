import { Observable } from '@nativescript/core';

export interface Player {
  id: number;
  name: string;
  word: string;
  isUndercover: boolean;
  isEliminated: boolean;
}

export class GameModel extends Observable {
  private _players: Player[] = [];
  private _currentRound: number = 1;
  private _gameStarted: boolean = false;
  private _currentPlayerIndex: number = -1;

  private wordPairs = [
    { normal: 'chat', undercover: 'chien' },
    { normal: 'plage', undercover: 'piscine' },
    { normal: 'pizza', undercover: 'burger' },
    { normal: 'livre', undercover: 'journal' },
    { normal: 'pomme', undercover: 'poire' }
  ];

  constructor() {
    super();
  }

  get players(): Player[] {
    return this._players;
  }

  get currentRound(): number {
    return this._currentRound;
  }

  get gameStarted(): boolean {
    return this._gameStarted;
  }

  get currentPlayer(): Player | null {
    return this._currentPlayerIndex >= 0 ? this._players[this._currentPlayerIndex] : null;
  }

  addPlayer(name: string) {
    if (this._gameStarted) return;
    
    this._players.push({
      id: this._players.length,
      name,
      word: '',
      isUndercover: false,
      isEliminated: false
    });
    this.notifyPropertyChange('players', this._players);
  }

  startGame() {
    if (this._players.length < 3) return false;

    // Select random word pair
    const wordPair = this.wordPairs[Math.floor(Math.random() * this.wordPairs.length)];
    
    // Select random undercover
    const undercoverIndex = Math.floor(Math.random() * this._players.length);

    // Distribute words
    this._players.forEach((player, index) => {
      player.word = index === undercoverIndex ? wordPair.undercover : wordPair.normal;
      player.isUndercover = index === undercoverIndex;
    });

    this._gameStarted = true;
    this._currentPlayerIndex = 0;
    this.notifyPropertyChange('gameStarted', true);
    this.notifyPropertyChange('currentPlayer', this.currentPlayer);
    return true;
  }

  nextTurn() {
    do {
      this._currentPlayerIndex = (this._currentPlayerIndex + 1) % this._players.length;
    } while (this._players[this._currentPlayerIndex].isEliminated);

    this.notifyPropertyChange('currentPlayer', this.currentPlayer);
  }

  eliminatePlayer(playerId: number) {
    const player = this._players.find(p => p.id === playerId);
    if (player) {
      player.isEliminated = true;
      this._currentRound++;
      this.notifyPropertyChange('currentRound', this._currentRound);
      this.notifyPropertyChange('players', this._players);
      return this.checkGameEnd();
    }
    return null;
  }

  checkGameEnd(): 'undercover' | 'citizens' | null {
    const alivePlayers = this._players.filter(p => !p.isEliminated);
    const aliveUndercover = alivePlayers.filter(p => p.isUndercover).length;
    
    if (aliveUndercover === 0) return 'citizens';
    if (aliveUndercover === alivePlayers.length) return 'undercover';
    return null;
  }

  resetGame() {
    this._players = [];
    this._currentRound = 1;
    this._gameStarted = false;
    this._currentPlayerIndex = -1;
    this.notifyPropertyChange('players', this._players);
    this.notifyPropertyChange('gameStarted', false);
    this.notifyPropertyChange('currentRound', this._currentRound);
    this.notifyPropertyChange('currentPlayer', null);
  }
}