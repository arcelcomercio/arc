import DataStory from '../../../../resources/components/utils/data-story'
import { ResizeImageUrl } from '../../../../resources/utilsJs/helpers'

class DestaqueFormater {
  constructor(arcSite = '') {
    this.arcSite = arcSite
    this.schema = `{ 
      headlines { basic }
      credits {
        by { name url type }
      }
      website_url
      promo_items {
        basic { url type }
        basic_video {
          promo_items {
            basic { url type }
          }
        }
        basic_gallery {
          promo_items {
            basic { url type }
          }
        }
      }
      websites {
        ${this.arcSite} {
          website_section {
            name
            path
          }
        }
      }
    }`
    this.initialState = {
      category: { name: '', url: '' },
      title: { name: '', url: '' },
      author: { name: '', url: '' },
      image: '',
      multimediaType: 'basic',
    }
    this.dataStoryInstace = new DataStory({}, this.arcSite)
  }

  getImgUrl(size = '', imageSize = '', customImage = '') {
    const imageUrl = customImage || this.dataStoryInstace.multimedia
    let resizedImageUrl = ''

    resizedImageUrl = ResizeImageUrl(this.arcSite, imageUrl, '3:4', '288x157')
    if (size === 'twoCol') {
      resizedImageUrl = ResizeImageUrl(this.arcSite, imageUrl, '3:4', '676x374')
    } else if (imageSize === 'complete') {
      resizedImageUrl = ResizeImageUrl(
        this.arcSite,
        imageUrl,
        '9:16',
        '328x374'
      )
    }

    return resizedImageUrl
  }

  formatStory(story = '', size = '', imageSize = '', imgField = '') {
    this.dataStoryInstace.__data = story

    const newState = { ...this.initialState }

    newState.category.name = this.dataStoryInstace.section
    newState.category.url = this.dataStoryInstace.section

    newState.title.name = this.dataStoryInstace.title
    newState.title.url = this.dataStoryInstace.link

    newState.author.name = this.dataStoryInstace.author
    newState.author.url = this.dataStoryInstace.authorLink

    newState.image = this.getImgUrl(size, imageSize, imgField)
    newState.multimediaType = this.dataStoryInstace.multimediaType

    return newState
  }
}

export default DestaqueFormater
