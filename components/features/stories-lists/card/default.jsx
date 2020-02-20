import React from 'react'

import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import customFields from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'

import Header from './_children/header'
import List from './_children/list'
import Footer from './_children/footer'
import { includePromoItems } from '../../../utilities/included-fields'

const classes = {
  lista:
    'stories-l-card bg-white flex flex-col overflow-hidden border-1 border-solid border-base',
}

const StoriesListCard = props => {
  const { arcSite, contextPath, deployment, isAdmin } = useFusionContext()
  const {
    customFields: {
      section,
      storiesQty,
      titleList,
      urlTitle,
      background,
      seeMore,
      seeMoreurl,
      seeHour,
      seeImageNews,
    },
  } = props

  const params = {
    section,
    excludeSections: '/impresa',
    stories_qty: storiesQty,
    presets: 'landscape_md:314x157',
    includedFields: seeImageNews
      ? `websites.${arcSite}.website_url,headlines.basic,display_date,${includePromoItems}`
      : `websites.${arcSite}.website_url,headlines.basic,display_date`,
  }
  const data =
    useContent({
      source: 'story-feed-by-section',
      query: params,
      filter: schemaFilter(arcSite, seeImageNews),
    }) || {}

  const paramsHeader = {
    titleList,
    urlTitle,
    background,
    seeMore,
    seeMoreurl,
  }

  const paramsList = {
    seeHour,
    seeImageNews,
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
      <Footer {...{ seeMore, seeMoreurl }} />
    </div>
  )
}

StoriesListCard.propTypes = {
  customFields,
}

StoriesListCard.label = 'Último minuto'
StoriesListCard.static = true

export default StoriesListCard
