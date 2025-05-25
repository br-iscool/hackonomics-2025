// literally using chatgpt here but i literally dont know how the game state looks like yet

import { GameState } from './types';
import { defaultGameState } from './defaultGameState';

const STORAGE_KEY = 'finance-life-game';

export function loadGameState(): GameState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultGameState;

    const parsed = JSON.parse(stored);

    return { ...defaultGameState, ...parsed }; // Fallback to default keys if needed
  } catch (e) {
    console.error('Error loading game state:', e);
    return defaultGameState;
  }
}

export function saveGameState(state: GameState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Error saving game state:', e);
  }
}

export function clearGameState() {
  localStorage.removeItem(STORAGE_KEY);
}
