/**
 * HEX to RGB.
 * @param   color       HEX color
 * @return  object           RGB色值
 */
const hexToRgb = (color) => {
  let sColor = color.toLowerCase();
  if (sColor) {
    if (sColor.length === 4) {
      let sColorNew = '#';
      for (let i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    const sColorChange = [];
    for (let i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt(`0x${sColor.slice(i, i + 2)}`));
    }
    return { r: sColorChange[0], g: sColorChange[1], b: sColorChange[2], a: 1 };
  }
  return null;
};

/**
 * HSL to RGB.
 * form http://en.wikipedia.org/wiki/HSL_color_space.
 *
 * @param   Number  h       色相
 * @param   Number  s       饱和度
 * @param   Number  l       亮度
 * @return  object           RGB色值数值
 */

const hslToRgb = (color) => {
  const { h, s, l } = getHsl(color);
  let r = null;
  let g = null;
  let b = null;
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < (1 / 6)) return p + ((q - p) * 6 * t);
      if (t < (1 / 2)) return q;
      if (t < (2 / 3)) return p + ((q - p) * ((2 / 3) - t) * 6);
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : (l + s) - (l * s);
    const p = (2 * l) - q;
    r = hue2rgb(p, q, h + (1 / 3));
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - (1 / 3));
  }
  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255), a: 1 };
};

// example: hsl(0, 100%, 50%)
const getHsl = (color) => {
  const length = color.length;
  const hslArray = color.slice(4, length - 1).split(',');
  const h = hslArray[0];
  const s = percentToDecimal(hslArray[1]);
  const l = percentToDecimal(hslArray[2]);
  return { h, s, l };
};
// example: 10% to 0.1
const percentToDecimal = (percent) => {
  const temp = percent.trim();
  return temp.slice(0, temp.length - 1);
};

/**
 * RGB to RGB.
 * @param   color       rgba
 * @return  object           RGB色值
 */
const rgbaToRgba = (color) => {
  return { r: 30, g: 182, b: 248, a: 1 };
};

const randomColor = (i) => {
  return '#1EB6F8';
};

const reg = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
export const getHoverRgbColor = (color) => {
  let rgba = null;
  if (!color) return randomColor();
  if (reg.test(color)) {
    rgba = hexToRgb(color);
  } else if (color.startsWith('hsl')) {
    rgba = hslToRgb(color);
  } else if (color.startsWith('rgba')) {
    rgba = hslToRgb(color);
  }
  return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${0.65})`;
};
