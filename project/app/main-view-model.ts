import { Observable } from '@nativescript/core';
import { GameModel, Player } from './models/game';

export class MainViewModel extends Observable {
  private game: GameModel;
  private _newPlayerName: string = '';
  private _showingWord: boolean = false;
  private _votingPhase: boolean = false;
  private _gameEnded: boolean = false;
  private _winMessage: string = '';

  constructor() {
    super();
    this.game = new GameModel();
  }

  get newPlayerName(): string {
    return this._newPlayerName;
  }

  set newPlayerName(value: string) {
    if (this._newPlayerName !== value) {
      this._newPlayerName = value;
      this.notifyPropertyChange('newPlayerName', value);
    }
  }

  get players(): Player[] {
    return this.game.players;
  }

  get gameStarted(): boolean {
    return this.game.gameStarted;
  }

  get currentRound(): number {
    return this.game.currentRound;
  }

  get currentPlayer(): Player | null {
    return this.game.currentPlayer;
  }

  get showingWord(): boolean {
    return this._showingWord;
  }

  get votingPhase(): boolean {
    return this._votingPhase;
  }

  get gameEnded(): boolean {
    return this._gameEnded;
  }

  get winMessage(): string {
    return this._winMessage;
  }

  get alivePlayers(): Player[] {
    return this.game.players.filter(p => !p.isEliminated);
  }

  addPlayer() {
    if (this._newPlayerName.trim()) {
      this.game.addPlayer(this._newPlayerName.trim());
      this.newPlayerName = '';
      this.notifyPropertyChange('players', this.players);
    }
  }

  startGame() {
    if (this.game.startGame()) {
      this._showingWord = true;
      this.notifyPropertyChange('gameStarted', true);
      this.notifyPropertyChange('showingWord', true);
    }
  }

  endTurn() {
    this.game.nextTurn();
    if (this.game.currentPlayer) {
      this._showingWord = true;
      this._votingPhase = false;
    } else {
      this._showingWord = false;
      this._votingPhase = true;
    }
    this.notifyPropertyChange('showingWord', this._showingWord);
    this.notifyPropertyChange('votingPhase', this._votingPhase);
    this.notifyPropertyChange('currentPlayer', this.currentPlayer);
  }

  votePlayer(args: any) {
    const player = args.object.bindingContext as Player;
    const result = this.game.eliminatePlayer(player.id);
    
    if (result) {
      this._gameEnded = true;
      this._winMessage = result === 'citizens' ? 'Les citoyens ont gagné !' : 'L\'Undercover a gagné !';
      this.notifyPropertyChange('gameEnded', true);
      this.notifyPropertyChange('winMessage', this._winMessage);
    } else {
      this._votingPhase = false;
      this._showingWord = true;
      this.notifyPropertyChange('votingPhase', false);
      this.notifyPropertyChange('showingWord', true);
      this.notifyPropertyChange('currentRound', this.game.currentRound);
      this.notifyPropertyChange('players', this.players);
    }
  }

  resetGame() {
    this.game.resetGame();
    this._showingWord = false;
    this._votingPhase = false;
    this._gameEnded = false;
    this._winMessage = '';
    this.notifyPropertyChange('gameStarted', false);
    this.notifyPropertyChange('showingWord', false);
    this.notifyPropertyChange('votingPhase', false);
    this.notifyPropertyChange('gameEnded', false);
    this.notifyPropertyChange('players', this.players);
  }
}