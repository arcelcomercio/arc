import { useContent } from 'fusion:content'
import { useAppContext } from 'fusion:context'
import React from 'react'
import { FC } from 'types/features'
import ItemVideo from './item-video'

import {
  SchemaMultiStory,
  SchemaSingleStory,
} from '../_dependencies/schema-filter'
import {
  includeCredits,
  includePrimarySection,
  includePromoItems,
  includePromoItemsCaptions,
  includePromoVideo,
  includePromoVideoAds,
} from '../../../../utilities/included-fields'

interface Props {
  category?: object
}

const classes = {
  wrapper: 'video-categories-list__category',
  // name: 'video-categories-list__category-name',
  name: 'play-list__name',
  moreVideos: 'video-categories-list__category-more-videos',
  wrapperList: 'video-categories-list__wrapper-list',
}

const Section: FC<Props> = (props) => {
  const {section = ""} = props

  const {
    arcSite,
  } = useAppContext()

  const presets = 'landscape_md:314x0'

  const sectionVideos =
    useContent({
      source: 'story-feed-by-section',
      query: {
        section: section.name,
        feedOffset: 0,
        stories_qty: 4,
        presets,
        includedFields: `websites.${arcSite}.website_url,headlines.basic,${includePrimarySection(
          { arcSite }
        )},${includePromoItems},${includePromoVideo},${includeCredits}`,
      },
      filter: SchemaMultiStory(arcSite),
    }) || {}

  console.log("=========Videos: " + section.name + "============")
  console.log(sectionVideos)
  console.log("===============================")

  return(
    <div className={classes.wrapper}>
      <h2 className={classes.name}>{section.name}</h2>
      <div className={classes.moreVideos}>Ver más videos</div>
      <div className={classes.wrapperList}>

      </div>
    </div>
  )
}

Section.label = 'Videos de Categoría'

export default Section