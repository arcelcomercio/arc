import { useContent } from 'fusion:content'
import { useAppContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import * as React from 'react'

import FeaturedStory from '../../../global-components/featured-story'
import schemaFilter from '../../../global-components/featured-story/schema-filter'
import {
  includeCredits,
  includePrimarySection,
  includePromoItems,
  includePromoItemsCaptions,
  includeSections,
} from '../../../utilities/included-fields'
import StoryData from '../../../utilities/story-data'
import FacebookLive from './_children/facebook-live'
import customFields from './_dependencies/custom-fields'

const CardFeaturedStoryAdvanced = (props) => {
  const {
    customFields: {
      imageSize,
      headband,
      size,
      hightlightOnMobile,
      titleField,
      authorField,
      categoryField,
      imgField,
      flagLive,
      urlVideoFacebook,
      adsSpace,
      storyConfig: { contentService = '', contentConfigValues = {} } = {},
      isLazyLoadActivate = true,
      titleHeaderField,
      invertedTitle,
      invertedColor,
      hideAuthor,
    } = {},
  } = props

  const { arcSite, contextPath, deployment } = useAppContext()

  const { siteName } = getProperties(arcSite)
  const includedFields = `websites.${arcSite}.website_url,headlines.basic,headlines.mobile,${includePromoItems},${includePromoItemsCaptions},${includeCredits},${includePrimarySection(
    { arcSite }
  )},${includeSections},publish_date,display_date`

  const data =
    useContent({
      source: contentService,
      query: Object.assign(contentConfigValues, {
        presets: 'no-presets',
        includedFields,
      }),
      filter: schemaFilter(arcSite),
    }) || {}

  const {
    primarySection,
    primarySectionLink,
    title,
    titleHeader,
    websiteLink,
    author,
    authorLink,
    multimediaType,
    multimediaCaption,
    multimedia,
  } = new StoryData({
    data,
    deployment,
    contextPath,
    arcSite,
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

  const adSpace = getAdsSpace()

  return (
    <>
      {(() => {
        if (adSpace)
          return (
            <div
              className={size === 'twoCol' ? 'col-2 row-1' : 'col-1 row-1'}
              dangerouslySetInnerHTML={{ __html: adSpace }}
            />
          )
        if (flagLive)
          return (
            <FacebookLive
              arcSite={arcSite}
              contextPath={contextPath}
              deployment={deployment}
              urlVideoFacebook={urlVideoFacebook}
            />
          )
        return (
          <FeaturedStory
            primarySection={primarySection}
            primarySectionLink={primarySectionLink}
            title={title}
            websiteLink={websiteLink}
            author={authorField || author}
            authorLink={authorLink}
            multimediaType={multimediaType}
            multimediaCaption={multimediaCaption}
            multimedia={imgField || multimedia}
            imageSize={imageSize}
            headband={headband}
            size={size}
            hightlightOnMobile={hightlightOnMobile}
            titleField={titleField}
            categoryField={categoryField}
            arcSite={arcSite}
            siteName={siteName}
            isLazyLoadActivate={isLazyLoadActivate}
            titleHeader={titleHeaderField || titleHeader}
            invertedTitle={invertedTitle}
            invertedColor={invertedColor}
            hideAuthor={hideAuthor}
          />
        )
      })()}
    </>
  )
}

CardFeaturedStoryAdvanced.propTypes = {
  customFields,
}

CardFeaturedStoryAdvanced.label = 'Destaque Avanzado'
CardFeaturedStoryAdvanced.static = true

export default CardFeaturedStoryAdvanced
