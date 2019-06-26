import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import withSizes from 'react-sizes'

import schemaFilter from './_dependencies/schema-filter'
import customFields from './_dependencies/custom-fields'
import SeparatorList from './_children/separator'
import { getStoriesQty, sizeDevice } from '../_dependencies/functions'
import StoryData from '../../../utilities/story-data'

@withSizes(({ width }) => sizeDevice(width))
@Consumer
class SeparatorBasic extends PureComponent {
  constructor(props) {
    super(props)
    const { isMobile, isTablet } = props
    this.fetchDataApi(getStoriesQty(isMobile, isTablet, 4, 4, 1))
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
        source: 'story-feed-by-section',
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
      isMobile,
      isTablet,
      customFields: { titleSeparator, titleLink, htmlCode },
    } = this.props
    const title = titleSeparator || sectionName || 'Últimas noticias'
    const values = Object.values(data)
    const items = values.slice(0, getStoriesQty(isMobile, isTablet, 4, 4, 1))
    return { titleSeparator: title, arcSite, titleLink, htmlCode, items }
  }

  render() {
    const { editableField } = this.props

    return (
      <SeparatorList
        data={this.getDataComponent()}
        editableField={editableField}
      />
    )
  }
}

SeparatorBasic.propTypes = {
  customFields,
}
SeparatorBasic.label = 'Separador Básico'

export default SeparatorBasic
