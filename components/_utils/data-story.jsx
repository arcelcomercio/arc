class DataStory {
  static VIDEO = 'basic_video'
  
  static GALLERY = 'basic_gallery'

  static HTML = 'basic_html'

  static IMAGE = 'basic'

  constructor(data, website) {
    this._data = data
    this._website = website
    //
    // this.dataAuthor = DataStory.getDataAuthor(this._data)
  }

  get _data() {
    return this._data
  }
  
  set _data(val) {
    this._data = val
  }

  get _website() {
    return this._website
  }
  
  set _website(val) {
    this._website = val
  }

  get title() {
    return (this._data && this._data.headlines && this._data.headlines.basic) || ''
  }

  get subTitle() {
    return (
      (this._data && this._data.subheadlines && this._data.subheadlines.basic) ||
      ''
    )
  }

  get author() {
    return DataStory.getDataAuthor(this._data).name
  }

  get authorLink() {
    return DataStory.getDataAuthor(this._data).url
  }

  get multimedia() {
    return DataStory.getThumbnail(
      this._data,
      DataStory.getTypeMultimedia(this._data)
    )
  }

  get multimediaType() {
    return DataStory.getTypeMultimedia(this._data)
  }

  get section() {
    return DataStory.getDataSection(this._data, this._website).name
  }

  get sectionLink() {
    return `${
      DataStory.getDataSection(this._data, this._website).path
    }?_website=${this._website}`
  }

  get link() {
    return (
      `${this._data && this._data.website_url}?_website=${this._website}` || '#'
    )
  }

  get displayDate() {
    return this._data && this._data.display_date || ''
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
      thumb = DataStory.getThumbnailVideo(data)
    } else if (type === GALLERY) {
      thumb = DataStory.getThumbnailGallery(data)
    } else if (type === IMAGE) {
      thumb = DataStory.getImage(data)
    }
    return thumb
  }
}

export default DataStory
