import * as React from 'react'
import { useContent } from 'fusion:content'
import { useAppContext } from 'fusion:context'

import customFields from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'
import Data from './_dependencies/data'
import TripletChildTriplet from './_children/triplet'

const API_STORY_BY_URL = 'story-by-url'
const API_FEED_BY_COLLECTION = 'story-feed-by-collection'

const CardTriplet = props => {
  const { customFields: custom } = props
  const { webskedId, adsSpace, adsSpace2, adsSpace3, multimediaOrientation } =
    custom || {}

  const { deployment, contextPath, arcSite } = useAppContext()
  const presets = 'no-presets'

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
    image1 = '',
    image2 = '',
    image3 = '',
  } = custom || {}

  const fetchDataModel = url => {
    return {
      source: API_STORY_BY_URL,
      query: { website_url: url, presets },
      filter: schemaFilter(arcSite),
    }
  }

  const data1 = useContent(url1 ? fetchDataModel(url1) : {}) || {}
  const data2 = useContent(url2 ? fetchDataModel(url2) : {}) || {}
  const data3 = useContent(url3 ? fetchDataModel(url3) : {}) || {}

  const data = new Data({
    deployment,
    contextPath,
    arcSite,
    customFields: custom,
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

    return {
      id: data.id,
      websiteLink: data.websiteLink,
      title: data.title,
      multimedia: customImage || data.multimedia,
      multimediaType: data.multimediaType,
      authorOrSection: data.authorOrSection,
      authorOrSectionLink: data.authorOrSectionLink
    }
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

  const spaces = {
    getSpace0: getAdsSpace(),
    getSpace1: getAdsSpace2(),
    getSpace2: getAdsSpace3(),
  }

  const dataFormatted = webskedId
    ? getFormatWebskedStories()
    : getFormatFieldsStories()

  const classes = {
    triplet: 'triplet bg-white border-solid border-1 border-gray p-20 row-1',
  }

  let lines = ''
  switch (arcSite) {
    case 'elcomercio':
      lines = 'threelines'
      break
    case 'depor':
      lines = 'twolines'
      break
    default:
      lines = 'threelines'
      break
  }

  return (
    <div role="list" className={classes.triplet}>
      {dataFormatted.map((story, i) => {
        return (
          <TripletChildTriplet
            key={`triplet-${story.id}`}
            index={i}
            lines={lines}
            websiteLink={story.websiteLink}
            title={story.title}
            authorOrSection={story.authorOrSection}
            authorOrSectionLink={story.authorOrSectionLink}
            multimedia={story.multimedia}
            multimediaType={story.multimediaType}
            multimediaOrientation={multimediaOrientation}
            adSpace={spaces[`getSpace${i}`]}
          />
        )
      })}
    </div>
  )
}

CardTriplet.label = 'Triplete'
CardTriplet.static = true

CardTriplet.propTypes = {
  customFields,
}

export default CardTriplet
