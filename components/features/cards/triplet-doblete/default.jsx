import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import React from 'react'

import {
  includeCredits,
  includePrimarySection,
} from '../../../utilities/included-fields'
import {
  getParams
}
  from './_dependencies/functions'
import TripleteDobleteCard from './_children/triplete-doblete'
import customFields from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'
import Data from './_dependencies/data'

const TripletDoblete = (props) => {
  const { arcSite, contextPath, deployment } = useFusionContext()

  /* AUTOMATICO */
  const {
    customFields: {
      storyConfig: {
        contentService: contentService1 = '',
        contentConfigValues: contentConfigValues1 = {},
      } = {},
      storyConfig2: {
        contentService: contentService2 = '',
        contentConfigValues: contentConfigValues2 = {},
      } = {},
      storyConfig3: {
        contentService: contentService3 = '',
        contentConfigValues: contentConfigValues3 = {},
      } = {},
    } = {},
  } = props

  const includedFields = `websites.${arcSite}.website_url,headlines.basic,${includeCredits},${includePrimarySection(
    { arcSite }
  )}`

  const dataAutomatico1 =
    useContent({
      source: contentService1,
      query: Object.assign(contentConfigValues1, { includedFields }),
      filter: schemaFilter(arcSite),
    }) || {}

  const dataAutomatico2 =
    useContent({
      source: contentService2,
      query: Object.assign(contentConfigValues2, { includedFields }),
      filter: schemaFilter(arcSite),
    }) || {}

  const dataAutomatico3 =
    useContent({
      source: contentService3,
      query: Object.assign(contentConfigValues3, { includedFields }),
      filter: schemaFilter(arcSite),
    }) || {}

  const params1 = getParams(dataAutomatico1, arcSite, contextPath, deployment)
  const params2 = getParams(dataAutomatico2, arcSite, contextPath, deployment)
  const params3 = getParams(dataAutomatico3, arcSite, contextPath, deployment)

  /* FIN AUTOMATICO */

  /* MANUAL */

  const { customFields } = props
  const { webskedId, adsSpace, adsSpace2, adsSpace3, multimediaOrientation } = customFields

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

  // URLs de historias

  const {
    data1: url1,
    data2: url2,
    data3: url3,
    image1 = '',
    image2 = '',
    image3 = '',
  } = customFields || {}

  // functions
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
    customFields,
  })

  // functions
  const toDate = dateStr => {
    const [date, time] = dateStr.split(' ')
    const [day, month, year] = date.split('/')
    return new Date(`${year}/${month}/${day} ${time} GMT-0500`)
  }

  // functions
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

  // functions 
  const getAdsSpace = () => {
    if (adsSpaces[adsSpace]) {
      const [currentSpace] = adsSpaces[adsSpace] || []
      return ads(currentSpace)
    }
    return false
  }

  // functions 
  const getAdsSpace2 = () => {
    if (adsSpaces2[adsSpace2]) {
      const [currentSpace] = adsSpaces2[adsSpace2] || []
      return ads(currentSpace)
    }
    return false
  }

  // functions 
  const getAdsSpace3 = () => {
    if (adsSpaces3[adsSpace3]) {
      const [currentSpace] = adsSpaces3[adsSpace3] || []
      return ads(currentSpace)
    }
    return false
  }

  // functions 
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

  // functions 
  const getFormatedData = (item1, item2, item3) => {
    return [
      getInstanceSnap(item1, 1, image1),
      getInstanceSnap(item2, 2, image2),
      getInstanceSnap(item3, 3, image3),
    ]
  }

  // functions 
  const getFormatFieldsStories = () => {
    return getFormatedData(data1, data2, data3)
  }

  // functions 
  const getFormatWebskedStories = () => {
    const { content_elements: contentElements = [] } = webskedData || {}
    const item1 = contentElements[0] || {}
    const item2 = contentElements[1] || {}
    const item3 = contentElements[2] || {}
    return getFormatedData(item1, item2, item3)
  }

  const dataFormatted = webskedId
    ? getFormatWebskedStories()
    : getFormatFieldsStories()

  // functions 
  const spaces = {
    getSpace0: getAdsSpace(),
    getSpace1: getAdsSpace2(),
    getSpace2: getAdsSpace3(),
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
  /* FIN MANUAL */




  return (
    <div role="list" >
      {dataFormatted.map((story, i) => {
        return (
          <TripleteDobleteCard
            key={`triplet-${story.id}`}
            index={i}
            lines={lines}
            multimediaOrientation={multimediaOrientation}
            adSpace={spaces[`getSpace${i}`]}

            websiteLink={story.websiteLink}
            title={story.title}
            authorOrSection={story.authorOrSection}
            authorOrSectionLink={story.authorOrSectionLink}
            multimedia={story.multimedia}
            multimediaType={story.multimediaType}
          />
        )
      })}
    </div>
  )
  return (
    // className="flex flex-col justify-between"
    <div>
      <TripleteDobleteCard {...params1} />
      <TripleteDobleteCard {...params2} />
      <TripleteDobleteCard {...params3} />
    </div>
  )
}

TripletDoblete.propTypes = {
  customFields,
}

TripletDoblete.label = 'Triplete - Doblete avanzado'
TripletDoblete.static = true

export default TripletDoblete

