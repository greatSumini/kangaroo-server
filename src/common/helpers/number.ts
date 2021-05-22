export const getRandomIntBetween = (min: number, max: number): number => {
  const num = Math.random() * (max - min) + min;
  return Math.round(Math.max(min, Math.min(num, max)));
};
