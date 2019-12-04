import React from 'react'

import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import customFields from './_dependencies/custom-fields'

import Header from './_children/header'
import List from './_children/list'
import SeeMore from './_children/see-more'
import FreeHtml from './_children/free-html'

const classes = {
  lista:
    'stories-l-card bg-white flex flex-col justify-between overflow-hidden',
  containerList: 'most-read-homologated-card__container-list',
}

const MostReadHomologated = props => {
  const { arcSite, contextPath, deployment, isAdmin } = useFusionContext()
  const {
    customFields: {
      titleList,
      urlTitle,
      amountStories,
      background,
      seeMore,
      seeMoreurl,
      storyNumber,
      seeImageNews,
      freeHTML,
      isPremium
    },
  } = props
  const { content_elements: contentElements } =
    useContent({
      source: 'get-most-read-story',
      query: {
        amountStories,
        isPremium: isPremium === true ? 1 : 0
      },
    }) || []

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
    listNews: contentElements || [],
  }

  return (
      <div className={classes.lista}>
        <div className={seeMore || freeHTML ? classes.containerList : 'h-full pb-15'}>
          <Header {...paramsHeader} />
          <List {...paramsList} />
          {seeMore && <SeeMore {...{ seeMore, seeMoreurl}} />}
          {typeof freeHTML === 'string' && <FreeHtml {...{freeHTML}} /> }
        </div>
      </div>
  )
}

MostReadHomologated.propTypes = {
  customFields,
}

MostReadHomologated.label = 'Más Leidas Homologated'
MostReadHomologated.static = true

export default MostReadHomologated
