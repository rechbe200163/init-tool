const { nanoid } = require('fix-esm').require('nanoid');

export function generateRandomInitEmployeePassword(): string {
  const firstPart = nanoid(6);
  const secondPart = nanoid(6);
  const thirdPart = nanoid(6);
  return `${firstPart}-${secondPart}-${thirdPart}`;
}
