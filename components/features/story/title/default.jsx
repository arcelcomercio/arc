import React from 'react'
import {
  SITE_ELCOMERCIO,
  SITE_ELCOMERCIOMAG,
  SITE_PERU21,
  SITE_GESTION,
} from '../../../utilities/constants/sitenames'

import { useFusionContext } from 'fusion:context'

import StoryTitleChildHeading from './_children/heading'
import StoryTitleChildShareSubheading from './_children/subheading'

const classes = {
  story: 'story-header__header-title w-full text-white ',
}

const StoryTitle = () => {
  const { globalContent, arcSite } = useFusionContext()
  const {
    headlines: { basic: title = '' } = {},
    subheadlines: { basic: subTitle = '' } = {},
    content_restrictions: { content_code: ContentCode = '' } = {},
    taxonomy: { primary_section: { path: primarySectionLink = '' } = {} } = {},
  } = globalContent || {}
  const isPremium = ContentCode === 'premium'
  const parameters = { title, subTitle, isPremium, arcSite }

  return (
    <>
      <div
        className={`${classes.story} ${isPremium &&
          arcSite === SITE_GESTION &&
          'no_copy'} ${primarySectionLink.replace(/\//g, '')}`}>
        <StoryTitleChildHeading {...parameters} />
        <StoryTitleChildShareSubheading {...parameters} />
      </div>
    </>
  )
}

StoryTitle.label = 'Artículo - Título'
StoryTitle.static = true

export default StoryTitle
