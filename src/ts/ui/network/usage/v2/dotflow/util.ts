export function laneHeight(lane: number, numLanes: number, height: number) {
  return height * (lane + 1) / (numLanes + 1)
}