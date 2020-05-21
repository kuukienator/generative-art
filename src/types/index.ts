import { Color } from '../lib/colors';

export interface ArtWork {
  run: Function;
  animate?: Function;
  name: string;
}

export interface Point {
  x: number;
  y: number;
}

export interface HSLA {
  h: number;
  s: number;
  l: number;
  a?: number;
}

export interface RGBA {
  r: number;
  g: number;
  b: number;
  a?: number;
}

export type HEX = string;

export type ColorType = HSLA | RGBA | HEX;

export type Palette = Array<Color>;

export interface ArtWorkOptions {
  colors: Array<Color>;
}
