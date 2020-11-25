export interface Vec2 {
  x: number,
  y: number
}

export interface Size {
  height: number,
  width: number
}

export interface AnnulusPosition {
  cx: number,
  cy: number,
  innerRadius: number,
  outerRadius: number
}

export interface AnnulusSegmentPosition extends AnnulusPosition {
  startAngle: number;
  endAngle: number;
}

export interface CirclePosition {
  cx: number,
  cy: number,
  r: number,
}

export interface PieSegmentPosition extends CirclePosition {
  startAngle: number;
  endAngle: number;
}
