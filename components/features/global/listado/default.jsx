import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'

import customFields from './_children/customFields'
import schemaFilter from './_children/schemaFilter'

import StoriesListCardHeader from './_children/stories-list-card-header'
import ListItemNews from './_children/ListItemNews'

const classes = {
  lista: 'list flex flex--column overflow-hidden',
}

@Consumer
class Lista extends PureComponent {
  constructor(props) {
    super(props)
    const {
      customFields: {
        titleList,
        urlTitle,
        newsNumber,
        seeMore,
        seeMoreurl,
        seeHour,
        seeImageNews,
        section,
        background = '',
      },
    } = this.props || {}

    this.state = {
      titleList,
      urlTitle,
      background,
      newsNumber,
      seeMore,
      seeMoreurl,
      seeHour,
      seeImageNews,
      section,
      data: [],
    }
  }

  componentDidMount = () => {
    const { section, newsNumber } = this.state
    const { arcSite: website } = this.props

    const { fetched } = this.getContent(
      'story-feed-by-section',
      {
        website,
        section,
        news_number: newsNumber,
      },
      schemaFilter()
    )
    fetched.then(response => {
      const { content_elements: contentElements } = response || {}

      this.setState({
        data: contentElements || [],
      })
    })
  }

  render() {
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

    return (
      <div className={classes.lista}>
        <StoriesListCardHeader
          titleList={titleList}
          urlTitle={urlTitle}
          background={background}
          seeMore={seeMore}
          seeMoreurl={seeMoreurl}
        />
        <ListItemNews
          seeHour={seeHour}
          seeImageNews={seeImageNews}
          listNews={data || []}
        />
      </div>
    )
  }
}

Lista.propTypes = {
  customFields,
}

export default Lista
