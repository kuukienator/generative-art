export interface Circle {
  x: number;
  y: number;
  r: number;
}

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export const circleFilled = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number
) => {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fill();
  ctx.closePath();
};

export const circleStroked = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number
) => {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.stroke();
};
