/**
 * @param {Object} obj
 * @param {string} obj.sizes
 * @param {number[]} [obj.sizesHeight]
 * @param {number} obj.width
 * @param {number} obj.height
 */
export function validateSizes({ sizes, sizesHeight, width, height }) {
  let validSizes = []
  if (typeof sizes === 'string') {
    const sizesList = sizes.split(',')
    const sizeRegexp = /(\(.+:\s?\d+px\))?\s?(\d+)(?:px|w)/
    validSizes = sizesList
      .map((size, i) => {
        const [, sizeMedia, sizeWidth] = size.match(sizeRegexp) || []
        const sizeWidthInt = parseInt(sizeWidth, 10)
        const sizeHeight = sizeWidthInt
          ? Math.floor((sizeWidthInt * height) / width)
          : 0
        return {
          media: sizeMedia,
          width: sizeWidthInt,
          height: (sizesHeight || [])[i] || sizeHeight,
        }
      })
      .filter(size => size.width && size.media)
  }
  return validSizes
}

export function buildPresets(sizes) {
  const presets = {}
  sizes.forEach(size => {
    const { width, height } = size
    presets[`${width}x${height}`] = { width, height }
  })
  return presets
}
