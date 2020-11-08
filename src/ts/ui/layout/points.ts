import {Size, Vec2} from "../../util/vec2";

const POINT_SPACING = 50;
const MIN_PADDING = 25;

export function numPointsX(
  windowSize: Size,
  spacing = POINT_SPACING,
  minPadding = MIN_PADDING
): number {
  return Math.floor((windowSize.width - minPadding * 2) / spacing) + 1;
}

export function numPointsY(
  windowSize: Size,
  spacing = POINT_SPACING,
  minPadding = MIN_PADDING
): number {
  return Math.floor((windowSize.height - minPadding * 2) / spacing) + 1;
}

export function pointToPixel(
  windowSize: Size,
  point: Vec2,
  spacing = POINT_SPACING,
  minPadding = MIN_PADDING
): Vec2 {
  const marginX = ((windowSize.width - minPadding * 2) % spacing) / 2;
  const marginY = ((windowSize.height - minPadding * 2) % spacing) / 2;
  return {
    x: minPadding + marginX + spacing * point.x,
    y: minPadding + marginY + spacing * point.y
  }
}