import React from 'react'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import StoryData from '../../../utilities/story-data'
import schemaFilter from './_dependencies/schema-filter'
import customFields from './_dependencies/custom-fields'
import Separator from './_children/separator'
import SeparatorOpt from './_children/separator-opt'
import { separatorStoriesFields } from '../../../utilities/included-fields'
import { getResizedUrl } from '../../../utilities/resizer'

const SeparatorStories = props => {
  const {
    customFields: {
      storyConfig: { contentService = '', contentConfigValues = {} } = {},
      titleSeparator,
      titleLink,
      htmlCode,
      isAuthorVisible,
      design = 'standart',
      bgColor,
      isSeeMoreVisible,
      responsive = 'complete',
    } = {},
  } = props

  const { arcSite, isAdmin, contextPath, deployment } = useFusionContext()

  const presets = isAdmin
    ? 'landscape_l:648x374,landscape_s:234x161,portrait_md:314x374'
    : 'no-presets'
  const includedFields = separatorStoriesFields

  const { content_elements: contentElements = [] } =
    useContent({
      source: contentService,
      query: Object.assign(contentConfigValues, {
        presets,
        includedFields,
      }),
      filter: schemaFilter(arcSite),
    }) || {}

  const storyData = new StoryData({
    arcSite,
    contextPath,
    deployment,
    defaultImgSize: 'sm',
  })

  const stories = contentElements.map(story => {
    storyData._data = story
    const {
      title,
      websiteLink,
      multimediaLazyDefault,
      multimediaType,
      author,
      authorLink,
      imageUrl,
    } = storyData

    const {
      multimediaPortraitMD = multimediaLazyDefault,
      multimediaLandscapeL = multimediaLazyDefault,
      multimediaLandscapeS = multimediaLazyDefault,
    } = isAdmin
      ? storyData
      : getResizedUrl({
          url: imageUrl,
          arcSite,
          presets:
            'multimediaLandscapeL:648x374,multimediaLandscapeS:234x161,multimediaPortraitMD:314x374',
        }) || {}

    return {
      title,
      websiteLink,
      multimediaLazyDefault,
      imageUrl:
        arcSite === 'peru21' ? multimediaPortraitMD : multimediaLandscapeS,
      imageUrlMobile:
        arcSite === 'peru21' ? multimediaPortraitMD : multimediaLandscapeL,
      multimediaType,
      author,
      authorLink,
    }
  })

  const separatorParams = {
    htmlCode,
    titleLink,
    titleSeparator,
    stories,
    isAuthorVisible,
    isAdmin,
    design,
    bgColor,
    isSeeMoreVisible,
    responsive,
  }

  return arcSite === 'elcomercio' ? (
    <SeparatorOpt {...separatorParams} />
  ) : (
    <Separator {...separatorParams} />
  )
}

SeparatorStories.label = 'Separador - noticias'
SeparatorStories.static = true

SeparatorStories.propTypes = {
  customFields,
}

export default SeparatorStories
