import React from 'react'
import { useContent } from 'fusion:content'
import { useAppContext } from 'fusion:context'

const StoryNextStoryButton = ({ buttonClass }) => {
  const { arcSite, globalContent } = useAppContext()
  const { primary_section: { path: section } = {} } = globalContent || {}

  const nextStory = useContent({
    source: 'story-by-section',
    query: {
      section,
      presets: 'no-presets',
      includedFields: 'websites,website_url',
    },
  })
  const { websites = {} } = nextStory || {}
  const { website_url: websiteUrl = '/' } = websites[arcSite] || nextStory || {}

  return (
    <a href={`${websiteUrl}?outputType=amp`} className={buttonClass || ''}>
      <b>
        Siguiente artículo{' '}
        <span className="text-xl" aria-disabled="true">
          &rarr;
        </span>
      </b>
    </a>
  )
}

export default StoryNextStoryButton
