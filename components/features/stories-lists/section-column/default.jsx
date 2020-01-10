import React from 'react'

import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import customFields from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'

import Header from './_children/header'
import List from './_children/list'
import {
  includePromoItems,
  includeCredits,
} from '../../../utilities/included-fields'

const classes = {
  lista: 'stories-l-section bg-white flex flex-col',
}

const newsNumber = 4

const SectionColumnListCard = props => {
  const { arcSite, contextPath, deployment, isAdmin } = useFusionContext()
  const {
    customFields: { section, titleList, urlTitle, background },
  } = props

  const params = {
    section,
    excludeSections: '/impresa',
    stories_qty: newsNumber,
    presets: 'landscape_md:314x157',
    includedFields: `websites.${arcSite}.website_url,_id,headlines.basic,display_date,publish_date,${includePromoItems},${includeCredits}`,
  }
  const data =
    useContent({
      source: 'story-feed-by-section',
      query: params,
      filter: schemaFilter(arcSite),
    }) || {}

  const paramsHeader = {
    titleList,
    urlTitle,
    background,
  }

  const paramsList = {
    deployment,
    arcSite,
    contextPath,
    isAdmin,
    listNews: data.content_elements || [],
  }

  return (
    <div className={classes.lista}>
      <Header {...paramsHeader} />
      <List {...paramsList} />
    </div>
  )
}

SectionColumnListCard.propTypes = {
  customFields,
}

SectionColumnListCard.label = 'Noticias por sección'
SectionColumnListCard.static = true

export default SectionColumnListCard
