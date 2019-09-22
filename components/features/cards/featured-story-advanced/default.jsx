import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'

import FeaturedStory from '../../../global-components/featured-story'
import StoryFormatter from '../../../utilities/featured-story-formatter'
import customFields from './_dependencies/custom-fields'
import FacebookLive from './_children/facebook-live'

@Consumer
class CardFeaturedStoryAdvanced extends PureComponent {
  constructor(props) {
    super(props)
    const {
      deployment,
      contextPath,
      arcSite,
      customFields: {
        storyConfig: { contentService = '', contentConfigValues = {} } = {},
        adsSpace,
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
          query: {},
        },
      })
    }
  }

  getAdsSpace() {
    const { adsSpaces = {} } = this.state || {}
    const { arcSite, customFields: { adsSpace } = {} } = this.props

    const toDate = dateStr => {
      const [date, time] = dateStr.split(' ')
      const [day, month, year] = date.split('/')
      return new Date(`${year}/${month}/${day} ${time} GMT-0500`)
    }

    if (adsSpaces[arcSite]) {
      const auxAdsSpaces = adsSpaces[arcSite] || []
      const auxAdsSpace =
        auxAdsSpaces.filter(el => Object.keys(el).includes(adsSpace))[0] || {}

      if (auxAdsSpace[adsSpace]) {
        const currentSpace = auxAdsSpace[adsSpace][0]
        const {fec_inicio: fecInicio, fec_fin: fecFin, des_html: desHtml} = currentSpace
        const currentDate = new Date()
        const initDate = toDate(fecInicio)
        const endDate = toDate(fecFin)
        return currentDate > initDate && endDate > currentDate ? desHtml : false
      }
      return false
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
    const { data = {} } = this.state || {}

    console.log('isAdsSpaceActive', this.getAdsSpace())

    const formattedData = this.storyFormatter.formatStory(data, imgField)
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
    }

    const paramsFacebook = {
      arcSite,
      contextPath,
      deployment,
      urlVideoFacebook,
    }

    return (
      <>
        {!flagLive && <FeaturedStory {...paramsFeaturedStory} />}
        {flagLive && <FacebookLive {...paramsFacebook} />}
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
