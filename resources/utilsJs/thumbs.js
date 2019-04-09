/* eslint-disable no-lonely-if, import/prefer-default-export */
import getProperties from 'fusion:properties'
import Thumbor from 'thumbor'

/**
 * Helper function to merge a list of objects into a single object.
 * If there are duplicate keys, the last key will be used.
 */
const mergeObjects = arrayOfObjects => {
  return arrayOfObjects.reduce((accumulator, currentValue) => {
    return {
      ...accumulator,
      ...currentValue,
    }
  }, {})
}

/**
 * Helper funcs to crop around a focal point.
 * `getFocalPointAlignment` gets the crop values for one axis - horizontal or vertical.
 */
const getFocalPointAlignment = (focalPointAxis, oldLength, newLength) => {
  const halfLength = newLength / 2
  let low = Math.max(0, focalPointAxis - halfLength)
  let high = Math.min(oldLength, focalPointAxis + halfLength)
  // If the centered crop overflows the image bounds on the lower value,
  // compensate by pushing the higher value
  if (low === 0) {
    high = Math.min(oldLength, newLength)
  }
  // And vice versa
  if (high === oldLength) {
    low = Math.max(0, high - newLength)
  }
  return [low, high].map(Math.floor)
}
const cropHeight = (thumbor, focalPoint, height, newHeight, width) => {
  // focalPoint.min is the same as focalPoint.max
  const [top, bottom] = getFocalPointAlignment(
    focalPoint.min[1],
    height,
    newHeight
  )
  thumbor.crop(0, top, width, bottom)
}
const cropWidth = (thumbor, focalPoint, width, newWidth, height) => {
  const [left, right] = getFocalPointAlignment(
    focalPoint.min[0],
    width,
    newWidth
  )
  thumbor.crop(left, 0, right, height)
}

/**
 * Helper function to generate resized URLs for a given image.
 */
const getResizedUrls = (
  contentElement,
  resizerUrl,
  resizerSecretKey,
  aspectRatios
) => {
  const {
    additional_properties: { focal_point: focalPoint },
    height,
    url,
    width,
    type,
  } = contentElement
  if (type !== 'image') return null
  const schemeIndex = url.indexOf('://')
  const urlWithoutScheme = schemeIndex < 0 ? url : url.slice(schemeIndex + 3)
  return mergeObjects(
    aspectRatios.map(aspectPreset => {
      const aspectPresetArray = aspectPreset.split('|')
      aspectPreset = aspectPresetArray ? aspectPresetArray[0] : aspectPreset
      const thumbor = new Thumbor(resizerSecretKey, resizerUrl)
      thumbor.setImagePath(urlWithoutScheme)
      if (!focalPoint) {
        thumbor.smartCrop(true)
      }
      const [widthRatio, heightRatio] = aspectPreset
        .split(':')
        .map(ratioPart => {
          return parseInt(ratioPart, 10)
        })
      const aspectRatio = widthRatio / heightRatio
      const newHeight = width / aspectRatio
      const newWidth = aspectRatio * height

      const [newWidthPx, newHeightPx] = aspectPresetArray[1]
        ? aspectPresetArray[1].split('x')
        : [Math.floor(newWidth), Math.floor(newHeight)]

      if (aspectRatio > 1) {
        // Try to preserve width
        if (newHeight <= height) {
          if (focalPoint) {
            cropHeight(thumbor, focalPoint, height, newHeight, width)
          } else {
            thumbor.resize(newWidthPx, newHeightPx)
          }
        } else {
          if (focalPoint) {
            cropWidth(thumbor, focalPoint, width, newWidth, height)
          } else {
            thumbor.resize(newWidthPx, height)
          }
        }
      } else if (aspectRatio < 1) {
        // Try to preserve height
        if (newWidth <= width) {
          if (focalPoint) {
            cropWidth(thumbor, focalPoint, width, newWidth, height)
          } else {
            thumbor.resize(newWidthPx, newHeightPx)
          }
        } else {
          if (focalPoint) {
            cropHeight(thumbor, focalPoint, height, newHeight, width)
          } else {
            thumbor.resize(width, newHeightPx)
          }
        }
      } else {
        // For square images, preserve the smallest axis
        if (focalPoint) {
          if (width <= height) {
            cropHeight(thumbor, focalPoint, height, newHeight, width)
          } else {
            cropWidth(thumbor, focalPoint, width, newWidth, height)
          }
        } else {
          const minPx = Math.min(width, height)
          thumbor.resize(minPx, minPx)
        }
      }
      return {
        [aspectPreset]: thumbor.buildUrl(),
      }
    })
  )
}

const aspectPresets = [
  '16:9',
  '4:3',
  '3:2',
  '2:1',
  '1:1',
  '1:2',
  '2:3',
  '3:4',
  '9:16',
]
/**
 * Adds resized_urls key to every image in content_elements and all promo_items.
 * The key resized_urls is used by the image core component to display images according to the `aspectRatio` prop.
 * This function is called from the client repo's content API `transform` function.
 * @param {Object} data The data from the content source.
 * @param {string} resizerUrl The location of the hosted thumbor resizer.
 * @param {string} resizerSecretKey A secret key used to generate resizer URLs.
 * @param {string[]} [aspectRatios] A list of aspect ratios to prepare resized URLs for.
 *                                  Can pass a custom list of ratios in the form "width:height".
 *                                  If not provided, it will use `aspectPresets` above.
 */
export const addResizedUrls = (
  data,
  resizerUrl,
  resizerSecretKey,
  aspectRatios = aspectPresets,
  heightpx,
  widthpx
) => {
  const { content_elements: contentElements, promo_items: promoItems } = data
  return {
    ...data,
    content_elements: contentElements.map(contentElement => {
      if (contentElement.type !== 'image') {
        return contentElement
      }
      return {
        ...contentElement,
        resized_urls: getResizedUrls(
          contentElement,
          resizerUrl,
          resizerSecretKey,
          aspectRatios,
          heightpx,
          widthpx
        ),
      }
    }),
    promo_items: mergeObjects(
      Object.keys(promoItems).map(promoItemKey => {
        return {
          [promoItemKey]: {
            ...promoItems[promoItemKey],
            resized_urls: getResizedUrls(
              promoItems[promoItemKey],
              resizerUrl,
              resizerSecretKey,
              aspectRatios
            ),
          },
        }
      })
    ),
  }
}

export const addResizedUrlItem = (website, url, aspectRatios) => {
  const { resizerSecretKeyEnvVar, resizerUrl } = getProperties(website)
  const dataWithFocalPoint = {
    content_elements: [],
    promo_items: {
      basic: {
        type: 'image',
        url,
        width: 1200,
        height: 400,
        additional_properties: {},
      },
    },
  }
  const data = addResizedUrls(
    dataWithFocalPoint,
    resizerUrl,
    resizerSecretKeyEnvVar,
    aspectRatios
  )
  return data && data.promo_items.basic
}
