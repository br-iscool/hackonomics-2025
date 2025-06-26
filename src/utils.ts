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
  empty() : boolean {
    return this.storage.length > 0;
  }
}
