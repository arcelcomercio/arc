import { useFusionContext } from 'fusion:context'
import React from 'react'

import {
  SITE_DEPOR,
  SITE_GESTION,
} from '../../../utilities/constants/sitenames'
import StoryData from '../../../utilities/story-data'
import StoryTitleChildHeading from './_children/heading'
import StoryTitleChildShareSubheading from './_children/subheading'

const classes = {
  story: 'story-header__header-title w-full text-white ',
}

const StoryTitle = () => {
  const {
    contextPath,
    globalContent: data,
    globalContent,
    arcSite,
    requestUri,
  } = useFusionContext()
  const {
    headlines: { basic: title = '' } = {},
    subheadlines: { basic: subTitle = '' } = {},
    content_restrictions: { content_code: ContentCode = '' } = {},
  } = globalContent || {}

  const {
    contentElementsListOne: { items = [], type = '' } = {},
    primarySectionLink,
  } = new StoryData({
    data,
    contextPath,
  })
  const isPremium = ContentCode === 'premium'
  const parameters = { title, subTitle, isPremium, arcSite, items, type }
  return (
    <>
      {arcSite === SITE_DEPOR &&
      !(/^\/mexico\//.test(requestUri) || /^\/colombia\//.test(requestUri)) ? (
        <div id="spc_post_stories" />
      ) : null}
      <div
        className={`${classes.story} ${
          isPremium && arcSite === SITE_GESTION && 'no_copy'
        } ${primarySectionLink.replace(/\//g, '')}`}>
        <StoryTitleChildHeading {...parameters} />
        <StoryTitleChildShareSubheading {...parameters} />
      </div>
    </>
  )
}

StoryTitle.label = 'Artículo - Título'
StoryTitle.static = true

export default StoryTitle
