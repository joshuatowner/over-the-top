
export function getStartAngle(index: number, total: number) {
  return (2 * Math.PI * index) / total
}

export function getEndAngle(index: number, total: number) {
  return getStartAngle(index + 1, total);
}
