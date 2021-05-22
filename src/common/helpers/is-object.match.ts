export const isObjectMatch = (
  origin: Record<string, unknown>,
  target: Record<string, unknown>
): boolean => {
  if (!origin || !target) {
    return false;
  }

  const oKeys = Object.keys(origin);
  const tKeys = Object.keys(target);

  if (oKeys.length < tKeys.length) {
    return false;
  }

  return tKeys.every((key) => origin[key] === target[key]);
};
