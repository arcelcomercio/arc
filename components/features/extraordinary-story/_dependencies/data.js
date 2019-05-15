import StoryData from '../../../utilities/story-data'
import ConfigParams from '../../../utilities/config-params'
import { ResizeImageUrl } from '../../../utilities/helpers'

class Data extends StoryData {
  static GOLDFISH = 'goldfish'

  static YOUTUBE = 'youtube'

  static IMAGE = 'image'

  static AUTOMATIC = 'default'

  static MULTIMEDIA_TYPE = {
    [Data.GOLDFISH]: ConfigParams.VIDEO,
    [Data.YOUTUBE]: ConfigParams.VIDEO,
    [Data.IMAGE]: ConfigParams.IMAGE,
    [Data.AUTOMATIC]: null,
  }

  constructor(customFields, data, website) {
    super(data, website)
    this.customFields = customFields
  }

  get title() {
    return this.customFields.title || super.title
  }

  get subTitle() {
    return this.customFields.subTitle || super.subTitle
  }

  get multimediaOrientation() {
    return this.customFields.multimediaOrientation || 'bottom'
  }

  get contentOrientation() {
    return this.customFields.contentOrientation || 'left'
  }

  get section() {
    return this.customFields.section || super.section
  }

  get multimedia() {
    return this.customFields.image || super.multimedia
  }

  get multimediaService() {
    return this.customFields.multimediaService || 'automatic'
  }

  get multimediaSource() {
    return this.customFields.multimediaSource || ''
  }

  get isVideo() {
    let isVideoCustom = false
    let isVideoApi = false
    const { multimediaService } = this.customFields
    if (
      multimediaService === Data.YOUTUBE ||
      multimediaService === Data.GOLDFISH
    )
      isVideoCustom = true
    if (super.multimediaType === ConfigParams.VIDEO) isVideoApi = true
    return multimediaService !== Data.AUTOMATIC ? isVideoCustom : isVideoApi
  }

  get embedMultimedia() {
    return (
      Data.multimediaCustomEmbed(
        this.multimediaService,
        this.multimediaSource,
        this.title,
        super.__website,
        this.multimediaOrientation
      ) ||
      Data.multimediaFromApi(
        this.multimediaType,
        this.multimedia,
        this.title,
        this.video,
        super.__website,
        this.multimediaOrientation
      )
    )
  }

  static multimediaCustomEmbed(
    multimediaService,
    multimediaSource,
    website,
    orientation,
    title = ''
  ) {
    let multimedia = ''
    if (multimediaService === Data.GOLDFISH && multimediaSource !== '')
      multimedia = this.videoGoldfish(multimediaSource)
    else if (multimediaService === Data.YOUTUBE && multimediaSource !== '')
      multimedia = this.videoYoutube(multimediaSource)
    else if (multimediaService === Data.IMAGE && multimediaSource !== '')
      multimedia = this.image(multimediaSource, title, website, orientation)
    return multimedia || ''
  }

  static multimediaFromApi(
    multimediaType,
    multimedia,
    title,
    video,
    website,
    orientation
  ) {
    const multimediaFromApi = {
      [ConfigParams.VIDEO]: video,
      [ConfigParams.GALLERY]:
        (multimedia && this.image(multimedia, title, website, orientation)) ||
        '',
      [ConfigParams.IMAGE]:
        (multimedia && this.image(multimedia, title, website, orientation)) ||
        '',
    }
    return (multimediaType !== '' && multimediaFromApi[multimediaType]) || ''
  }

  static videoGoldfish(multimediaSource) {
    return `<div
      id="powa-${multimediaSource}"
      data-env="sandbox"
      data-api="sandbox"
      data-org="elcomercio"
      data-uuid="${multimediaSource}"
      data-aspect-ratio="0.562"
      className="powa">
    </div>`
  }

  static videoYoutube(url, width = '100%', height = '100%') {
    const embedHtml = `<iframe 
        width=${width}
        height=${height} 
        src=${url}
        frameBorder="0" 
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen />`
    return embedHtml
  }

  static image(url, title, website, orientation) {
    const resize = {
      top: {
        ratio: '9:16',
        size: '700x300',
      },
      bottom: {
        ratio: '9:16',
        size: '700x300',
      },
      left: {
        ratio: '4:3',
        size: '500x150',
      },
      right: {
        ratio: '4:3',
        size: '500x150',
      },
    }
    const urlResize = ResizeImageUrl(
      website,
      url,
      resize[orientation].ratio,
      resize[orientation].size
    )
    return `<img src="${urlResize}" alt="${title}" />`
  }

  get dataEmbedMultimedia() {
    const {
      // Custom config values
      multimediaService,
      multimediaSource,
      multimediaOrientation,
      // Story Data values
      multimediaType,
      videoId,
      multimedia,
    } = this
    let multimediaTypeFeature = Data.MULTIMEDIA_TYPE[multimediaService]
    let multimediaSourceFeature = multimediaSource
    if (Data.AUTOMATIC === multimediaService) {
      multimediaTypeFeature = multimediaType
      multimediaSourceFeature =
        multimediaType === ConfigParams.VIDEO ? videoId : multimedia
    }
    return Data.sourceMultimedia(
      multimediaTypeFeature,
      multimediaSourceFeature,
      super.__website,
      multimediaOrientation
    )
  }

  static sourceMultimedia(multimediaType, multimedia, website, orientation) {
    let multimediaContent = ''
    if (multimediaType === ConfigParams.VIDEO && multimedia !== '') {
      multimediaContent = multimedia
    } else if (multimediaType === ConfigParams.GALLERY && multimedia !== '') {
      multimediaContent = this.resizeImg(multimedia, website, orientation) || ''
    } else if (multimediaType === ConfigParams.IMAGE && multimedia !== '') {
      multimediaContent = this.resizeImg(multimedia, website, orientation) || ''
    }
    return multimediaContent
  }

  static resizeImg(url, website, orientation = 'top') {
    const resize = {
      top: {
        ratio: '9:16',
        size: '700x300',
      },
      bottom: {
        ratio: '9:16',
        size: '700x300',
      },
      left: {
        ratio: '4:3',
        size: '500x150',
      },
      right: {
        ratio: '4:3',
        size: '500x150',
      },
    }
    const urlResize = ResizeImageUrl(
      website,
      url,
      resize[orientation].ratio,
      resize[orientation].size
    )
    return urlResize
  }
}

export default Data
