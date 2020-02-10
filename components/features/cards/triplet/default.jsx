import React from 'react'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import customFields from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'
import Data from './_dependencies/data'
import TripletChildTriplet from './_children/triplet'
import { getPhotoId } from '../../../utilities/helpers'

const API_STORY_BY_URL = 'story-by-url'
const API_FEED_BY_COLLECTION = 'story-feed-by-collection'

const CardTriplet = props => {
  const { customFields: custom } = props
  const { webskedId, adsSpace, adsSpace2, adsSpace3, multimediaOrientation } =
    custom || {}

  const { deployment, contextPath, arcSite, isAdmin } = useFusionContext()
  const presets = 'square_s:150x150'

  const adsSpaces =
    useContent(
      adsSpace && adsSpace !== 'none'
        ? {
            source: 'get-ads-spaces',
            query: { space: adsSpace },
          }
        : {}
    ) || {}

  const adsSpaces2 =
    useContent(
      adsSpace2 && adsSpace2 !== 'none'
        ? {
            source: 'get-ads-spaces',
            query: { space: adsSpace2 },
          }
        : {}
    ) || {}
  const adsSpaces3 =
    useContent(
      adsSpace3 && adsSpace3 !== 'none'
        ? {
            source: 'get-ads-spaces',
            query: { space: adsSpace3 },
          }
        : {}
    ) || {}

  // SOLO si existe webskedId
  const webskedData =
    useContent(
      webskedId
        ? {
            source: API_FEED_BY_COLLECTION,
            query: { id: webskedId, presets },
            filter: `
        content_elements ${schemaFilter(arcSite)}
      `,
          }
        : {}
    ) || {}

  // SOLO si no existe webskedId y hay URLs de historias
  const {
    data1: url1,
    data2: url2,
    data3: url3,
    image1: img1,
    image2: img2,
    image3: img3,
  } = custom || {}

  const fetchDataModel = url => {
    return {
      source: API_STORY_BY_URL,
      query: { website_url: url },
      filter: schemaFilter(arcSite),
    }
  }
  const fetchImageModel = image => {
    return {
      source: 'photo-by-id',
      query: { _id: getPhotoId(image), presets },
      filter: `{
            resized_urls { 
              square_s
            }
          }`,
    }
  }

  const data1 = useContent(url1 ? fetchDataModel(url1) : {}) || {}
  const data2 = useContent(url2 ? fetchDataModel(url2) : {}) || {}
  const data3 = useContent(url3 ? fetchDataModel(url3) : {}) || {}
  const image1 = useContent(img1 ? fetchImageModel(img1) : {}) || {}
  const image2 = useContent(img2 ? fetchImageModel(img2) : {}) || {}
  const image3 = useContent(img3 ? fetchImageModel(img3) : {}) || {}

  const data = new Data({
    deployment,
    contextPath,
    arcSite,
    customFields: custom,
    defaultImgSize: 'sm',
  })

  const toDate = dateStr => {
    const [date, time] = dateStr.split(' ')
    const [day, month, year] = date.split('/')
    return new Date(`${year}/${month}/${day} ${time} GMT-0500`)
  }

  const ads = currentSpace => {
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

  const getAdsSpace = () => {
    if (adsSpaces[adsSpace]) {
      const [currentSpace] = adsSpaces[adsSpace] || []
      return ads(currentSpace)
    }

    return false
  }

  const getAdsSpace2 = () => {
    if (adsSpaces2[adsSpace2]) {
      const [currentSpace] = adsSpaces2[adsSpace2] || []
      return ads(currentSpace)
    }

    return false
  }

  const getAdsSpace3 = () => {
    if (adsSpaces3[adsSpace3]) {
      const [currentSpace] = adsSpaces3[adsSpace3] || []
      return ads(currentSpace)
    }

    return false
  }

  const getInstanceSnap = (el, index, customImage) => {
    data.__data = el
    data.__index = index
    data.__customImage = customImage
    // TODO: Este feature no debería usar attributesRaw, consume muchos recursos
    return data.attributesRaw
  }

  const getFormatedData = (item1, item2, item3) => {
    return [
      getInstanceSnap(item1, 1, image1),
      getInstanceSnap(item2, 2, image2),
      getInstanceSnap(item3, 3, image3),
    ]
  }

  const getFormatFieldsStories = () => {
    return getFormatedData(data1, data2, data3)
  }

  const getFormatWebskedStories = () => {
    const { content_elements: contentElements = [] } = webskedData || {}
    const item1 = contentElements[0] || {}
    const item2 = contentElements[1] || {}
    const item3 = contentElements[2] || {}
    return getFormatedData(item1, item2, item3)
  }

  const {
    getSpace = getAdsSpace(),
    getSpace2 = getAdsSpace2(),
    getSpace3 = getAdsSpace3(),
  } = props

  const dataFormatted = webskedId
    ? getFormatWebskedStories()
    : getFormatFieldsStories()

  const params = {
    arcSite,
    isAdmin,
    data: dataFormatted,
    multimediaOrientation,
    getSpace,
    getSpace2,
    getSpace3,
  }
  return <TripletChildTriplet {...params} />
}

CardTriplet.label = 'Triplete'
CardTriplet.static = true

CardTriplet.propTypes = {
  customFields,
}

export default CardTriplet
