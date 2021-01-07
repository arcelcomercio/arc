import * as React from 'react'
import { useContent } from 'fusion:content'
import { useAppContext } from 'fusion:context'

const classes = {
  container: 'w-full nsb',
  link: 'nsb__link',
  span: 'title-md',
  arrow: 'nsb__arrow',
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
      excludedSections: section,
      presets: 'no-presets',
      includedFields: 'websites,website_url',
    },
  })
  const { websites = {} } = nextStory || {}
  const { website_url: websiteUrl = '/' } = websites[arcSite] || nextStory || {}

  const StoryNextStoryLink = () => (
    <a
      href={`${websiteUrl}?ref=lite&ref=nextarticle&source=${source}`}
      className={buttonClass || classes.link}>
      Siguiente artículo{' '}
      {/* <span className={arrowClass || classes.span} aria-disabled="true">
          &rarr;
        </span> */}
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 640 640"
        className={arrowClass || classes.arrow}>
        <path
          fill="#000"
          d="M517.504 288l-194.272-194.272 45.248-45.248 271.52 271.52-271.52 271.52-45.248-45.248 194.272-194.272h-517.504v-64z"></path>
      </svg>
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
