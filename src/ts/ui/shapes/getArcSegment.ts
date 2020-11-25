import Two = require("two.js");
import {Vec2} from "../../util/vec2";

interface OptionalParameters {
  fill?: string,
  linewidth?: number,
  stroke?: string,
  noStroke?: boolean,
  noFill?: boolean,
}

export default function getArcSegment(
  two: Two,
  innerRadius: number,
  outerRadius: number,
  center: Vec2,
  numSegments: number,
  segmentId: number,
  extras: OptionalParameters,
): Two.ArcSegment {
  const arcSize = ((2 * Math.PI) / numSegments);
  const startAngle = arcSize * segmentId;
  const endAngle = startAngle + arcSize;
  const segment = two.makeArcSegment(
    center.x,
    center.y,
    innerRadius,
    outerRadius,
    -startAngle,
    -endAngle,
    30
  );
  if (extras.fill) segment.fill = extras.fill;
  if (extras.linewidth) segment.linewidth = extras.linewidth;
  if (extras.stroke) segment.stroke = extras.stroke;
  if (extras.noFill) segment.noFill();
  if (extras.noStroke) segment.noStroke();
  return segment;
}
