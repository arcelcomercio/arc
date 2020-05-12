import React from 'react'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import ExtraordinaryStoryGridChild from './_children/extraordinary-story-grid'
import customFields from './_dependencies/custom-fields'
import { storySchema, sectionSchema } from './_dependencies/schema-filter'
import Data from '../_dependencies/data'
import SectionData from '../../../utilities/section-data'
import {
  includeCredits,
  includePrimarySection,
  includePromoItems,
} from '../../../utilities/included-fields'
import { getAssetsPath } from '../../../utilities/assets'

const PHOTO_SOURCE = 'photo-resizer'

const getPhotoId = photoUrl => {
  if (!photoUrl) return ''
  const customPhotoUrl = photoUrl.match(/\/([A-Z0-9]{26})(:?.[\w]+)?$/)
  const [, photoId] = customPhotoUrl || []
  return photoId
}

const ExtraordinaryStoryGrid = props => {
  const { customFields: customFieldsData = {} } = props
  const { deployment, contextPath, arcSite, isAdmin } = useFusionContext()

  const presets = 'landscape_xl:980x528,square_l:600x600'
  const includedFields = `websites.${arcSite}.website_url,website,headlines.basic,subheadlines.basic,promo_items.basic_video._id,${includePromoItems},${includeCredits},${includePrimarySection}`

  const {
    urlStory: {
      contentService: storyService = '',
      contentConfigValues: storyConfigValues = {},
    } = {},
    multimediaSource,
  } = customFieldsData || {}

  const storyData = useContent({
    source: storyService,
    query:
      presets || includedFields
        ? Object.assign(storyConfigValues, { presets, includedFields })
        : storyConfigValues,
    filter: storySchema(arcSite),
  })

  // Solo acepta custom image desde Photo Center
  const photoId = multimediaSource ? getPhotoId(multimediaSource) : ''
  const customPhoto =
    useContent(
      photoId
        ? {
            source: PHOTO_SOURCE,
            query: {
              url: multimediaSource,
              presets,
            },
          }
        : {}
    ) || {}

  const {
    section1: {
      contentConfigValues: {
        _id: id1 = '',
        contentService: sectionService1 = '',
        contentConfigValues: sectionConfigValues1 = {},
      } = {},
    } = {},
    section2: {
      contentConfigValues: {
        _id: id2 = '',
        contentService: sectionService2 = '',
        contentConfigValues: sectionConfigValues2 = {},
      } = {},
    } = {},
    section3: {
      contentConfigValues: {
        _id: id3 = '',
        contentService: sectionService3 = '',
        contentConfigValues: sectionConfigValues3 = {},
      } = {},
    } = {},
    section4: {
      contentConfigValues: {
        _id: id4 = '',
        contentService: sectionService4 = '',
        contentConfigValue: sectionConfigValues4 = {},
      } = {},
    } = {},
  } = customFieldsData || {}

  const section1 =
    useContent(
      id1
        ? {
            source: sectionService1,
            query: sectionConfigValues1,
            filter: sectionSchema,
          }
        : {}
    ) || {}

  const section2 =
    useContent(
      id2
        ? {
            source: sectionService2,
            query: sectionConfigValues2,
            filter: sectionSchema,
          }
        : {}
    ) || {}

  const section3 =
    useContent(
      id3
        ? {
            source: sectionService3,
            query: sectionConfigValues3,
            filter: sectionSchema,
          }
        : {}
    ) || {}

  const section4 =
    useContent(
      id4
        ? {
            source: sectionService4,
            query: sectionConfigValues4,
            filter: sectionSchema,
          }
        : {}
    ) || {}

  const formattedStoryData = new Data({
    customFields: customFieldsData,
    data: storyData,
    arcSite,
    deployment,
    contextPath,
    defaultImgSize: 'sm',
    customPhoto,
  })

  const formattedSection1 = new SectionData(section1, arcSite)
  const formattedSection2 = new SectionData(section2, arcSite)
  const formattedSection3 = new SectionData(section3, arcSite)
  const formattedSection4 = new SectionData(section4, arcSite)
  // this.isVideo = formattedStoryData.isVideo

  const imgLogo =
    customFieldsData.logo ||
    `${getAssetsPath(
      arcSite,
      contextPath
    )}/resources/assets/extraordinary-story/grid/logo.png?d=1`

  const params = {
    storyData: formattedStoryData,
    section1: formattedSection1,
    section2: formattedSection2,
    section3: formattedSection3,
    section4: formattedSection4,
    deployment,
    contextPath,
    arcSite,
    imgLogo,
    isAdmin,
  }
  return <ExtraordinaryStoryGridChild {...params} />
}

ExtraordinaryStoryGrid.propTypes = {
  customFields,
}

ExtraordinaryStoryGrid.label = 'Apertura extraordinaria con grilla'
ExtraordinaryStoryGrid.static = true

export default ExtraordinaryStoryGrid
