import * as React from 'react'
import { useContent } from 'fusion:content'
import { useAppContext } from 'fusion:context'

const classes = {
  container: 'pl-20 pr-20',
  link:
    'text-center title-xs secondary-font block p-20 mt-20 mb-20 mx-auto p-20 w-full amp-story-content border-solid border-1 border-black rounded-sm',
  span: 'title-md',
}

const StoryNextStoryButton = ({
  containerClass,
  buttonClass,
  arrowClass,
  source = 'footer',
}) => {
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

  const StoryNextStoryLink = () => (
    <a
      href={`${websiteUrl}?ref=amp&ref=nextarticle&source=${source}`}
      className={buttonClass || classes.link}>
      <b>
        Siguiente artículo{' '}
        <span className={arrowClass || classes.span} aria-disabled="true">
          &rarr;
        </span>
      </b>
    </a>
  )

  return buttonClass ? (
    StoryNextStoryLink()
  ) : (
    <div className={containerClass || classes.container}>
      {StoryNextStoryLink()}
    </div>
  )
}

StoryNextStoryButton.static = true
StoryNextStoryButton.label = 'Artículo - Botón Siguiente'

export default React.memo(StoryNextStoryButton)
