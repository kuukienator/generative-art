import { Palette } from '../types/index';
import { HSLAColor, HexColor } from './colors';

export const HRL_COLORS_PALETTES: Array<Palette> = [
  [
    new HSLAColor({ h: 198, s: 63, l: 38 }),
    new HSLAColor({ h: 170, s: 40, l: 60 }),
    new HSLAColor({ h: 139, s: 36, l: 78 }),
    new HSLAColor({ h: 71, s: 100, l: 87 }),
    new HSLAColor({ h: 344, s: 100, l: 54 }),
  ],
  [
    new HSLAColor({ h: 309, s: 51, l: 90 }),
    new HSLAColor({ h: 350, s: 21, l: 78 }),
    new HSLAColor({ h: 325, s: 26, l: 52 }),
    new HSLAColor({ h: 296, s: 39, l: 31 }),
    new HSLAColor({ h: 237, s: 63, l: 15 }),
  ],
  [
    new HSLAColor({ h: 352, s: 70, l: 70 }),
    new HSLAColor({ h: 13, s: 90, l: 58 }),
    new HSLAColor({ h: 248, s: 31, l: 23 }),
    new HSLAColor({ h: 173, s: 70, l: 35 }),
    new HSLAColor({ h: 71, s: 58, l: 64 }),
  ],
  [
    new HSLAColor({ h: 284, s: 79, l: 24 }),
    new HSLAColor({ h: 347, s: 83, l: 60 }),
    new HSLAColor({ h: 46, s: 100, l: 62 }),
    new HSLAColor({ h: 166, s: 60, l: 52 }),
    new HSLAColor({ h: 154, s: 85, l: 37 }),
  ],
  [
    new HSLAColor({ h: 198, s: 63, l: 38 }),
    new HSLAColor({ h: 170, s: 40, l: 60 }),
  ],
  [
    new HexColor('#003049'),
    new HexColor('#D62828'),
    new HexColor('#F77F00'),
    new HexColor('#FCBF49'),
  ],
  [new HexColor('#941B0C'), new HexColor('#BC3908'), new HexColor('#F6AA1C')],
];
