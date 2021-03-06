import {
  IMAGE_ORIGINAL,
  LANDSCAPE_XL,
  LANDSCAPE_S,
  LAZY_DEFAULT,
} from './constants/image-sizes'

class SectionData {
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

  get name() {
    return (this._data && this._data.name) || ''
  }

  get description() {
    return (this._data.site && this._data.site.site_description) || ''
  }

  get keywords() {
    return (this._data.site && this._data.site.site_keywords) || ''
  }

  get image() {
    return SectionData.getImageBySize(this.__data)
  }

  get imageLandscapeXL() {
    return SectionData.getImageBySize(this.__data, LANDSCAPE_XL)
  }

  get imageLandscapeS() {
    return SectionData.getImageBySize(this.__data, LANDSCAPE_S)
  }

  get imageLazyDefault() {
    return SectionData.getImageBySize(this.__data, LAZY_DEFAULT)
  }

  get isInactive() {
    return this._data.inactive || false
  }

  static getImageBySize(data, size = IMAGE_ORIGINAL) {
    const {
      site_logo_image: siteLogoImage = '',
      resized_urls: resizeUrls = {},
    } = (data && data.site_topper) || {}
    if (size === IMAGE_ORIGINAL) return siteLogoImage
    return resizeUrls[size] || ''
  }
}

export default SectionData
