// import { ResizeImageUrl } from '../../../../../resources/utilsJs/helpers'
class Data {
  constructor(customFields, arcSite, pathSite) {
    this._customFields = customFields
    this._arcSite = arcSite
    this._pathSite = pathSite
  }

  get image() {
    const imgDefault = `${this._pathSite}/resources/dist/${
      this._arcSite
    }/images/newsletter.png`
    return this._customFields.image || imgDefault
  }

  get imageBanner() {
    return this._customFields.imageBanner || ''
  }

  get banner() {
    /* const urlResize =
      this.imageBanner !== ''
        ? ResizeImageUrl(this._arcSite, this.imageBanner, '9:16', '350x100')
        : ''
    return urlResize */
    return this.imageBanner
  }

  get hasBanner() {
    return (
      this._customFields.imageBanner !== undefined &&
      this._customFields.imageBanner !== ''
    )
  }

  get description() {
    return this._customFields.description || ''
  }

  get urlTos() {
    return this._customFields.urlTos || ''
  }

  get urlPrivacyPolicies() {
    return this._customFields.urlPrivacyPolicies || ''
  }
}

export default Data
