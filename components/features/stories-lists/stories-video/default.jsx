import React from 'react'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import {
  getTitle,
  getMultimediaType,
  multimediaNews,
} from '../../../utilities/get-story-values'
import { VIDEO, ELEMENT_YOUTUBE_ID } from '../../../utilities/constants'
import customFields from './_dependencies/custom-fields'
import StoryItem from './_children/story-video-item'

const classes = {
  listComponent: 'w-full flex flex-col',
  listHeader: 'flex flex-row',
}

const CONTENT_SOURCE = 'story-by-url'

const StoriesListVideo = ({ customFields: customFieldsProps = {} }) => {
  const {
    story01 = '',
    story02 = '',
    story03 = '',
    story04 = '',
    story05 = '',
  } = customFieldsProps

  const { arcSite } = useFusionContext()

  const listUrls = [story01, story02, story03, story04, story05]

  const listStories = listUrls.map((url, index) => {
    let item = {}
    if (url !== '') {
      const data =
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useContent({
          source: CONTENT_SOURCE,
          query: {
            website: arcSite,
            website_url: url,
          },
        }) || ''
      const title = getTitle(data)
      const multimediaType = getMultimediaType(data)
      let multimediaValue = ''
      if (multimediaType === VIDEO || multimediaType === ELEMENT_YOUTUBE_ID) {
        multimediaValue = multimediaNews(data)
        item = {
          index,
          url,
          content: {
            title,
            multimediaValue,
          },
        }
      }

      item = {
        index,
        url,
      }
    } else {
      item = {
        index,
        url,
      }
    }
    return item
  })

  //   const listStories = [
  //     {
  //       index: 0,
  //       url: story01,
  //     },
  //     {
  //       index: 1,
  //       url: story02,
  //     },
  //     {
  //       index: 2,
  //       url: story03,
  //     },
  //     {
  //       index: 3,
  //       url: story04,
  //     },
  //     {
  //       index: 4,
  //       url: story05,
  //     },
  //   ]

  return (
    <>
      <div className={classes.listComponent}>
        <div className={classes.listHeader}>
          <h3>video</h3>
          <span>Logo</span>
        </div>
        {listStories.map(item => {
          return <StoryItem key={`item${item.index}`} {...item} />
        })}
        <div>
          <a href="https://peru21.pe/peru21tv/">Ver programas</a>
        </div>
      </div>
    </>
  )
}

StoriesListVideo.propTypes = {
  customFields,
}

StoriesListVideo.label = 'Listado de Videos'
// StoriesListVideo.static = true

export default StoriesListVideo
