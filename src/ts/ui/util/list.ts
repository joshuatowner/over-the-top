export const toCSV = (list: Array<string>) => list.join(",");

export function shuffleArray(array: Array<unknown>) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
