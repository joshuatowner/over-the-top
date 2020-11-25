const canvas = document.createElement("canvas");

export function getTextWidth(text: string, size: string, font: string): number {
  const context = canvas.getContext("2d");
  if (context) {
    context.font = `${size} ${font}`;
    const metrics = context.measureText(text);
    return metrics.width;
  } else {
    throw new Error("Cannot find 2D context!");
  }
}

