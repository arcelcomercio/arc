import StoryData from '../../../../utilities/story-data'

class Data extends StoryData {
  static AUTHOR = 'author'

  constructor({
    data,
    deployment,
    contextPath,
    arcSite,
    defaultImgSize,
    customFields,
    index = 0,
    customImage = {},
    isAdmin,
  }) {
    super({
      data,
      deployment,
      contextPath,
      arcSite,
      defaultImgSize,
    })
    this._customFields = customFields
    this._index = index
    this._customImage = customImage
    this._isAdmin = isAdmin
  }

  get index() {
    return this._index
  }

  /**
   * @param {number} val
   */
  set __index(val) {
    this._index = val
  }

  get customImage() {
    return this._customImage
  }

  get triplet() {
    return this._triplet
  }

  set __customImage(val) {
    this._customImage = val
  }

  get showAuthorOrSection() {
    return this._customFields.showAuthorOrSection || Data.AUTHOR
  }

  get title() {
    const { webskedId = '' } = this._customFields || {}

    const customTitle = webskedId
      ? ''
      : this._customFields[`title${this.index}`]
    return customTitle || super.title
  }

  get authorOrSection() {
    const authorOrSection =
      this.showAuthorOrSection === Data.AUTHOR ? super.author : super.section
    return this._customFields[`authorOrSection${this.index}`] || authorOrSection
  }

  get authorOrSectionLink() {
    return this.showAuthorOrSection === Data.AUTHOR
      ? super.authorLink
      : super.sectionLink
  }

  get multimediaSquareS() {
    const { resized_urls: { square_s: squaress } = {} } = this.customImage
    const squareS = this._isAdmin ? squaress : this.customImage
    return (
      squareS ||
      this._customFields[`image${this.index}`] ||
      super.multimediaSquareS
    )
  }

  get multimediaPortraitXS() {
    const { resized_urls: { portrait_xs: portraitXs } = {} } = this.customImage
    return (
      portraitXs ||
      this._customFields[`image${this.index}`] ||
      super.multimediaPortraitXS
    )
  }

  get iconClass() {
    const baseTypeThumb = {
      [Data.VIDEO]: 'play',
      [Data.IMAGE]: '',
      [Data.GALLERY]: 'gallery',
    }
    return super.multimediaType !== ''
      ? baseTypeThumb[super.multimediaType]
      : ''
  }

  get attributesRaw() {
    const attributesObject = super.attributesRaw
    // eslint-disable-next-line no-restricted-syntax
    for (const attr of Object.getOwnPropertyNames(Data.prototype)) {
      if (attr !== 'attributesRaw') attributesObject[attr] = this[attr]
    }
    return attributesObject
  }
}

export default Data
