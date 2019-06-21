import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'

import customFields from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'

import Header from './_children/header'
import List from './_children/list'

const classes = {
  lista: 'stories-l-card bg-white h-full flex flex-col overflow-hidden',
}

@Consumer
class StoriesListCard extends PureComponent {
  constructor(props) {
    super(props)
    const {
      customFields: {
        titleList,
        urlTitle,
        storiesQty,
        seeMore,
        seeMoreurl,
        seeHour,
        seeImageNews,
        section, // cambiará
        background = '',
      },
    } = props || {}

    this.state = {
      titleList,
      urlTitle,
      background,
      storiesQty,
      seeMore,
      seeMoreurl,
      seeHour,
      seeImageNews,
      section, // cambiará
      data: [],
    }
  }

  componentDidMount = () => {
    const { section, storiesQty } = this.state
    const { arcSite: website } = this.props

    const { fetched } = this.getContent(
      'story-feed-by-section',
      {
        website,
        section,
        stories_qty: storiesQty,
      },
      schemaFilter
    )
    fetched.then(response => {
      const { content_elements: contentElements } = response || {}

      this.setState({
        data: contentElements || [],
      })
    })
  }

  render() {
    const { deployment, arcSite, contextPath } = this.props

    const {
      titleList,
      urlTitle,
      background,
      seeMore,
      seeMoreurl,
      seeHour,
      seeImageNews,
      data,
    } = this.state

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

StoriesListCard.label = 'Lista de noticias'

export default StoriesListCard
