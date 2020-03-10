import React from 'react'
import { useFusionContext } from 'fusion:context'
import { useContent } from 'fusion:content'

import customFields from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'
import { createMarkup } from '../../../utilities/helpers'
import StoryData from '../../../utilities/story-data'
import AuthorCard from './_children/author-card'
import Separator from './_children/separator'
import {
  includePrimarySection,
  includeCredits,
  includeCreditsImage,
} from '../../../utilities/included-fields'

const STORIES_QTY = 5

const classes = {
  separator: 'separator__opinion bg-white pt-10 pb-10 pr-10 pl-10',
  opinionBody: 'separator__opinion--body mt-0 mb-0 ',
  opinionTitle:
    'separator__opinion-title uppercase title-md pt-15 pb-25 pr-20 pl-20 text-black',
  colorText: 'text-white',
}

const SeparatorOpinion = props => {
  const { arcSite, deployment, contextPath, isAdmin } = useFusionContext()
  const {
    customFields: { titleSection, htmlCode, section },
  } = props

  const stories = useContent({
    source: 'story-feed-by-section',
    query: {
      website: arcSite,
      stories_qty: STORIES_QTY,
      section,
      presets: 'square_s:85x85',
      includedFields: `websites.${arcSite}.website_url,_id,headlines.basic,${includePrimarySection},${includeCredits},${includeCreditsImage},credits.by.image.resized_urls`,
    },
    filter: schemaFilter(arcSite),
    transform: data => {
      const { content_elements: contentElements = [] } = data || {}
      const storyData = new StoryData({
        deployment,
        contextPath,
        arcSite,
        defaultImgSize: 'sm',
      })

      const filteredStories =
        contentElements &&
        contentElements.length > 0 &&
        contentElements.map(story => {
          const { credits: { by = [] } = {} } = story || {}
          const {
            image: { resized_urls: { square_s: squareS = '' } = {} } = {},
          } = by[0] || {}

          storyData.__data = story
          return {
            id: storyData.id,
            author: storyData.author,
            authorUrl: storyData.authorLink,
            titulo: storyData.title,
            section: storyData.primarySection,
            sectionUrl: storyData.primarySectionLink,
            websiteUrl: storyData.websiteLink,
            imageUrl: squareS || storyData.authorImage,
            multimediaLazyDefault: storyData.multimediaLazyDefault,
          }
        })

      return filteredStories
    },
  })
  if (arcSite === 'elcomercio') {
    return <Separator {...{ arcSite, isAdmin, stories }} />
  }
  return (
    <div className={classes.separator}>
      {titleSection ? (
        <div className={classes.opinionTitle}>
          <a href={section} className={classes.colorText}>
            {titleSection}
          </a>
        </div>
      ) : (
        <div
          className={classes.opinionTitle}
          dangerouslySetInnerHTML={createMarkup(htmlCode)}
        />
      )}
      <div className={classes.opinionBody}>
        {stories &&
          stories.length > 0 &&
          stories.map(info => (
            <AuthorCard
              key={info.id}
              data={info}
              arcSite={arcSite}
              isAdmin={isAdmin}
            />
          ))}
      </div>
    </div>
  )
}

SeparatorOpinion.propTypes = {
  customFields,
}

SeparatorOpinion.label = 'Separador - Opinión'
SeparatorOpinion.static = true

export default SeparatorOpinion
