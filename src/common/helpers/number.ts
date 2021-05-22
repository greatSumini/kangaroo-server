export const getRandomNumBetween = (min: number, max: number): number => {
  const num = Math.random() * (max - min) + min;
  return Math.max(min, Math.min(num, max));
};
