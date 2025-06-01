export function pickWeighted<T extends { weight?: number }>(items: T[]): T | null {
  const total = items.reduce((acc, item) => acc + (item.weight || 0), 0);
  const roll = Math.random() * total;
  let acc = 0;
  for (const item of items) {
    acc += (item.weight || 0);
    if (roll < acc) return item;
  }
  return null;
}
