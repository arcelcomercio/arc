import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import {
  getTitle,
  getMultimediaType,
  multimediaNews,
  getVideo,
  getVideoYoutube,
  getImage,
} from '../../../utilities/get-story-values'
import {
  VIDEO,
  ELEMENT_YOUTUBE_ID,
  IMAGE,
  IMAGE_SMALL,
} from '../../../utilities/constants'
import customFields from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filters'
import StoryItem from './_children/story-video-item'

const classes = {
  listComponent: 'w-full flex flex-col',
  listHeader: 'flex flex-row',
}

const CONTENT_SOURCE = 'story-by-url'

@Consumer
class StoriesListVideo extends PureComponent {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props)
    this.getContentApi()
  }

  componentDidMount() {
    if (window.powaBoot) {
      window.powaBoot()
    }
    this.getListVideoNews()
  }

  getContentApi = () => {
    const {
      arcSite,
      customFields: {
        story01 = '',
        story02 = '',
        story03 = '',
        story04 = '',
        story05 = '',
      } = {},
    } = this.props
    const urlList = [story01, story02, story03, story04, story05]
    urlList.forEach((url, index) => {
      if (url !== '') {
        this.fetchContent({
          [`story0${index + 1}`]: {
            source: CONTENT_SOURCE,
            query: {
              website: arcSite,
              website_url: url,
            },
            filter: schemaFilter,
          },
        })
      }
    })
  }

  getListVideoNews = () => {
    const { story01, story02, story03, story04, story05 } = this.state
    const listStories = [story01, story02, story03, story04, story05]
    const listStoriesVideo = []
    listStories.forEach((data, index) => {
      const newsImage = getImage(data, IMAGE_SMALL)
      const newsVideoCenter = getVideo(data)
      const newsVideoYoutube = getVideoYoutube(data)

      let newsVideo = {}
      if (newsVideoCenter.type === VIDEO) {
        newsVideo = newsVideoCenter
      } else if (newsVideoYoutube.type === ELEMENT_YOUTUBE_ID) {
        newsVideo = newsVideoYoutube
      }
      debugger
      let item = {}
      if (data && (newsImage.type === IMAGE || newsVideo.type !== '')) {
        const title = getTitle(data)
        item = {
          index,
          content: {
            title,
            image: newsImage,
            video: newsVideo,
          },
        }
      } else {
        item = {
          index,
        }
      }

      listStoriesVideo.push(item)
    })

    this.setState({
      listStoriesVideo,
    })
  }

  StoryItemHandleClick = StoryItemIndex => {
    if (window.powaBoot) {
      window.powaBoot()
    }
    this.SortList(StoryItemIndex)
  }

  SortList = StoryItemIndex => {
    const firstItemIndex = 0
    const lastItemIndex = 4

    // si el primer elemento es seleccionado, no debe haber ninguna accion
    if (StoryItemIndex !== firstItemIndex) {
      const { listStoriesVideo = [] } = this.state
      const sortListStories = []
      // si el elemento seleccionado es el ultimo,
      // solo es un cambio de posicion del primero con el ultimo
      if (StoryItemIndex === lastItemIndex) {
        listStoriesVideo.forEach(newsItem => {
          if (
            newsItem.index !== firstItemIndex &&
            newsItem.index !== lastItemIndex
          ) {
            let news = {}
            news = { ...newsItem }
            sortListStories.push(news)
          }
        })
      } else {
        listStoriesVideo.forEach(newsItem => {
          if (
            newsItem.index !== StoryItemIndex &&
            newsItem.index !== firstItemIndex
          ) {
            let news = {}

            if (newsItem.index > StoryItemIndex) {
              news = { ...newsItem, index: newsItem.index - 1 }
            } else {
              news = { ...newsItem }
            }

            sortListStories.push(news)
          }
        })
      }

      // cambia el index del primer y el ultimo para el reordenamiento
      // la nota que estaba destacada se va a al ultimo
      const lastItem = JSON.parse(JSON.stringify(listStoriesVideo[0]))
      lastItem.index = 4

      // la nota que fue seleccionada pasa a ser destacada
      const firstItem = JSON.parse(
        JSON.stringify(listStoriesVideo[StoryItemIndex])
      )
      firstItem.index = 0

      sortListStories.push(lastItem)
      sortListStories.push(firstItem)
      sortListStories.sort((a, b) => (a.index > b.index ? 1 : -1))
      this.setState({
        listStoriesVideo: sortListStories,
      })
    }
  }

  render() {
    const { listStoriesVideo = [] } = this.state

    return (
      <>
        <div className={classes.listComponent}>
          <div className={classes.listHeader}>
            <h3>video</h3>
            <span>Logo</span>
          </div>
          {listStoriesVideo.map(item => {
            const StoryItemProps = {
              ...item,
              StoryItemHandleClick: this.StoryItemHandleClick,
            }
            return (
              <StoryItem
                key={StoryItemProps.index.toString()}
                {...StoryItemProps}
              />
            )
          })}
          <div>
            <a href="https://peru21.pe/peru21tv/">Ver programas</a>
          </div>
        </div>
      </>
    )
  }
}

StoriesListVideo.propTypes = {
  customFields,
}

StoriesListVideo.label = 'Listado de Videos'
// StoriesListVideo.static = true

export default StoriesListVideo
