import { useContent } from 'fusion:content'
import { useAppContext } from 'fusion:context'
import React from 'react'

import {
  includeCredits,
  includeCreditsEducation,
  includeCreditsImage,
  includeCreditsRole,
  includePrimarySection,
  includePromoItems,
  includePromoItemsCaptions,
  includeSections,
} from '../../../utilities/included-fields'
import StoryData from '../../../utilities/story-data'
import FeaturedAuthor from './_children/featured-author'
import customFields from './_dependencies/custom-fields'

const CardFeaturedStoryAuthor = (props) => {
  const { arcSite, contextPath, deployment, isAdmin } = useAppContext()

  const {
    customFields: {
      storyConfig: { contentService = '', contentConfigValues = {} } = {},
      design = 'first',
      sectionField = '',
      titleField = '',
      subTitleField = '',
      imgField = '',
      adsSpace,
    } = {},
  } = props

  const presets =
    'landscape_l:648x374,landscape_md:314x157,portrait_md:314x374,square_s:150x150'
  const includedFields = `websites.${arcSite}.website_url,headlines.basic,subheadlines.basic,${includePromoItems},${includePromoItemsCaptions},${includeCredits},${includeCreditsRole},${includeCreditsEducation},${includeCreditsImage},${includePrimarySection(
    arcSite
  )},${includeSections},publish_date,display_date,content_restrictions.content_code`

  const data =
    useContent({
      source: contentService,
      query: Object.assign(contentConfigValues, { presets, includedFields }),
      // Se elimina el schema filter porque el query al ser demasiado grande causa problemas en el pagebuilder
    }) || {}

  const {
    resized_urls: {
      landscape_l: landscapeL,
      landscape_md: landscapeMd,
      portrait_md: portraitMd,
    } = {},
  } =
    useContent({
      source: 'photo-resizer',
      query: {
        url: imgField,
        presets,
      },
    }) || {}

  const {
    title,
    websiteLink,
    primarySection,
    primarySectionLink,
    author,
    authorLink,
    authorImage,
    multimediaLandscapeMD,
    multimediaPortraitMD,
    multimediaLandscapeL,
    multimediaLazyDefault,
    authorOccupation,
    subTitle,
    multimediaType,
    multimediaSubtitle,
    multimediaCaption,
    isPremium,
  } = new StoryData({
    data,
    arcSite,
    contextPath,
    deployment,
    defaultImgSize: 'sm',
  })

  const adsSpaces =
    useContent(
      adsSpace && adsSpace !== 'none'
        ? {
            source: 'get-ads-spaces',
            query: { space: adsSpace },
          }
        : {}
    ) || {}

  const getAdsSpace = () => {
    const toDate = (dateStr) => {
      const [date, time] = dateStr.split(' ')
      const [day, month, year] = date.split('/')
      return new Date(`${year}/${month}/${day} ${time} GMT-0500`)
    }

    if (adsSpaces[adsSpace]) {
      const [currentSpace] = adsSpaces[adsSpace] || []
      const {
        fec_inicio: fecInicio,
        fec_fin: fecFin,
        des_html: desHtml,
      } = currentSpace
      const currentDate = new Date()
      const initDate = toDate(fecInicio)
      const endDate = toDate(fecFin)

      return currentDate > initDate && endDate > currentDate ? desHtml : false
    }

    return false
  }

  const ad = getAdsSpace()

  const adsClassObj = {
    first: 'col-1 row-1',
    second: 'row-1 col-2',
    third: 'row-1 col-2',
    fourth: 'row-2 col-2',
  }

  if (ad) {
    return (
      <div
        className={adsClassObj[design]}
        dangerouslySetInnerHTML={{ __html: ad }}
      />
    )
  }

  return (
    <FeaturedAuthor
      {...{
        title: titleField || title,
        websiteLink,
        primarySection: sectionField || primarySection,
        primarySectionLink,
        author,
        authorLink,
        authorImage,
        multimediaLandscapeMD: landscapeMd || multimediaLandscapeMD,
        multimediaPortraitMD: portraitMd || multimediaPortraitMD,
        multimediaLandscapeL: landscapeL || multimediaLandscapeL,
        multimediaLazyDefault,
        authorOccupation,
        subTitle: subTitleField || subTitle,
        multimediaType,
        design,
        isAdmin,
        multimediaSubtitle,
        multimediaCaption,
        isPremium,
        arcSite,
      }}
    />
  )
}

CardFeaturedStoryAuthor.label = 'Destaque de autor'
CardFeaturedStoryAuthor.static = true

CardFeaturedStoryAuthor.propTypes = {
  customFields,
}

export default CardFeaturedStoryAuthor
