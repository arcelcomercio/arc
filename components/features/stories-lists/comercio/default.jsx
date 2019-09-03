import React from 'react'

import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import customFields from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'

import Header from './_children/header'
import List from './_children/list'

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
      
      seeHour,
      seeImageNews,
    },
  } = props

  const params = {
    section,
    excludeSections: '/impresa',
    stories_qty: storiesQty,
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
    </div>
  )
}

StoriesListCard.propTypes = {
  customFields,
}

StoriesListCard.label = 'Noticias por sección'
StoriesListCard.static = true

export default StoriesListCard
