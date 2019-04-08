import DataStory from '../../../../resources/components/utils/data-story'
import ConfigParams from '../../../../resources/components/utils/config-params'

class Data extends DataStory {
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

  get embedMultimedia() {
    return (
      Data.multimediaCustomEmbed(
        this.multimediaService,
        this.multimediaSource,
        this.title
      ) ||
      Data.multimediaFromApi(
        this.multimediaType,
        this.multimedia,
        this.title,
        this.video
      )
    )
  }

  static multimediaCustomEmbed(
    multimediaService,
    multimediaSource,
    title = ''
  ) {
    const videoCustom = {
      default: '',
      goldfish: this.videoGolfish(multimediaSource),
      youtube: this.videoYoutube(multimediaSource),
      image: this.image(multimediaSource, title),
    }
    return videoCustom[multimediaService] || ''
  }

  static multimediaFromApi(multimediaType, multimedia, title, video) {
    const multimediaFromApi = {
      [ConfigParams.VIDEO]: video,
      [ConfigParams.GALLERY]: this.image(multimedia, title),
      [ConfigParams.IMAGE]: this.image(multimedia, title),
    }
    return (multimediaType !== '' && multimediaFromApi[multimediaType]) || ''
  }

  static videoGolfish(multimediaSource) {
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
    // const url = 'https://www.youtube.com/embed/7h2ryr_uUEs'
    const embedHtml = `<iframe 
        width=${width}
        height=${height} 
        src=${url}
        frameBorder="0" 
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen />`
    return embedHtml
  }

  static image(url, title) {
    return `<img src="${url}" alt="${title}" />`
  }
}

export default Data
