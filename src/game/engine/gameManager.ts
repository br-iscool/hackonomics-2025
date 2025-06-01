import { useGameStore } from '../state';

export const GameManager = {
  nextTurn() {
    const GameState = useGameStore.getState();
    const { stats, finance, life } = GameState;

    GameState.age += 1;
    
  },
};
