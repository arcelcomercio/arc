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
    return (
      (this._data.site_topper && this._data.site_topper.site_logo_image) || ''
    )
  }

  get isInactive() {
    return this._data.inactive || false
  }
}

export default SectionData
