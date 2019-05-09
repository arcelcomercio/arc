import StoryData from '../../../../../resources/components/utils/data-story'

class Data extends StoryData {
  static AUTHOR = 'author'

  constructor(data, website, customFields, index = 0) {
    super(data, website)
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

  get showAuthorOrSection() {
    return this._customFields.showAuthorOrSection || Data.AUTHOR
  }

  get title() {
    return this._customFields[`title${this.index}`] || super.title
  }

  get authorOrSection() {
    return this.showAuthorOrSection === Data.AUTHOR ?
      super.author :
      super.section
  }

  get authorOrSectionLink() {
    return this.showAuthorOrSection === Data.AUTHOR ?
      super.authorLink :
      super.sectionLink
  }

  get iconClass() {
    const baseTypeThumb = {
      [Data.VIDEO]: 'play',
      [Data.IMAGE]: '',
      [Data.GALLERY]: 'gallery',
    }
    return super.multimediaType !== '' ? baseTypeThumb[super.multimediaType] : ''
  }

  get attributesRaw() {
    const attributesObject = super.attributesRaw;
    // eslint-disable-next-line no-restricted-syntax
    for (const attr of Object.getOwnPropertyNames(Data.prototype)) {
      if (attr !== 'attributesRaw') attributesObject[attr] = this[attr]
    }
    return attributesObject
  }
}

export default Data