export const shuffleArray = <T = unknown>(arr: T[]): T[] =>
  arr.sort(() => Math.random() - 0.5);

export const getRandomEle = <T = unknown>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];
