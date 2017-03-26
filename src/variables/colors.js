const rgb = (r, g, b) => `rgb(${r}, ${g}, ${b})`
const grayScale = (v) => rgb(v, v, v)

module.exports = {
  // ------------------------------------
  // Colors
  // ------------------------------------
  'color-ocean-green': rgb(66, 185, 131),     // #42b983

  // ------------------------------------
  // Grayscale
  // ------------------------------------
  'color-mine-shaft': grayScale(51),          // #333333
  'color-dove-gray': grayScale(102),          // #666666
  'color-dusty-gray': grayScale(153),         // #999999
  'color-silver': grayScale(204),             // #cccccc
  'color-alto': grayScale(220),               // #dcdcdc
  'color-gallery': grayScale(238),            // #eeeeee
  'color-concrete': grayScale(242),           // #f2f2f2
  'color-alabaster': grayScale(248),          // #f8f8f8
  'color-white': grayScale(255)               // #ffffff
}