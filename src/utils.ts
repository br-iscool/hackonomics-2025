export function pickWeighted<T extends { weight: number | (() => number) }>(items: T[]): T | null {
  const weightedItems = items.map(item => ({
    item,
    weight: typeof item.weight === "function" ? item.weight() : item.weight
  }));

  const totalWeight = weightedItems.reduce((sum, { weight }) => sum + weight, 0);
  if (totalWeight === 0) return null;

  const rand = Math.random() * totalWeight;
  let cumulative = 0;

  for (const { item, weight } of weightedItems) {
    cumulative += weight;
    if (rand < cumulative) return item;
  }

  return null;
}

export function chooseRandom<T>(arr: T[]): T | undefined {
  if (arr.length === 0) return undefined;
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

export function randomInterval(min : number, max : number): number { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function randomDecimal(min : number, max : number): number {
  return Math.random() * (max - min) + min;
}

interface IQueue<T> {
  enqueue(item: T): void;
  dequeue(): T | undefined;
  size(): number;
}

export class Queue<T> implements IQueue<T> {
  private storage: T[] = [];

  constructor(private capacity: number = Infinity) {}

  enqueue(item: T): void {
    if (this.size() === this.capacity) {
      throw Error("Queue has reached max capacity, you cannot add more items");
    }
    this.storage.push(item);
  }
  dequeue(): T | undefined {
    return this.storage.shift();
  }
  size(): number {
    return this.storage.length;
  }
}
