import getProperties from 'fusion:properties'

/**
 * @description
 * Regenera la URL de la imagen usano el thumborParam obtenido
 * desde el resizer.
 *
 * @param {string} thumborParam Param obtenido por el resizer
 * @param {string} originalUrl Url original de la imagen
 * @param {string} arcSite
 * @returns {string} Nueva url de la imagen redimensionada.
 */

export const regenerateImageUrl = (thumborParam, originalUrl, arcSite) => {
  if (!thumborParam || !originalUrl)
    throw new Error(
      'Es necesario que el regenerador de url reciba thumborParams y originalUrl'
    )
  if (
    originalUrl.includes(
      'https://cdna.' ||
        'https://cdnc.' ||
        '/resources/dist/' ||
        '/resources/assets/'
    )
  )
    return originalUrl
  const { resizerUrl } = getProperties(arcSite)
  const urlSuffix = originalUrl.replace(/http[s]?:\/\//, '')
  const regeneratedUrl = `${resizerUrl}${thumborParam}${urlSuffix}`
  return regeneratedUrl
}

export const regenerateResizedUrlsObject = (
  breakpoint,
  originalUrl,
  arcSite
) => {
  let output = {}
  if (typeof breakpoint === 'object')
    Object.keys(breakpoint).forEach(format => {
      output = {
        ...output,
        [`${format}`]: regenerateImageUrl(
          breakpoint[format],
          originalUrl,
          arcSite
        ),
      }
    })
  else if (typeof breakpoint === 'string')
    return {
      webp: breakpoint,
      jpeg: breakpoint,
    }
  return output
}
