import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'

import FeaturedStory from '../../../global-components/featured-story'
import StoryFormatter from '../../../utilities/featured-story-formatter'
import customFields from './_dependencies/custom-fields'
import FacebookLive from './_children/facebook-live'
import { createMarkup, getPhotoId } from '../../../utilities/helpers'

const PHOTO_SOURCE = 'photo-by-id'

const PHOTO_SCHEMA = `{
  resized_urls { 
    landscape_l 
    landscape_md
    portrait_md 
    square_s 
    lazy_default  
  }
}`

@Consumer
class CardFeaturedStoryAdvanced extends PureComponent {
  constructor(props) {
    super(props)
    const {
      deployment,
      contextPath,
      arcSite,
      customFields: {
        imgField,
        adsSpace,
        storyConfig: { contentService = '', contentConfigValues = {} } = {},
      } = {},
    } = props

    this.storyFormatter = new StoryFormatter({
      deployment,
      contextPath,
      arcSite,
    })
    const { schema } = this.storyFormatter
    this.fetchContent({
      data: {
        source: contentService,
        query: contentConfigValues,
        filter: schema,
      },
    })
    if (adsSpace && adsSpace !== 'none') {
      this.fetchContent({
        adsSpaces: {
          source: 'get-ads-spaces',
          query: { space: adsSpace },
        },
      })
    }
    if (imgField) {
      const photoId = getPhotoId(imgField)
      if (photoId) {
        this.fetchContent({
          customPhoto: {
            source: PHOTO_SOURCE,
            query: {
              _id: photoId,
            },
            filter: PHOTO_SCHEMA,
          },
        })
      }
    }
  }

  getAdsSpace() {
    const { adsSpaces = {} } = this.state || {}
    const { customFields: { adsSpace } = {} } = this.props

    const toDate = dateStr => {
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

  render() {
    const {
      editableField,
      arcSite,
      isAdmin,
      contextPath,
      deployment,
      customFields: {
        imageSize,
        headband,
        size,
        hightlightOnMobile,
        titleField,
        categoryField,
        imgField,
        flagLive,
        urlVideoFacebook,
      } = {},
      siteProperties: { siteName = '' } = {},
    } = this.props
    const { customPhoto = {}, data = {} } = this.state || {}

    const formattedData = this.storyFormatter.formatStory(
      data,
      imgField,
      customPhoto
    )
    const {
      category,
      title,
      author,
      multimediaLandscapeL,
      multimediaLandscapeMD,
      multimediaPortraitMD,
      multimediaSquareS,
      multimediaLazyDefault,
      multimediaType,
      multimediaSubtitle,
      multimediaCaption,
    } = formattedData

    const paramsFeaturedStory = {
      title,
      category,
      author,
      multimediaLandscapeL,
      multimediaLandscapeMD,
      multimediaPortraitMD,
      multimediaSquareS,
      multimediaLazyDefault,
      imageSize,
      headband,
      size,
      hightlightOnMobile,
      editableField,
      titleField,
      categoryField,
      arcSite,
      multimediaType,
      isAdmin,
      siteName,
      multimediaSubtitle,
      multimediaCaption,
    }

    const paramsFacebook = {
      arcSite,
      contextPath,
      deployment,
      urlVideoFacebook,
    }

    return (
      <>
        {(() => {
          if (this.getAdsSpace())
            return (
              <div
                className={size === 'twoCol' ? 'col-2 row-1' : 'col-1 row-1'}
                dangerouslySetInnerHTML={createMarkup(this.getAdsSpace())}
              />
            )
          if (flagLive) return <FacebookLive {...paramsFacebook} />
          return <FeaturedStory {...paramsFeaturedStory} />
        })()}
      </>
    )
  }
}

CardFeaturedStoryAdvanced.propTypes = {
  customFields,
}

CardFeaturedStoryAdvanced.label = 'Destaque Avanzado'
CardFeaturedStoryAdvanced.static = true

export default CardFeaturedStoryAdvanced
