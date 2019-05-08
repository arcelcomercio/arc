import StoryData from '../../../../../resources/components/utils/data-story'

class ArchiveStoryData extends StoryData {
  constructor(data, website) {
    super(data, website)
    this._data = data
    this._website = website
  }

  get authorLink() {
    const authorLink = super.authorLink
    return `${authorLink}?website=${this._website}`
  }
}
export default ArchiveStoryData
