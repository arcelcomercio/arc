import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'

import schemaFilter from './_dependencies/schema-filter'
import StorySeparatorChildItem from './_children/item'
import StoryData from '../../../utilities/story-data'
import UtilListKey from '../../../utilities/list-keys'

const classes = {
  separator: 'story-separator block non-tablet non-mobile w-full h-auto',
  body: 'story-separator__body flex mt-0 mb-0 pt-20 pb-20 pr-0 pl-0',
}

const CONTENT_SOURCE = 'story-feed-by-section'

@Consumer
class StorySeparator extends PureComponent {
  constructor(props) {
    super(props)
    const { arcSite, globalContent } = props
    const { taxonomy: { primary_section: { path: section } = {} } = {} } =
      globalContent || {}

    this.fetchDataApi(arcSite, section, 7)
  }

  fetchDataApi = (arcSite, section, storiesQty) => {
    this.fetchContent({
      dataApi: {
        source: CONTENT_SOURCE,
        query: {
          website: arcSite,
          section,
          stories_qty: storiesQty,
        },
        filter: schemaFilter,
      },
    })
  }

  renderItems(stories, excluir) {
    const { deployment, contextPath, arcSite } = this.props
    const instance = new StoryData({
      deployment,
      contextPath,
      arcSite,
      defaultImgSize: 'sm',
    })

    let key = 0
    return (
      stories &&
      stories.map((story, i) => {
        if (key === 4) return false
        const { website_url: websiteUrl } = story
        if (websiteUrl === excluir) return false
        instance.__data = story
        key += 1

        const data = {
          title: instance.title,
          link: instance.link,
          section: instance.primarySection,
          sectionLink: instance.primarySectionLink,
          multimediaPortraitXS: instance.multimediaPortraitXS,
          multimediaType: instance.multimediaType,
        }
        return (
          <StorySeparatorChildItem
            data={data}
            key={UtilListKey(i)}
            arcSite={arcSite}
          />
        )
      })
    )
  }

  render() {
    const { dataApi: { content_elements: stories } = {} } = this.state
    const { globalContent } = this.props
    const { website_url: excluir } = globalContent || {}
    return (
      <div className={classes.separator}>
        <div className={classes.body}>{this.renderItems(stories, excluir)}</div>
      </div>
    )
  }
}

StorySeparator.label = 'Separador de artículo'
StorySeparator.static = true

export default StorySeparator
