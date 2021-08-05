import Color = require("color");

export interface GradientEntry {
  pct: number,
  color: {
    r: number,
    g: number,
    b: number,
  }
}

export const GREEN_RED_YELLOW_GRADIENT = [
  {pct: 0.0, color: {r: 0x00, g: 0xff, b: 46}},
  {pct: 0.5, color: {r: 0xff, g: 0xff, b: 0}},
  {pct: 1.0, color: {r: 0xff, g: 0x00, b: 0}}];

export const GREY_BLUE_GRADIENT = [
  {pct: 0.0, color: {r: 44, g: 101, b: 144}},
  {pct: 1.0, color: {r: 202, g: 225, b: 243}},
]

export const WHITE_RED_GRADIENT = [
  {pct: 0.0, color: {r: 255, g: 255, b: 255}},
  {pct: 1.0, color: {r: 255, g: 0, b: 0}},
]

export const GREY_WHITE_GRADIENT = [
  {pct: 0.0, color: {r: 60, g: 60, b: 60}},
  {pct: 1.0, color: {r: 255, g: 255, b: 255}},
]

export function darkerLighterGradient(color: Color, ratio = 0.4): GradientEntry[] {
  const lighter = color.lighten(ratio);
  const darker = color.darken(ratio);

  return [
    {pct: 0.0, color: {r: darker.red(), g: darker.green(), b: darker.blue()}},
    {pct: 0.5, color: {r: color.red(), g: color.green(), b: color.blue()}},
    {pct: 1.0, color: {r: lighter.red(), g: lighter.green(), b: lighter.blue()}},
  ]
}

export function getColorForPercentage(pct: number, gradient: GradientEntry[]): string {
  let i;
  for (i = 1; i < gradient.length - 1; i++) {
    if (pct < gradient[i].pct) {
      break;
    }
  }
  const lower = gradient[i - 1];
  const upper = gradient[i];
  const range = upper.pct - lower.pct;
  const rangePct = (pct - lower.pct) / range;
  const pctLower = 1 - rangePct;
  const pctUpper = rangePct;
  const color = {
    r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
    g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
    b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
  };
  return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
}
