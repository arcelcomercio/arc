import DataStory from '../../../../resources/components/utils/data-story'

class Data extends DataStory {
  constructor(customFields, data, website) {
    super(data, website)
    this.customFields = customFields
  }

  get title() {
    return this.customFields.title || super.title
  }

  get subTitle() {
    return this.customFields.subTitle || super.subTitle
  }

  get multimediaOrientation() {
    return this.customFields.multimediaOrientation || 'bottom'
  }

  get contentOrientation() {
    return this.customFields.contentOrientation || 'left'
  }

  get section() {
    return this.customFields.section || super.section
  }
}

export default Data
