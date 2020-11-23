// import { ResizeImageUrl } from '../../../../utilities/helpers'
import { getAssetsPath } from '../../../../utilities/assets'

class Data {
  constructor(customFields, arcSite, contextPath) {
    this._customFields = customFields
    this._arcSite = arcSite
    this._contextPath = contextPath
  }

  get image() {
    const imgDefault = `${getAssetsPath(
      this._arcSite,
      this._contextPath
    )}/resources/assets/newsletter/phone.png?d=1`
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

  get colorButton() {
    return this._customFields.colorButton || ''
  }
}

export default Data
