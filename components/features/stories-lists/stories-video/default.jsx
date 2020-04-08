import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import {
  getTitle,
  getVideo,
  getVideoYoutube,
  getImage,
  getVideoImage,
  getVideoTime,
} from '../../../utilities/get-story-values'
import { LANDSCAPE_XXS } from '../../../utilities/constants/image-sizes'
import {
  VIDEO,
  ELEMENT_YOUTUBE_ID,
} from '../../../utilities/constants/multimedia-types'

import { defaultImage, getAssetsPath } from '../../../utilities/assets'
import customFields from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filters'
import StoryItem from './_children/story-video-item'

const classes = {
  listComponent: 'stories-video__wrapper w-full flex flex-col justify-between',
  listHeader:
    'stories-video__header flex items-center justify-between pt-10 pb-10 pl-20 pr-20',
  listTitle: 'stories-video__title text-white uppercase',
  listWrapper: 'stories-video__list-wrapper h-full flex flex-col justify-end',
  viewProgramsWrapper:
    'stories-video__programs-wrapper flex justify-center pt-10 pb-10 pl-20 pr-20',
  viewPrograms:
    'stories-video__programs text-white flex items-center flex-row-reverse',
}

const CONTENT_SOURCE = 'story-by-url'
const PERU21TV_URL = 'https://peru21.pe/peru21tv/'
@Consumer
class StoriesListVideo extends PureComponent {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props)
    this.state = {
      listStoriesVideo: [],
    }
    this.getContentApi()
  }

  componentDidMount() {
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
              presets: `${LANDSCAPE_XXS}:170x90`,
            },
            filter: schemaFilter,
          },
        })
      }
    })
  }

  getListVideoNews = () => {
    const { story01, story02, story03, story04, story05 } = this.state

    const {
      isAdmin,
      customFields: {
        liveStory01 = false,
        liveStory02 = false,
        liveStory03 = false,
        liveStory04 = false,
        liveStory05 = false,
      } = {},
    } = this.props
    const listStories = [story01, story02, story03, story04, story05]
    const listLiveStory = [
      liveStory01,
      liveStory02,
      liveStory03,
      liveStory04,
      liveStory05,
    ]

    const listStoriesVideo = []
    listStories.forEach((data, index) => {
      const newsVideoCenter = getVideo(data)
      const newsVideoYoutube = getVideoYoutube(data)

      let newsVideo = {}
      let image = {}
      if (newsVideoCenter.type === VIDEO) {
        newsVideo = newsVideoCenter
        image = getVideoImage(data, LANDSCAPE_XXS)

        // newsVideo.payload='<div class="powa" data-autoplay id="powa-d046636b-bef2-4e6b-a756-52fccf2330ea" data-org="elcomercio" data-env="prod" data-uuid="d046636b-bef2-4e6b-a756-52fccf2330ea" data-aspect-ratio="0.562" data-api="prod"><script src="//d1tqo5nrys2b20.cloudfront.net/prod/powaBoot.js?org=elcomercio"></script></div>'
      } else if (newsVideoYoutube.type === ELEMENT_YOUTUBE_ID) {
        newsVideo = newsVideoYoutube
        image = getImage(data, LANDSCAPE_XXS)
        image.default = false

        if (image.payload === '') {
          const { deployment, arcSite = '', contextPath = '' } = this.props
          image.default = true
          image.payload = defaultImage({
            deployment,
            contextPath,
            arcSite,
            size: 'sm',
          })
        }
      }

      let item = { key: index }

      if (
        data &&
        (newsVideo.type === ELEMENT_YOUTUBE_ID || newsVideo.type === VIDEO)
      ) {
        const title = getTitle(data)

        item = {
          index,
          isAdmin,
          liveStory: listLiveStory[index],
          valid: true,
          content: {
            title,
            image,
            video: newsVideo,
            autoPlayVideo: false,
            videoTime: getVideoTime(data),
          },
        }
      } else {
        item = {
          index,
          isAdmin,
          liveStory: listLiveStory[index],
        }
      }

      listStoriesVideo.push(item)
    })

    this.setState({
      listStoriesVideo,
    })
  }

  StoryItemHandleClick = StoryItemIndex => {
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

      // si el primer elemento debe tener autoplay
      firstItem.content.autoPlayVideo = true

      sortListStories.push(lastItem)
      sortListStories.push(firstItem)
      sortListStories.sort((a, b) => (a.index > b.index ? 1 : -1))
      this.setState({
        listStoriesVideo: sortListStories,
      })
    }
  }

  render() {
    const { arcSite = '', contextPath = '' } = this.props
    const { listStoriesVideo = [] } = this.state

    const logoImg = `${getAssetsPath(
      arcSite,
      contextPath
    )}/resources/dist/${arcSite}/images/Logo_P21TV.png?d=1`
    return (
      <>
        <script src="//d1tqo5nrys2b20.cloudfront.net/prod/powaBoot.js?org=elcomercio" />
        <div className={classes.listComponent}>
          <div className={classes.listHeader}>
            <h3 className={classes.listTitle}>video</h3>
            <a href={PERU21TV_URL}>
              <img src={logoImg} alt="Logo" />
            </a>
          </div>
          <div className={classes.listWrapper}>
            {listStoriesVideo.length > 0 &&
              listStoriesVideo.map(item => {
                const StoryItemProps = {
                  ...item,
                  StoryItemHandleClick: this.StoryItemHandleClick,
                }
                return <StoryItem {...StoryItemProps} />
              })}

            <div className={classes.viewProgramsWrapper}>
              <a className={classes.viewPrograms} href={PERU21TV_URL}>
                Ver programas
              </a>
            </div>
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
