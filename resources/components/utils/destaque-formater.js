import DataStory from './data-story'

class DestaqueFormater {
  constructor(arcSite) {
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
      category: {},
      title: {},
      author: {},
      image: '',
      multimediaType: 'basic',
    }
  }

  formatStory(story, size, imageSize) {
    const element = new DataStory(story, this.arcSite)
    this.initialState = {
      category: {
        name: element.section,
        url: element.sectionLink,
      },
      title: {
        name: element.title,
        url: element.link,
      },
      author: {
        name: element.author,
        url: element.authorLink,
      },
      image: '',
      multimediaType: element.multimediaType,
    }
    this.initialState.image = element.getResizedImage('3:4', '288x157')
    if (size === 'twoCol') {
      this.initialState.image = element.getResizedImage('3:4', '676x374')
    } else if (imageSize === 'complete') {
      this.initialState.image = element.getResizedImage('9:16', '328x374')
    }

    return this.initialState
  }
}

export default DestaqueFormater
