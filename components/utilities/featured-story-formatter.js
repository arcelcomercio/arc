import StoryData from './story-data'

class FeaturedStoryFormatter {
  constructor({
    deployment,
    contextPath = '',
    arcSite = ''
  }) {
    this.contextPath = contextPath
    this.arcSite = arcSite
    this.schema = `{ 
      headlines { basic }
      credits {
        by { name url type }
      }
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
          website_url
        }
      }
      website_url
    }`
    this.initialState = {
      category: {
        name: '',
        url: '',
      },
      title: {
        name: '',
        url: '',
      },
      author: {
        name: '',
        url: '',
      },
      image: '',
      multimediaType: 'basic',
    }
    this.storyDataInstace = new StoryData({
      deployment,
      contextPath: this.contextPath,
      arcSite: this.arcSite,
      defaultImgSize: 'sm'
    })
  }

  /*   getImgUrl(size = '', imageSize = '', customImage = '') {
      const imageUrl = customImage || this.storyDataInstace.multimedia
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
    } */

  formatStory(story = '', imgField = '') {
    this.storyDataInstace.__data = story

    const newState = {
      ...this.initialState,
    }

    newState.category.name = this.storyDataInstace.section
    newState.category.url = `${this.contextPath}${
      this.storyDataInstace.sectionLink
    }`

    newState.title.name = this.storyDataInstace.title
    newState.title.url = `${this.contextPath}${this.storyDataInstace.link}`

    newState.author.name = this.storyDataInstace.author
    newState.author.url = `${this.contextPath}${
      this.storyDataInstace.authorLink
    }`

    newState.image = imgField || this.storyDataInstace.multimedia
    newState.multimediaType = this.storyDataInstace.multimediaType

    return newState
  }
}

export default FeaturedStoryFormatter