import { GameState } from './types';
import { loadGameState, saveGameState } from './loadState';

gameState = {

}

export function initializeGame(): GameState {
  return loadGameState();
}

export function nextTurn(state: GameState): GameState {
  const updated = playTurn(state);
  saveGameState(updated);
  return updated;
}

export function playTurn(state: GameState): GameState {
  // Implement the logic to play a turn in the game
  // This is a placeholder implementation
  const newState = { ...state, turn: state.turn + 1 };
  return newState;
}