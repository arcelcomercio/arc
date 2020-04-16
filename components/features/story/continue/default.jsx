/* eslint-disable jsx-a11y/heading-has-content */
import React from 'react'
import { useFusionContext } from 'fusion:context'
import { useContent } from 'fusion:content'

import customFields from './_dependencies/custom-fields'
import {
  storyContinueScript,
  sessionStorageScript,
} from './_dependencies/scripts'

const classes = {
  storyContinue:
    'story-continue position-relative flex items-center justify-center pt-50 pb-50',
  storyLoad:
    'story-continue__story-load position-absolute flex items-center justify-center h-full',
  storyLoadLink:
    'story-continue__story-load-link flex items-center justify-center',
  storyLoadImage: 'story-continue__story-load-image position-absolute ',
  storyCircle: 'story-continue__circle position-relative rounded',
  storycounter: 'story-continue__counter position-absolute rounded',
  storyProgres: 'story-continue__progress',
  storyLoadNews: 'story-continue__story-load-news pl-30',
  storyLoadText: 'story-continue__story-load-text block text-gray-200 pb-5',
  storyLoadTitle:
    'story-continue__story-load-title font-bold text-gray-300 overflow-hidden',
}

const StoryContinue = ({ customFields: { isBlog } = {} }) => {
  const {
    globalContent: {
      taxonomy: { primary_section: { path = '' } = {} } = {},
    } = {},
    arcSite,
    siteProperties,
    contextPath,
  } = useFusionContext()

  const data = useContent({
    source: 'story-feed-by-section',
    query: {
      section: path,
      stories_qty: 6,
      presets: 'no-presets',
      includedFields: `_id,headlines.basic,websites.${arcSite}.website_url`,
    },
  })

  const { siteUrl } = siteProperties
  const { content_elements: stories = [] } = data || {}

  const recentStoryContinue = stories.map(story => {
    const { headlines: { basic: title = '' } = '', websites = {} } = story
    const { website_url: websiteUrl } = websites[arcSite] || {}

    return {
      basic: title,
      websiteUrl,
    }
  })

  return (
    <>
      <div className={classes.storyContinue}>
        <div className={classes.storyLoad} data-state="outviewport">
          <a href="/" className={classes.storyLoadLink}>
            <div className={classes.storyCircle}>
              <span className={classes.storyLoadImage} />
              <div className={classes.storycounter}> </div>
              <div
                role="progressbar"
                className={classes.storyProgres}
                size="180"
              />
              <div className={classes.storyProgresEnd} />
            </div>
            <div className={classes.storyLoadNews}>
              {!isBlog && (
                <span className={classes.storyLoadText}>
                  Cargando siguiente...
                </span>
              )}
              <h3 className={classes.storyLoadTitle}></h3>
            </div>
          </a>
        </div>
      </div>
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `${storyContinueScript(
            arcSite,
            contextPath,
            isBlog
          )}${sessionStorageScript(
            recentStoryContinue,
            siteUrl,
            arcSite,
            isBlog
          )}`,
        }}
      />
    </>
  )
}

StoryContinue.propTypes = {
  customFields,
}

StoryContinue.label = 'Artículo - Siguiente'
StoryContinue.static = true

StoryContinue.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  customFields,
}

export default StoryContinue
