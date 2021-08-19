import { useContent } from 'fusion:content'
import { useAppContext } from 'fusion:context'
import React from 'react'
import { FC } from 'types/features'

import {
  includeCredits,
  includePrimarySection,
  includePromoItems,
  includePromoVideo,
} from '../../../../utilities/included-fields'
import { SchemaMultiStory } from '../_dependencies/schema-filter'
import ItemVideo from './item-video'

interface Props {
  name?: string
  url?: string
}

const classes = {
  wrapper: 'video-categories-list__section',
  wrapperTitle: 'video-categories-list__section__wrapper-title',
  name: 'video-categories-list__section__name',
  arrowTitle: 'video-categories-list__section__arrow-title',
  moreVideos: 'video-categories-list__section__section-more-videos',
  wrapperList: 'video-categories-list__section__wrapper-list',
  iconMoreVideos: 'video-categories-list__section__icon-more-videos',
}

const Section: FC<Props> = (props) => {
  // const { url = '', name = '', arcSite, contextPath, deployment } = props
  const { url = '', name = '' } = props
  const { arcSite, contextPath, deployment } = useAppContext()

  const presets = 'landscape_md:314x0'

  const videosSection =
    useContent({
      source: 'story-feed-by-section',
      query: {
        section: url,
        feedOffset: 0,
        stories_qty: 4,
        presets,
        includedFields: `websites.${arcSite}.website_url,headlines.basic,${includePrimarySection(
          { arcSite }
        )},${includePromoItems},${includePromoVideo},${includeCredits}`,
      },
      filter: SchemaMultiStory(arcSite),
    }) || {}

  // console.log('=======')
  // console.log(url)
  // console.log(videosSection.content_elements?.length)
  // console.log('=======')

  return (
    <div className={classes.wrapper}>
      <div className={classes.wrapperTitle}>
        <h2 className={classes.name}>
          {name} 
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={classes.arrowTitle}>
              <path  d="M8.59,16.59,13.17,12,8.59,7.41,10,6l6,6-6,6Z"/>
            </svg>
        </h2>
        <div className={classes.moreVideos}>
          <a href={url}>
            Ver más videos 
          </a>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={classes.iconMoreVideos}>
              <path  d="M8.59,16.59,13.17,12,8.59,7.41,10,6l6,6-6,6Z"/>
            </svg>
        </div>
      </div>
      <div className={classes.wrapperList}>
        {videosSection.content_elements &&
          videosSection.content_elements.map((video) => (
            <ItemVideo
              story={video}
              arcSite={arcSite}
              contextPath={contextPath}
              deployment={deployment}
              key={video._id}
            />
          ))}
      </div>
    </div>
  )
}

export default Section
