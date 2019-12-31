import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import {
  getTitle,
  getMultimediaType,
  multimediaNews,
} from '../../../utilities/get-story-values'
import { VIDEO, ELEMENT_YOUTUBE_ID } from '../../../utilities/constants'
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
        this.fetchContent(
          {
            [`story0${index + 1}`]: {
              source: CONTENT_SOURCE,
              query: {
                website: arcSite,
                website_url: url,
              },
              filter: schemaFilter,
            },
          }
          // filterSchema
        )
      }
    })
  }

  getListVideoNews = () => {
    const { story01, story02, story03, story04, story05 } = this.state
    const listStories = [story01, story02, story03, story04, story05]
    const listStoriesVideo = []
    listStories.forEach((data, index) => {
      let item = {}
      if (
        data &&
        (getMultimediaType(data) === VIDEO ||
          getMultimediaType(data) === ELEMENT_YOUTUBE_ID)
      ) {
        let multimediaValue = ''
        multimediaValue = multimediaNews(data)
        const title = getTitle(data)
        item = {
          index,
          content: {
            title,
            multimediaValue,
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
      listStoriesVideo
    })
  }

  // getData() {}
  // const {
  //   arcSite = '',
  //   customFields: {
  //     story01 = '',
  //     story02 = '',
  //     story03 = '',
  //     story04 = '',
  //     story05 = '',
  //   } = {},
  // } = this.props
  // const listUrls = [story01, story02, story03, story04, story05]
  // const listStories = listUrls.map((url, index) => {
  //   let item = {}
  //   if (url !== '') {

  //     // colocar la logica para llamar la data
  //     //
  //     //
  //     const multimediaType = getMultimediaType(data)
  //     let multimediaValue = ''

  //     if (multimediaType === VIDEO || multimediaType === ELEMENT_YOUTUBE_ID) {
  //       multimediaValue = multimediaNews(data)
  //       const title = getTitle(data)
  //       item = {
  //         index,
  //         url,
  //         content: {
  //           title,
  //           multimediaValue,
  //         },
  //       }
  //     } else {
  //       item = {
  //         index,
  //         url,
  //       }
  //     }
  //   } else {
  //     item = {
  //       index,
  //       url,
  //     }
  //   }
  //   return item
  // })
  // }

  render() {
    const { listStoriesVideo = [] } = this.state
    debugger
    return (
      <>
        <div className={classes.listComponent}>
          <div className={classes.listHeader}>
            <h3>video</h3>
            <span>Logo</span>
          </div>
          {listStoriesVideo.map(item => {
            return <StoryItem key={`item${item.index}`} {...item} />
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
