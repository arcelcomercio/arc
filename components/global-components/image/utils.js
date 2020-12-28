export function validateSizes({ sizes, width, height }) {
  let validSizes = []
  if (typeof sizes === 'string') {
    const sizesList = sizes.split(',')
    const sizeRegexp = /(\(.+:\s?\d+px\))?\s?(\d+)(?:px|w)/
    validSizes = sizesList
      .map(size => {
        // eslint-disable-next-line prefer-const
        let [, sizeMedia, sizeWidth] = size.match(sizeRegexp) || []
        sizeWidth = parseInt(sizeWidth, 10)
        const sizeHeight = sizeWidth
          ? Math.floor((sizeWidth * height) / width)
          : 0

        return {
          media: sizeMedia,
          width: sizeWidth,
          height: sizeHeight,
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
