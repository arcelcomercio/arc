const VIDEO = 'basic_video'
const GALLERY = 'basic_gallery'
const HTML = 'basic_html'
const IMAGE = 'basic'
class Data {
  constructor(customFields, data, website) {
    this.customFields = customFields
    this.data = data
    this.website = website
  }

  get title() {
    return (
      this.customFields.title ||
      (this.data && this.data.headlines && this.data.headlines.basic) ||
      ''
    )
  }

  get subTitle() {
    return (
      this.customFields.subTitle ||
      (this.data && this.data.subheadlines && this.data.subheadlines.basic) ||
      ''
    )
  }

  get multimediaOrientation() {
    return this.customFields.multimediaOrientation || 'bottom'
  }

  get contentOrientation() {
    return this.customFields.contentOrientation || 'left'
  }

  get author() {
    return Data.getDataAuthor(this.data).name
  }

  get authorLink() {
    return Data.getDataAuthor(this.data).url
  }

  get multimedia() {
    return Data.getThumbnail(this.data, Data.getTypeMultimedia(this.data))
  }

  get section() {
    return (
      this.customFields.section ||
      Data.getDataSection(this.data, this.website).name
    )
  }

  get link() {
    return (
      `${this.data && this.data.website_url}?_website=${this.website}` || '#'
    )
  }

  get sectionLink() {
    return `${Data.getDataSection(this.data, this.website).path}?_website=${
      this.website
    }`
  }

  static getDataSection(data, website) {
    const sectionData =
      (data &&
        data.websites &&
        data.websites[website] &&
        data.websites[website].website_section) ||
      {}
    const section = sectionData.name || ''
    const path = sectionData.path || ''
    return { name: section, path }
  }

  static getDataAuthor(data) {
    const authorData = (data && data.credits && data.credits.by) || []
    let nameAuthor = ''
    let urlAuthor = ''
    for (let i = 0; i < authorData.length; i++) {
      const { type, name, url } = authorData[i]
      if (type === 'author') {
        nameAuthor = name
        urlAuthor = url
        break
      }
    }
    return { name: nameAuthor, url: urlAuthor }
  }

  static getTypeMultimedia(data) {
    let typeMultimedia = ''
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
}

export default Data
