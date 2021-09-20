import StoryData from '../../../../utilities/story-data'

class Data extends StoryData {
  static AUTHOR = 'author'

  constructor({
    data,
    deployment,
    contextPath,
    arcSite,
    customFields,
    index = 0,
  }) {
    super({
      data,
      deployment,
      contextPath,
      arcSite,
    })
    this._customFields = customFields
    this._index = index
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

  get triplet() {
    return this._triplet
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
}

export default Data
