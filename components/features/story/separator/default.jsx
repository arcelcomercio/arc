import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import withSizes from 'react-sizes'

import { sizeDevice } from '../../separators/_dependencies/functions'
import schemaFilter from './_dependencies/schema-filter'
import StorySeparatorChildItem from './_children/item'
import StoryData from '../../../utilities/story-data'
import UtilListKey from '../../../utilities/list-keys'

const classes = {
  separator: 'story-separator bg-white w-full h-auto separator--nota grid',
  title:
    'story-separator__header-title separator__header-title--nota grid text-center pb-20 pt-20',
  body: 'story-separator__body separator__body--items',
  mvideo: 'story-separator--video',
}

@withSizes(({ width }) => sizeDevice(width))
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
        source: 'story-feed-by-section',
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
          multimedia: instance.multimedia,
          multimediaType: instance.multimediaType,
        }
        return (
          <StorySeparatorChildItem
            data={data}
            key={UtilListKey(i)}
            contextPath={contextPath}
            arcSite={arcSite}
          />
        )
      })
    )
  }

  render() {
    const { dataApi: { content_elements: stories } = {} } = this.state
    const { globalContent, isMobile } = this.props
    const { website_url: excluir } = globalContent || {}
    return (
      !isMobile && (
        <div className={classes.separator}>
          <div className={classes.body}>
            {this.renderItems(stories, excluir)}
          </div>
        </div>
      )
    )
  }
}

StorySeparator.label = 'Separador de artículo'
StorySeparator.static = true

export default StorySeparator
