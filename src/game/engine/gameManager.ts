import { useGameStore } from '../state';
import { FinanceManager } from './financeManager';

const GameState = useGameStore.getState();

export class GameManager {
  public financeManager :FinanceManager;

  constructor() {
    this.financeManager = new FinanceManager(GameState.finance);
  }

  nextTurn() {
    GameState.age++;

    this.financeManager.nextTurn();
    
  }
};
