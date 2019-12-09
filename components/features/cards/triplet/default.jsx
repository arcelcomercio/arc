import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'

import customFields from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'
import Data from './_dependencies/data'
import TripletChildTriplet from './_children/triplet'
import { getPhotoId } from '../../../utilities/helpers'

const API_STORY_BY_URL = 'story-by-url'
const API_FEED_BY_COLLECTION = 'story-feed-by-collection'

@Consumer
class CardTriplet extends PureComponent {
  constructor(props) {
    super(props)
    const { customFields: { webskedId, adsSpace, adsSpace2, adsSpace3 } = {} } =
      props || {}

    if (adsSpace && adsSpace !== 'none') {
      this.fetchContent({
        adsSpaces: {
          source: 'get-ads-spaces',
          query: { space: adsSpace },
        },
      })
    }
    if (adsSpace2 && adsSpace2 !== 'none') {
      this.fetchContent({
        adsSpaces2: {
          source: 'get-ads-spaces',
          query: { space: adsSpace2 },
        },
      })
    }
    if (adsSpace3 && adsSpace3 !== 'none') {
      this.fetchContent({
        adsSpaces3: {
          source: 'get-ads-spaces',
          query: { space: adsSpace3 },
        },
      })
    }

    this.initDataInstance()
    if (webskedId) this.getWebskedStories()
    else this.getFieldsStories()
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

  getAdsSpace2() {
    const { adsSpaces2 = {} } = this.state || {}
    const { customFields: { adsSpace2 } = {} } = this.props

    const toDate = dateStr => {
      const [date, time] = dateStr.split(' ')
      const [day, month, year] = date.split('/')
      return new Date(`${year}/${month}/${day} ${time} GMT-0500`)
    }

    if (adsSpaces2[adsSpace2]) {
      const [currentSpace] = adsSpaces2[adsSpace2] || []
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

  getAdsSpace3() {
    const { adsSpaces3 = {} } = this.state || {}
    const { customFields: { adsSpace3 } = {} } = this.props

    const toDate = dateStr => {
      const [date, time] = dateStr.split(' ')
      const [day, month, year] = date.split('/')
      return new Date(`${year}/${month}/${day} ${time} GMT-0500`)
    }

    if (adsSpaces3[adsSpace3]) {
      const [currentSpace] = adsSpaces3[adsSpace3] || []
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

  getFieldsStories() {
    const {
      customFields: { data1, data2, data3, image1, image2, image3 } = {},
      arcSite,
    } = this.props || {}

    const fetchDataModel = data => {
      return {
        source: API_STORY_BY_URL,
        query: { website_url: data },
        filter: schemaFilter(arcSite),
      }
    }
    const fetchImageModel = image => {
      return {
        source: 'photo-by-id',
        query: { _id: getPhotoId(image) },
        filter: `{
          resized_urls { 
            square_s
          }
        }`,
      }
    }
    const fetchData = {}

    if (data1) fetchData.data1 = fetchDataModel(data1)
    if (data2) fetchData.data2 = fetchDataModel(data2)
    if (data3) fetchData.data3 = fetchDataModel(data3)
    if (image1) fetchData.image1 = fetchImageModel(image1)
    if (image2) fetchData.image2 = fetchImageModel(image2)
    if (image3) fetchData.image3 = fetchImageModel(image3)
    if (fetchData !== {}) this.fetchContent(fetchData)
  }

  getWebskedStories() {
    const { customFields: { webskedId } = {}, arcSite } = this.props || {}
    this.fetchContent({
      webskedData: {
        source: API_FEED_BY_COLLECTION,
        query: { id: webskedId },
        filter: `
          content_elements ${schemaFilter(arcSite)}
        `,
      },
    })
  }

  getInstanceSnap(el, index, customImage) {
    this.data.__data = el
    this.data.__index = index
    this.data.__customImage = customImage
    // TODO: Este feature no debería usar attributesRaw, consume muchos recursos
    return this.data.attributesRaw
  }

  getFormatFieldsStories() {
    const { data1 = {}, data2 = {}, data3 = {} } = this.state || {}

    return this.getFormatedData(data1, data2, data3)
  }

  getFormatWebskedStories() {
    const { webskedData: { content_elements: contentElements = [] } = {} } =
      this.state || {}
    const data1 = contentElements[0] || {}
    const data2 = contentElements[1] || {}
    const data3 = contentElements[2] || {}
    return this.getFormatedData(data1, data2, data3)
  }

  getFormatedData(data1, data2, data3) {
    const { image1 = {}, image2 = {}, image3 = {} } = this.state || {}
    return [
      this.getInstanceSnap(data1, 1, image1),
      this.getInstanceSnap(data2, 2, image2),
      this.getInstanceSnap(data3, 3, image3),
    ]
  }

  initDataInstance() {
    const {
      deployment,
      contextPath,
      arcSite,
      customFields: custom = {},
    } = this.props
    this.data = new Data({
      deployment,
      contextPath,
      arcSite,
      customFields: custom,
      defaultImgSize: 'sm',
    })
  }

  render() {
    const {
      arcSite,
      editableField,
      isAdmin,
      customFields: { webskedId, multimediaOrientation } = {},
      getSpace = this.getAdsSpace(),
      getSpace2 = this.getAdsSpace2(),
      getSpace3 = this.getAdsSpace3(),
    } = this.props

    const dataFormatted = webskedId
      ? this.getFormatWebskedStories()
      : this.getFormatFieldsStories()
    const params = {
      arcSite,
      editableField,
      isAdmin,
      data: dataFormatted,
      multimediaOrientation,
      getSpace,
      getSpace2,
      getSpace3,
    }
    return <TripletChildTriplet {...params} />
  }
}

CardTriplet.label = 'Triplete'
CardTriplet.static = true

CardTriplet.propTypes = {
  customFields,
}

export default CardTriplet
