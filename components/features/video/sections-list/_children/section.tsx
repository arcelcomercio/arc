import { useContent } from 'fusion:content'
import { useAppContext } from 'fusion:context'
import React from 'react'
import { FC } from 'types/features'

import {
  includeCredits,
  includePrimarySection,
  includePromoItems,
  includePromoItemsCaptions,
  includePromoVideo,
  includePromoVideoAds,
} from '../../../../utilities/included-fields'
import {
  SchemaMultiStory,
  SchemaSingleStory,
} from '../_dependencies/schema-filter'
import ItemVideo from './item-video'

interface Props {
  section?: {
    name?: string
    url?: string
  }
}

const classes = {
  wrapper: 'video-categories-list__section',
  wrapperTitle: 'video-categories-list__section__wrapper-title',
  name: 'video-categories-list__section__name',
  moreVideos: 'video-categories-list__section__section-more-videos',
  wrapperList: 'video-categories-list__section__wrapper-list',
}

const Section: FC<Props> = (props) => {
  const { section = {} } = props

  const { arcSite, contextPath, deployment } = useAppContext()

  const presets = 'landscape_md:314x0'

  const videosSection =
    useContent({
      source: 'story-feed-by-section',
      query: {
        section: section.url,
        feedOffset: 0,
        stories_qty: 4,
        presets,
        includedFields: `websites.${arcSite}.website_url,headlines.basic,${includePrimarySection(
          { arcSite }
        )},${includePromoItems},${includePromoVideo},${includeCredits}`,
      },
      filter: SchemaMultiStory(arcSite),
    }) || {}

  // console.log(`=========Videos: ${section.url}============`)
  // console.log(videosSection)
  // console.log('===============================')

  return (
    <div className={classes.wrapper}>
      <div className={classes.wrapperTitle}>
        <h2 className={classes.name}>{section.name}</h2>
        <div className={classes.moreVideos}>
          <a href={section.url}>Ver más videos &gt; </a>
        </div>
      </div>
      <div className={classes.wrapperList}>
        {videosSection.content_elements &&
          videosSection.content_elements.map((video, i) => {
            const params = {
              story: video,
              index: i,
              arcSite,
              contextPath,
              deployment,
            }
            return <ItemVideo {...params} />
          })}
      </div>
    </div>
  )
}

Section.label = 'Videos de Categoría'

export default Section
