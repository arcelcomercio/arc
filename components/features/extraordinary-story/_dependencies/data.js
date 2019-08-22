import StoryData from '../../../utilities/story-data'
import ConfigParams from '../../../utilities/config-params'

class Data extends StoryData {
  static GOLDFISH = 'goldfish'

  static YOUTUBE = 'youtube'

  static IMAGE = 'image'

  static AUTOMATIC = 'default'

  static GOLDFISH_ENV = 'sandbox'

  constructor({
    data,
    deployment,
    contextPath,
    arcSite,
    defaultImgSize,
    customFields,
  }) {
    super({
      data,
      deployment,
      contextPath,
      arcSite,
      defaultImgSize,
    })
    this.arcSite = arcSite
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

  get primarySection() {
    return this.customFields.section || super.primarySection
  }

  get multimedia() {
    return this.customFields.image || super.multimedia
  }

  get multimediaService() {
    return this.customFields.multimediaService || 'default'
  }

  get multimediaSource() {
    return this.customFields.multimediaSource || ''
  }

  get link() {
    const {
      websites = {}
    } = this._data || {}
    const {
      website_url: url = ''
    } = websites[`${this.arcSite}`] || {}
    return url
  }

  get primarySectionLink() {
    const { contentConfigValues: { section = '' } = {} } = this.customFields.urlStory || {}
    return super.primarySectionLink || section
  }

  /* get isVideo() {
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
  } */

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
    )
  }

  static getSourceMultimedia(multimediaType, multimedia) {
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
      multimediaContent = multimedia || ''
    } else if (
      (multimediaType === ConfigParams.IMAGE ||
        multimediaType === Data.IMAGE) &&
      multimedia !== ''
    ) {
      multimediaContent = multimedia || ''
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
}

export default Data
