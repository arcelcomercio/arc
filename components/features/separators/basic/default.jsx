import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'

import schemaFilter from './_dependencies/schema-filter'
import customFields from './_dependencies/custom-fields'
import SeparatorList from './_children/separator'
import StoryData from '../../../utilities/story-data'

const STORIES_QTY_DEFAULT = 4
const CONTENT_SOURCE = 'story-feed-by-section'
const DEFAULT_TITLE = 'Últimas noticias'

@Consumer
class SeparatorBasic extends PureComponent {
  constructor(props) {
    super(props)
    this.fetchDataApi(STORIES_QTY_DEFAULT)
  }

  fetchDataApi = storiesQty => {
    const {
      arcSite,
      deployment,
      contextPath,
      customFields: { section = '' },
    } = this.props
    this.fetchContent({
      dataApi: {
        source: CONTENT_SOURCE,
        query: {
          section,
          stories_qty: storiesQty,
        },
        filter: schemaFilter,
        transform: data => {
          return this.processDataApi(
            data,
            deployment,
            contextPath,
            arcSite,
            storiesQty
          )
        },
      },
    })
  }

  processDataApi = (data, deployment, contextPath, arcSite, numStory) => {
    const {
      content_elements: dataElements = [],
      section_name: sectionName = '',
    } = data || {}
    const dataFormat = new StoryData({
      deployment,
      contextPath,
      arcSite,
    })
    const newData = []
    if (dataElements.length > 0) {
      for (let i = 0; i < numStory; i++) {
        dataFormat.__data = dataElements[i]
        newData.push({ ...dataFormat.attributesRaw })
      }
    }
    return { data: newData, sectionName }
  }

  getDataComponent = () => {
    const {
      dataApi: { data, sectionName },
    } = this.state
    const {
      arcSite,
      // isMobile,
      // isTablet,
      customFields: { titleSeparator, titleLink, htmlCode },
    } = this.props
    const title = titleSeparator || sectionName || DEFAULT_TITLE
    const items = Object.values(data)
    // const items = values.slice(0, getStoriesQty(isMobile, isTablet, 4, 4, 1))
    return { titleSeparator: title, arcSite, titleLink, htmlCode, items }
  }

  render() {
    const { editableField, isAdmin } = this.props

    return (
      <SeparatorList
        data={this.getDataComponent()}
        {...{ editableField, isAdmin }}
      />
    )
  }
}

SeparatorBasic.propTypes = {
  customFields,
}

SeparatorBasic.label = 'Separador Básico'
SeparatorBasic.static = true

export default SeparatorBasic
