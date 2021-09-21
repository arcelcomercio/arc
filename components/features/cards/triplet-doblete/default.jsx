import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import React from 'react'

import {
  includeCredits,
  includePrimarySection,
  includePromoItems,
  includePromoItemsCaptions,
  includeSections,
} from '../../../utilities/included-fields'
import TripleteDobleteCard from './_children/triplete-doblete'
import customFields from './_dependencies/custom-fields'
import { getParams } from './_dependencies/functions'
import schemaFilter from './_dependencies/schema-filter'

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
      viewDoblete,
      invertColor1,
      invertColor2,
      invertColor3,
      hideAuthor1,
      hideAuthor2,
      hideAuthor3,
      adsSpace,
      adsSpace2,
      adsSpace3,
      multimediaOrientation,
      headerField1,
      headerField2,
      headerField3,
      titleField1,
      titleField2,
      titleField3,
      authorField1,
      authorField2,
      authorField3,
      image1,
      image2,
      image3,
    } = {},
  } = props

  const includedFields = `websites.${arcSite}.website_url,headlines.basic,headlines.mobile,${includePromoItems},${includePromoItemsCaptions},${includeCredits},${includePrimarySection(
    { arcSite }
  )},${includeSections},publish_date,display_date`

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

  const paramsAutomatico1 = getParams(
    dataAutomatico1,
    arcSite,
    contextPath,
    deployment
  )
  const paramsAutomatico2 = getParams(
    dataAutomatico2,
    arcSite,
    contextPath,
    deployment
  )
  const paramsAutomatico3 = getParams(
    dataAutomatico3,
    arcSite,
    contextPath,
    deployment
  )

  /* FIN AUTOMATICO */

  /* MANUAL */
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

  // functions
  const toDate = (dateStr) => {
    const [date, time] = dateStr.split(' ')
    const [day, month, year] = date.split('/')
    return new Date(`${year}/${month}/${day} ${time} GMT-0500`)
  }

  // functions
  const ads = (currentSpace) => {
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

  // AddSpaces
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

  const spaces = {
    getSpace0: getAdsSpace(),
    getSpace1: getAdsSpace2(),
    getSpace2: getAdsSpace3(),
  }

  const invertedColors = {
    getInvertedColor0: invertColor1,
    getInvertedColor1: invertColor2,
    getInvertedColor2: invertColor3,
  }

  const hideAuthors = {
    getHideAuthor0: hideAuthor1,
    getHideAuthor1: hideAuthor2,
    getHideAuthor2: hideAuthor3,
  }

  const headers = {
    getHeader0: headerField1,
    getHeader1: headerField2,
    getHeader2: headerField3,
  }

  const titles = {
    getTitles0: titleField1,
    getTitles1: titleField2,
    getTitles2: titleField3,
  }

  const authors = {
    getAuthor0: authorField1,
    getAuthor1: authorField2,
    getAuthor2: authorField3,
  }

  const images = {
    getImage0: image1,
    getImage1: image2,
    getImage2: image3,
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

  /* ARMAR ARREGLO */

  const getFormatedData = () => [
    paramsAutomatico1,
    paramsAutomatico2,
    paramsAutomatico3,
  ]

  let dataFormatted = getFormatedData()

  if (viewDoblete) {
    dataFormatted = dataFormatted.slice(0, 2)
  }

  return (
    <div role="list" className="triplet-doblete__list">
      {dataFormatted.map((story, i) => (
        <TripleteDobleteCard
          key={`triplet-${story.id}`}
          index={i}
          lines={lines}
          multimediaOrientation={multimediaOrientation}
          adSpace={spaces[`getSpace${i}`]}
          viewDoblete={viewDoblete}
          invertedColor={invertedColors[`getInvertedColor${i}`]}
          hideAuthor={hideAuthors[`getHideAuthor${i}`]}
          websiteLink={story.websiteLink}
          title={titles[`getTitles${i}`] || story.title}
          titleHeader={headers[`getHeader${i}`] || story.titleHeader}
          author={authors[`getAuthor${i}`] || story.author}
          authorLink={story.authorLink}
          multimedia={images[`getImage${i}`] || story.multimedia}
          multimediaType={story.multimediaType}
        />
      ))}
    </div>
  )
}

TripletDoblete.propTypes = {
  customFields,
}

TripletDoblete.label = 'Triplete - Doblete avanzado'
TripletDoblete.static = true

export default TripletDoblete
