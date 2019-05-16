import StoryData from '../../../utilities/story-data'
import ConfigParams from '../../../utilities/config-params'
import { ResizeImageUrl } from '../../../utilities/helpers'

class Data extends StoryData {
  static GOLDFISH = 'goldfish'

  static YOUTUBE = 'youtube'

  static IMAGE = 'image'

  static AUTOMATIC = 'default'

  static GOLDFISH_ENV = 'sandbox'

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

  set multimediaOrientation(label) {
    this.customFields.multimediaOrientation = label
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

  static videoGoldfish(multimediaSource, website = 'elcomercio') {
    return `<div
      id="powa-${multimediaSource}"
      data-env=${Data.GOLDFISH_ENV}
      data-api=${Data.GOLDFISH_ENV}
      data-org=${website}
      data-uuid="${multimediaSource}"
      data-aspect-ratio="0.562"
      className="powa">
    </div>`
  }

  static videoYoutube(codeId, width = '100%', height = '100%') {
    const embedHtml = `<iframe 
        width=${width}
        height=${height} 
        src=${`https://www.youtube.com/embed/${codeId}`}
        frameBorder="0" 
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen />`
    return embedHtml
  }

  static image(url, title, website, orientation) {
    const urlResize = this.resizeImg(url, website, orientation)
    return `<img src="${urlResize}" alt="${title}" />`
  }

  get typeMultimediaGeneral() {
    return Data.getTypeMultimediaGeneral(
      this.multimediaService,
      this.multimediaType
    )
  }

  get sourceMultimedia() {
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
    const multimediaTypeFeature = Data.getTypeMultimediaGeneral(
      multimediaService,
      multimediaType
    )
    let multimediaSourceFeature = multimediaSource
    if (Data.AUTOMATIC === multimediaService) {
      multimediaSourceFeature =
        multimediaType === ConfigParams.VIDEO ? videoId : multimedia
    }
    return Data.getSourceMultimedia(
      multimediaTypeFeature,
      multimediaSourceFeature,
      super.__website,
      multimediaOrientation
    )
  }

  static getSourceMultimedia(multimediaType, multimedia, website, orientation) {
    let multimediaContent = ''
    if (
      (multimediaType === ConfigParams.VIDEO ||
        multimediaType === Data.YOUTUBE ||
        multimediaType === Data.GOLDFISH) &&
      multimedia !== ''
    ) {
      multimediaContent = multimedia
    } else if (
      (multimediaType === ConfigParams.GALLERY ||
        multimediaType === Data.IMAGE) &&
      multimedia !== ''
    ) {
      multimediaContent = this.resizeImg(multimedia, website, orientation) || ''
    } else if (
      (multimediaType === ConfigParams.IMAGE ||
        multimediaType === Data.IMAGE) &&
      multimedia !== ''
    ) {
      multimediaContent = this.resizeImg(multimedia, website, orientation) || ''
    }
    return multimediaContent
  }

  static getTypeMultimediaGeneral(multimediaService, multimediaType) {
    let multimediaTypeFeature = multimediaService
    if (Data.AUTOMATIC === multimediaService) {
      multimediaTypeFeature = multimediaType
    }
    return multimediaTypeFeature
  }

  static resizeImg(url, website, orientation = 'original') {
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
      grid: {
        ratio: '9:16',
        size: '700x400',
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
