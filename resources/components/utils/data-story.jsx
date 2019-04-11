import { addResizedUrlItem } from '../../utilsJs/thumbs'
import ConfigParams from './config-params'

class DataStory {
  static VIDEO = ConfigParams.VIDEO

  static GALLERY = ConfigParams.GALLERY

  static HTML = ConfigParams.HTML

  static IMAGE = ConfigParams.IMAGE

  constructor(data = {}, website = '') {
    this._data = data
    this._website = website
  }

  get __data() {
    return this._data
  }

  set __data(val) {
    this._data = val
  }

  get __website() {
    return this._website
  }

  set __website(val) {
    this._website = val
  }

  get id() {
    return (this._data && this._data._id) || ''
  }

  get title() {
    return (
      (this._data && this._data.headlines && this._data.headlines.basic) || ''
    )
  }

  get tags() {
    return (this._data.taxonomy && this._data.taxonomy.tags) || []
  }

  get subTitle() {
    return (
      (this._data &&
        this._data.subheadlines &&
        this._data.subheadlines.basic) ||
      ''
    )
  }

  get author() {
    return DataStory.getDataAuthor(this._data).nameAuthor
  }

  get authorLink() {
    return DataStory.getDataAuthor(this._data).urlAuthor
  }

  get authorSlug() {
    return DataStory.getDataAuthor(this._data).slugAuthor
  }

  get authorImage() {
    return DataStory.getDataAuthor(this._data).imageAuthor
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
      `${(this._data && this._data.canonical_url) || ''}?_website=${
        this._website
      }` || '#'
    )
  }

  // TODO: Cambiar la fecha a lo que se estandarice
  get date() {
    return this.publishDate
  }

  get displayDate() {
    return (this._data && this._data.display_date) || ''
  }

  get publishDate() {
    return (this._data && this._data.publish_date) || ''
  }

  get firstPublishDate() {
    return (this._data && this._data.first_publish_date) || ''
  }

  static videoId() {
    return (
      (this._data &&
        this._data.promo_items &&
        this._data.promo_items[ConfigParams.VIDEO] &&
        this._data.promo_items[ConfigParams.VIDEO]._id) ||
      ''
    )
  }

  get video() {
    return (
      (this._data &&
        this._data.promo_items &&
        this._data.promo_items[ConfigParams.VIDEO] &&
        this._data.promo_items[ConfigParams.VIDEO].embed_html) ||
      ''
    )
  }

  // TODO: Improve raw attribute function (should only be getter's attribute)
  get attributesRaw() {
    let attributesObject = {}
    // eslint-disable-next-line no-restricted-syntax
    for (const attr of Object.getOwnPropertyNames(DataStory.prototype)) {
      if (attr !== 'attributesRaw') attributesObject[attr] = this[attr]
    }
    return attributesObject
  }

  // Ratio (ejemplo: "1:1"), Resolution (ejemplo: "400x400")
  getResizedImage(ratio, resolution) {
    if (this.multimedia) {
      return addResizedUrlItem(this.__website, this.multimedia, [
        `${ratio}|${resolution}`,
      ]).resized_urls[ratio]
    }
    return this.multimedia
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
    const imageAuthorDefault =
      'https://img.elcomercio.pe/files/listing_ec_opinion_destaques/uploads/2019/03/19/5c91731ccceee.png'
    let nameAuthor = ''
    let urlAuthor = ''
    let slugAuthor = ''
    let imageAuthor = ''
    for (let i = 0; i < authorData.length; i++) {
      const iterator = authorData[i]
      if (iterator.type === 'author') {
        nameAuthor = iterator.name && iterator.name !== '' ? iterator.name : ''
        urlAuthor = iterator.url && iterator.url !== '' ? iterator.url : ''
        slugAuthor = iterator.slug && iterator.slug !== '' ? iterator.slug : ''
        imageAuthor =
          iterator.image && iterator.image.url && iterator.image.url !== ''
            ? iterator.image.url
            : imageAuthorDefault
        break
      }
    }
    return {
      nameAuthor,
      urlAuthor,
      slugAuthor,
      imageAuthor,
    }
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
        data.promo_items[ConfigParams.VIDEO] &&
        data.promo_items[ConfigParams.VIDEO].promo_items &&
        data.promo_items[ConfigParams.VIDEO].promo_items[ConfigParams.IMAGE] &&
        data.promo_items[ConfigParams.VIDEO].promo_items[ConfigParams.IMAGE]
          .url) ||
      ''
    return thumb
  }

  static getThumbnailGallery(data) {
    const thumb =
      (data &&
        data.promo_items &&
        data.promo_items[ConfigParams.GALLERY] &&
        data.promo_items[ConfigParams.GALLERY].promo_items &&
        data.promo_items[ConfigParams.GALLERY].promo_items[
          ConfigParams.IMAGE
        ] &&
        data.promo_items[ConfigParams.GALLERY].promo_items[ConfigParams.IMAGE]
          .url) ||
      ''
    return thumb
  }

  static getImage(data) {
    const basicPromoItems =
      (data && data.promo_items && data.promo_items[ConfigParams.IMAGE]) || null
    const typePromoItems = (basicPromoItems && basicPromoItems.type) || null
    return typePromoItems && typePromoItems === 'image'
      ? basicPromoItems.url
      : ''
  }

  static getThumbnail(data, type) {
    let thumb = ''
    if (type === ConfigParams.VIDEO) {
      thumb = DataStory.getThumbnailVideo(data)
    } else if (type === ConfigParams.GALLERY) {
      thumb = DataStory.getThumbnailGallery(data)
    } else if (type === ConfigParams.IMAGE) {
      thumb = DataStory.getImage(data)
    }
    return thumb
  }
}

export default DataStory
