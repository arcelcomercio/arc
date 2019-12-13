import { addResizedUrls } from '@arc-core-components/content-source_content-api-v4'

// Formato de los presets: "mobile:314x157,tablet:314x157,desktop:314x157"
const getPresetsSize = (presets = '') => {
  const formatPresets = {}
  presets.split(',').forEach(preset => {
    const presetsKeysAndSize = preset.split(':') || []
    const presetsKey = presetsKeysAndSize[0] || ''
    const presetsSize = presetsKeysAndSize[1] || ''
    formatPresets[presetsKey] = {
      width: presetsSize.split('x')[0] || '',
      height: presetsSize.split('x')[1] || '',
    }
  })
  return formatPresets
}

export default ({
  contentElements = [],
  presets,
  resizerUrl,
  resizerSecret,
}) => {
  const presetsArray = getPresetsSize(presets)

  return contentElements.map(story => {
    const dataStory = story

    const { content_elements: auxContentElements } = dataStory || {}
    if (!auxContentElements) dataStory.content_elements = []

    const {
      promo_items: {
        basic_gallery: basicGallery = null,
        basic_video: basicVideo = null,
      } = {},
    } = story

    if (basicGallery && basicGallery.promo_items) {
      const image = addResizedUrls(basicGallery, {
        resizerUrl,
        resizerSecret,
        presets: presetsArray,
      })
      dataStory.promo_items.basic_gallery = image
    }

    if (basicVideo && basicVideo.promo_items) {
      basicVideo.content_elements = []
      const image = addResizedUrls(basicVideo, {
        resizerUrl,
        resizerSecret,
        presets: presetsArray,
      })
      dataStory.promo_items.basic_video = image
    }

    return addResizedUrls(dataStory, {
      resizerUrl,
      resizerSecret,
      presets: presetsArray,
    })
  })
}
