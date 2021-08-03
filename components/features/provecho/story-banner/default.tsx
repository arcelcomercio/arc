import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import * as React from 'react'

import {
  includeCredits,
  includeCreditsImage,
  includePrimarySection,
  includePromoItems,
} from '../../../utilities/included-fields'
import StoryData from '../../../utilities/story-data'
import customFields from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'

const classes = {
  container: 'provecho-story-banner',
  imageBox: 'provecho-story-banner__image-box',
  image: 'provecho-story-banner__image',
  box: 'provecho-story-banner__box',
  titleBox: 'provecho-story-banner__title-box',
  section: 'provecho-story-banner__section',
  icon: 'provecho-story-banner__icon',
}
const ProvechoStoryBanner: React.FC = (props) => {
  const {
    customFields: {
      storyConfig: { contentService = '', contentConfigValues = {} } = {},
    },
  } = props
  const { arcSite, deployment, contextPath, isAdmin } = useFusionContext()

  const presets = 'landscape_md:400x209'
  const includedFields = `content_restrictions.content_code,websites.${arcSite}.website_url,headlines.basic,subheadlines.basic,${includeCredits},${includeCreditsImage},${includePromoItems}, ${includePrimarySection(
    { arcSite }
  )}`

  const data =
    useContent({
      source: contentService,
      query: Object.assign(contentConfigValues, { presets, includedFields }),
      filter: schemaFilter(arcSite),
    }) || {}

  const {
    title,
    websiteLink,
    primarySection,
    primarySectionLink,
    multimediaLandscapeMD,
    multimediaLazyDefault,
  } = new StoryData({
    data,
    arcSite,
    contextPath,
    deployment,
  })

  return (
    <div className={classes.container}>
      <a className={classes.imageBox} href={websiteLink}>
        <img
          className={`${isAdmin ? '' : 'lazy'} ${classes.image}`}
          alt={title}
          src={isAdmin ? multimediaLandscapeMD : multimediaLazyDefault}
          data-src={multimediaLandscapeMD}
        />
      </a>
      <div className={classes.box}>
        <div className={classes.section}>
          <svg
            className={classes.icon}
            version="1.1"
            id="Capa_1"
            x="0px"
            y="0px"
            viewBox="0 0 14.61 21.89">
            <path
              id="Trazado_349"
              d="M7.32,0.11c-3.98,0-7.2,3.22-7.2,7.2v0c0,3.98,7.2,14.47,7.2,14.47s7.2-10.5,7.2-14.47
              C14.52,3.33,11.3,0.11,7.32,0.11L7.32,0.11z M7.32,10.38c-1.87,0-3.39-1.51-3.39-3.38c0,0,0,0,0,0c0-1.87,1.52-3.38,3.39-3.39
              c1.87,0,3.39,1.52,3.39,3.39C10.71,8.86,9.19,10.38,7.32,10.38z"
            />
          </svg>
          <a href={primarySectionLink}>{primarySection}</a>
        </div>
        <a className={classes.titleBox} href={websiteLink}>
          {title}
        </a>
      </div>
    </div>
  )
}
ProvechoStoryBanner.propTypes = {
  customFields,
}

ProvechoStoryBanner.label = 'Banner Historia - Provecho'
ProvechoStoryBanner.static = true

export default ProvechoStoryBanner
