import { HSLA, ColorType, HEX, RGBA } from '../types/index';

const hslaString = (color: HSLA): string =>
  `hsla(${color.h}, ${color.s}%, ${color.l}%, ${color.a || 1})`;

const rgbaString = (color: RGBA): string =>
  `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a || 1})`;

export interface Color {
  color: ColorType;
  toString(): string;
}

export class HexColor implements Color {
  color: HEX;

  constructor(color: HEX) {
    this.color = color;
  }

  toString(): string {
    return this.color.toString();
  }
}

export class HSLAColor implements Color {
  color: HSLA;

  constructor(color: HSLA) {
    this.color = color;
  }

  toString(): string {
    return hslaString(this.color);
  }
}

export class RGBAColor implements Color {
  color: RGBA;

  constructor(color: RGBA) {
    this.color = color;
  }

  toString(): string {
    return rgbaString(this.color);
  }
}
