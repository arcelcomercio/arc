import React from 'react'

import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import customFields from './_dependencies/custom-fields'

import Header from './_children/header'
import List from './_children/list'
import Footer from './_children/footer'

const classes = {
  lista:
    'stories-l-card bg-white flex flex-col justify-between overflow-hidden border-1 border-solid border-base',
}

const MostReadPremium = props => {
  const { arcSite, contextPath, deployment, isAdmin } = useFusionContext()
  const {
    customFields: {
      titleList,
      urlTitle,
      background,
      seeMore,
      seeMoreurl,
      storyNumber,
      seeImageNews,
    },
  } = props
  const resp =
    useContent({
      source: 'get-most-related-premiun',
    }) || {}

  const paramsHeader = {
    titleList,
    urlTitle,
    background,
    seeMore,
    seeMoreurl,
  }

  const paramsList = {
    storyNumber,
    seeImageNews,
    deployment,
    arcSite,
    contextPath,
    isAdmin,
    listNews: resp || [],
  }

  return (
    <div className={classes.lista}>
      <div>
        <Header {...paramsHeader} />
        <List {...paramsList} />
      </div>
      {seeMore && <Footer {...{ seeMore, seeMoreurl }} />}
    </div>
  )
}

MostReadPremium.propTypes = {
  customFields,
}

MostReadPremium.label = 'Mas Leidas Premium'
// MostReadPremium.static = true

export default MostReadPremium
