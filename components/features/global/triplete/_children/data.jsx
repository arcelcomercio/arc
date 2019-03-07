const VIDEO = 'basic_video'
const GALLERY = 'basic_gallery'
const HTML = 'basic_html'
const IMAGE = 'basic'
const AUTHOR = 'author'
class Data {
  constructor(customFields, state, website) {
    this.customFields = customFields
    this.state = state
    this.website = website
  }

  get multimediaOrientation() {
    return this.customFields.multimediaOrientation || 'bottom'
  }

  get showAuthorOrSection() {
    return this.customFields.showAuthorOrSection || AUTHOR
  }

  getTitle(index) {
    const dataIndex = `data${index}`
    const titleIndex = `title${index}`
    return (
      this.customFields[titleIndex] ||
      (this.state[dataIndex] &&
        this.state[dataIndex].headlines &&
        this.state[dataIndex].headlines.basic) ||
      ''
    )
  }

  getLink(index) {
    const dataIndex = `data${index}`
    return (
      (this.state[dataIndex] &&
        `${this.state[dataIndex].website_url}?_website=${this.website}`) ||
      '#'
    )
  }

  static getThumbnailVideo(data) {
    const thumb =
      (data &&
        data.promo_items &&
        data.promo_items[VIDEO] &&
        data.promo_items[VIDEO].promo_items &&
        data.promo_items[VIDEO].promo_items[IMAGE] &&
        data.promo_items[VIDEO].promo_items[IMAGE].url) ||
      ''
    return thumb
  }

  static getThumbnailGallery(data) {
    const thumb =
      (data &&
        data.promo_items &&
        data.promo_items[GALLERY] &&
        data.promo_items[GALLERY].promo_items &&
        data.promo_items[GALLERY].promo_items[IMAGE] &&
        data.promo_items[GALLERY].promo_items[IMAGE].url) ||
      ''
    return thumb
  }

  static getImage(data) {
    const basicPromoItems =
      (data && data.promo_items && data.promo_items[IMAGE]) || null
    const typePromoItems = (basicPromoItems && basicPromoItems.type) || null
    return typePromoItems && typePromoItems === 'image'
      ? basicPromoItems.url
      : ''
  }

  static hasVideo(data) {
    const video = data && data.promo_items && data.promo_items[VIDEO]
    return typeof video === 'object' && video !== null
  }

  static getThumbnail(data, type) {
    let thumb = ''
    if (type === VIDEO) {
      thumb = Data.getThumbnailVideo(data)
    } else if (type === GALLERY) {
      thumb = Data.getThumbnailGallery(data)
    } else if (type === IMAGE) {
      thumb = Data.getImage(data)
    }
    return thumb
  }

  // TODO: Improve loop or use if/else if to get multimedia items
  getTypeMultimedia(index) {
    let typeMultimedia = ''
    const data = this.state[`data${index}`]
    const promoItems = (data && data.promo_items && data.promo_items) || {}
    const items = Object.keys(promoItems)
    let item = {}
    for (let i = 0; i <= items.length; i++) {
      item = promoItems[items[i]]
      if (typeof item === 'object' && item !== null) {
        typeMultimedia = items[i]
        break
      }
    }
    return typeMultimedia
  }

  getMultimedia(index) {
    const data = this.state[`data${index}`]
    return Data.getThumbnail(data, this.getTypeMultimedia(index))
  }

  getIconClass(index) {
    const baseTypeThumb = {
      basic_video: 'play',
      basic: '',
      gallery: 'gallery',
    }
    const typeThumb = this.getTypeMultimedia(index)
    return typeThumb !== '' ? baseTypeThumb[typeThumb] : ''
  }

  getAuthor(index) {
    const data = this.state[`data${index}`]
    return Data.getDataAuthor(data).name
  }

  getAuthorLink(index) {
    const data = this.state[`data${index}`]
    return Data.getDataAuthor(data).url
  }

  getSection(index) {
    const data = this.state[`data${index}`]
    return this.getDataSection(data).name
  }

  getSectionLink(index) {
    const data = this.state[`data${index}`]
    return this.getDataSection(data).path
  }

  authorOrSection(index) {
    return this.showAuthorOrSection === AUTHOR
      ? this.getAuthor(index)
      : this.getSection(index)
  }

  authorOrSectionLink(index) {
    return this.showAuthorOrSection === AUTHOR
      ? this.getAuthorLink(index)
      : this.getSectionLink(index)
  }

  static getDataAuthor(data) {
    const authorData = (data && data.credits && data.credits.by) || []
    let nameAuthor = ''
    let urlAuthor = ''
    for (let i = 0; i < authorData.length; i++) {
      const { type, name, url } = authorData[i]
      if (type === AUTHOR) {
        nameAuthor = name
        urlAuthor = url
        break
      }
    }
    return { name: nameAuthor, url: urlAuthor }
  }

  getDataSection(data) {
    const sectionData =
      (data &&
        data.websites &&
        data.websites[this.website] &&
        data.websites[this.website].website_section) ||
      {}
    const section = sectionData.name || ''
    const path = sectionData.path || ''
    return { name: section, path }
  }
}

export default Data
