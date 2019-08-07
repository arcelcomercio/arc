import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'

import customFields from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'

import Header from './_children/header'
import List from './_children/list'

const classes = {
  lista:
    'stories-l-card bg-white flex flex-col overflow-hidden border-1 border-solid border-base',
}

@Consumer
class StoriesListCard extends PureComponent {
  constructor(props) {
    super(props)
    const {
      arcSite: website,
      customFields: { section, storiesQty },
    } = this.props

    const params = {
      website,
      section,
      excludeSections: '/impresa',
      stories_qty: storiesQty,
    }

    this.fetchContent({
      data: {
        source: 'story-feed-by-section',
        query: params,
        filter: schemaFilter,
      },
    })
  }

  render() {
    const {
      deployment,
      arcSite,
      contextPath,
      editableField,
      isAdmin,
      customFields: {
        titleList,
        urlTitle,
        background,
        seeMore,
        seeMoreurl,
        seeHour,
        seeImageNews,
      },
    } = this.props

    const { data: { content_elements: data = [] } = {} } = this.state || {}

    const paramsHeader = {
      titleList,
      editableField,
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
      listNews: data || [],
    }

    return (
      <div className={classes.lista}>
        <Header {...paramsHeader} />
        <List {...paramsList} />
      </div>
    )
  }
}

StoriesListCard.propTypes = {
  customFields,
}

StoriesListCard.label = 'Último minuto'
StoriesListCard.static = true

export default StoriesListCard
