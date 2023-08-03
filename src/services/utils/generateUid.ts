export const generateUid = (min: number, max: number) => {
  return JSON.stringify(Math.round(Math.random() * (max - min) + min));
};
