import { useGameStore } from '../state';

export const GameManager = {
  ageUp() {
    const { stats, increaseStress } = useGameStore.getState();
    increaseStress(5);
    console.log(`Aging up! Current age: ${stats.age}`);
  },
};
