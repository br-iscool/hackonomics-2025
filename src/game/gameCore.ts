import { GameState } from './types';
import { loadGameState, saveGameState } from './loadState';

var gameState;

export function initializeGame(): GameState {
  gameState = loadGameState();
  return gameState
}

export function nextTurn(state: GameState): GameState {
  const updated = playTurn(state);
  saveGameState(updated);
  return updated;
}

export function playTurn(state: GameState): GameState {
    // Placeholder for game logic
    state.age += 1;
    state.cash += Math.floor(Math.random() * 100); // Random cash increase
    state.assets.push(`Asset ${state.age}`); // Add a new asset
    state.expenses.push(`Expense ${state.age}`); // Add a new expense
    state.products.push(`Product ${state.age}`); // Add a new product
    state.decisions.push(`Decision ${state.age}`); // Add a new decision
    
    return state;
}