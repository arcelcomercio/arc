import React from 'react'

import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import FeaturedOpening from './_children/feature-opening'
import customFields from './_dependencies/custom-fields'
import { schemaNote, schemaURL } from './_dependencies/schema-filter'
import StoryData from '../../../utilities/story-data'

const CardFeaturedOpening = props => {
  const {
    arcSite,
    contextPath,
    deployment,
    siteProperties,
  } = useFusionContext()

  const {
    assets: {
      premium: { logo },
    },
  } = siteProperties || {}

  const { customFields: { url, customTitle, note1, note2 } = {} } = props

  const data =
    useContent({
      source: 'story-by-url',
      query: {
        website_url: url,
      },
      filter: schemaNote(arcSite),
    }) || {}

  const getNote1 =
    (note1 &&
      useContent({
        source: 'story-by-url',
        query: {
          website_url: note1,
        },
        filter: schemaURL(),
      })) ||
    {}

  const getNote2 =
    (note2 &&
      useContent({
        source: 'story-by-url',
        query: {
          website_url: note2,
        },
        filter: schemaURL(),
      })) ||
    {}

  const getData = (dt = {}) => {
    const title = (dt.headlines && dt.headlines.basic) || ''
    const link = dt.website_url || ''
    return [title, link]
  }

  const [note1Title, note1Link] = getData(getNote1)
  const [note2Title, note2Link] = getData(getNote2)

  const {
    isPremium,
    websiteLink,
    title,
    subTitle,
    author,
    authorLink,
    primarySectionLink,
    primarySection,
  } = new StoryData({
    data,
    arcSite,
    contextPath,
    deployment,
    defaultImgSize: 'sm',
  })

  const params = {
    isPremium,
    websiteLink,
    title,
    subTitle,
    author,
    authorLink,
    primarySectionLink,
    primarySection,
    customTitle,
    note1Title,
    note1Link,
    note2Title,
    note2Link,
    logo: deployment(`${contextPath}/resources/dist/${arcSite}/images/${logo}`),
  }

  return <FeaturedOpening {...params} />
}

CardFeaturedOpening.propTypes = {
  customFields,
}

CardFeaturedOpening.label = 'Destaque Apertura'
CardFeaturedOpening.static = true
export default CardFeaturedOpening
