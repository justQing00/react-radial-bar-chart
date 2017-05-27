'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * HEX to RGB.
 * @param   color       HEX color
 * @return  object           RGB色值
 */
var hexToRgb = function hexToRgb(color) {
  var sColor = color.toLowerCase();
  if (sColor) {
    if (sColor.length === 4) {
      var sColorNew = '#';
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    var sColorChange = [];
    for (var _i = 1; _i < 7; _i += 2) {
      sColorChange.push(parseInt('0x' + sColor.slice(_i, _i + 2)));
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

var hslToRgb = function hslToRgb(color) {
  var _getHsl = getHsl(color),
      h = _getHsl.h,
      s = _getHsl.s,
      l = _getHsl.l,
      a = _getHsl.a;

  var r = null;
  var g = null;
  var b = null;
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    var hue2rgb = function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255), a: a };
};

// example: hsl(0, 100%, 50%)
var getHsl = function getHsl(color) {
  var begin = color.startsWith('hsla') ? 5 : 4;
  var length = color.length;
  var hslArray = color.slice(begin, length - 1).split(',');
  var h = hslArray[0];
  var s = percentToDecimal(hslArray[1]);
  var l = percentToDecimal(hslArray[2]);
  return { h: h, s: s, l: l, a: hslArray[3] || 1 };
};
// example: 10% to 0.1
var percentToDecimal = function percentToDecimal(percent) {
  var temp = percent.trim();
  return temp.slice(0, temp.length - 1);
};

/**
 * RGB to RGB.
 * @param   color       rgba
 * @return  object           RGB色值
 */
var rgbaToRgba = function rgbaToRgba(color) {
  var begin = color.startsWith('rgba') ? 5 : 4;
  var length = color.length;
  var rgbaArray = color.slice(begin, length - 1).split(',');
  var r = rgbaArray[0];
  var g = rgbaArray[1];
  var b = rgbaArray[2];
  return { r: r, g: g, b: b, a: rgbaArray[3] || 1 };
};

var randomColor = function randomColor(i) {
  return '#1EB6F8';
};

var reg = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
var getHoverRgbColor = exports.getHoverRgbColor = function getHoverRgbColor(color) {
  var rgba = null;
  if (!color) return randomColor();
  if (reg.test(color)) {
    rgba = hexToRgb(color);
  } else if (color.startsWith('hsl')) {
    rgba = hslToRgb(color);
  } else if (color.startsWith('rgb')) {
    rgba = rgbaToRgba(color);
  }
  return 'rgba(' + rgba.r + ', ' + rgba.g + ', ' + rgba.b + ', ' + 0.65 + ')';
};