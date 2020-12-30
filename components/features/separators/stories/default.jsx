import * as React from 'react'
import { useContent } from 'fusion:content'
import { useAppContext } from 'fusion:context'

import StoryData from '../../../utilities/story-data'
import { separatorStoriesFields } from '../../../utilities/included-fields'
import { SITE_ELCOMERCIO } from '../../../utilities/constants/sitenames'

import schemaFilter from './_dependencies/schema-filter'
import customFields from './_dependencies/custom-fields'
import Separator from './_children/separator'
import SeparatorOpt from './_children/separator-opt'

/**
 * 
 * @param {*} props 
 * @todo analizar bien los tamanos de las imagenes para los children
 */
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
      isImageVisible,
      responsive = 'complete',
    } = {},
  } = props

  const {
    arcSite,
    isAdmin,
    contextPath,
    deployment,
    requestUri,
  } = useAppContext()

  const presets = 'no-presets' // 'landscape_l:648x374,landscape_s:234x161,portrait_md:314x374'
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

  /**
   * @typedef StoriesSeparatorStory
   * @property {string} id
   * @property {string} title
   * @property {string} websiteLink
   * @property {string} multimediaType
   * @property {string} author
   * @property {string} authorLink
   * @property {string} imageUrl
   */
  /**
   * @type {Array<StoriesSeparatorStory>}
   */
  const stories = contentElements.map(story => {
    storyData._data = story
    const {
      id,
      title,
      websiteLink,
      multimediaType,
      author,
      authorLink,
      imageUrl,
    } = storyData

    return {
      id,
      title,
      websiteLink,
      imageUrl,
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
    isImageVisible,
    responsive,
    requestUri,
    arcSite
  }

  return arcSite === SITE_ELCOMERCIO ? (
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
