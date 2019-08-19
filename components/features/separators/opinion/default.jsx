import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import withSizes from 'react-sizes'

import { customFields } from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'
import { getStoriesQty, sizeDevice } from '../_dependencies/functions'
import { createMarkup } from '../../../utilities/helpers'
import StoryData from '../../../utilities/story-data'
import AuthorCard from './_children/author-card'

const classes = {
  separator: 'separator__opinion bg-white pt-10 pb-10 pr-10 pl-10',
  opinionBody: 'separator__opinion--body mt-0 mb-0 ',
  opinionTitle:
    'separator__opinion-title uppercase title-md pt-15 pb-25 pr-20 pl-20 text-black',
}

const HeaderHTML = ({ htmlCode }) => {
  return (
    <div
      className={classes.opinionTitle}
      dangerouslySetInnerHTML={createMarkup(htmlCode)}
    />
  )
}

@withSizes(({ width }) => sizeDevice(width))
@Consumer
class SeparatorOpinion extends PureComponent {
  constructor(props) {
    super(props)
    const { isMobile, isTablet } = this.props
    this.fetchDataApi(getStoriesQty(isMobile, isTablet))
  }

  listAuthorCard = (data, arcSite) => {
    return (
      data &&
      data.map(info => (
        <AuthorCard key={info.id} data={info} arcSite={arcSite} />
      ))
    )
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
          website: arcSite,
          stories_qty: storiesQty,
          section,
        },
        filter: schemaFilter(),
        transform: data => {
          return this.processDataApi(data, deployment, contextPath, arcSite)
        },
      },
    })
  }

  processDataApi = (data, deployment, contextPath, arcSite, numStory) => {
    const { content_elements: dataElements = [] } = data || {}
    const dataFormat = new StoryData({
      deployment,
      contextPath,
      arcSite,
    })
    const newData = []
    const dataTemp = {}
    for (let i = 0; i < dataElements.length; i++) {
      if (i >= numStory) break
      dataFormat.__data = dataElements[i]
      dataTemp.id = dataFormat.id
      dataTemp.author = dataFormat.author
      dataTemp.authorUrl = dataFormat.authorLink
      dataTemp.titulo = dataFormat.title
      dataTemp.section = dataFormat.primarySection
      dataTemp.sectionUrl = dataFormat.primarySectionLink
      dataTemp.websiteUrl = dataFormat.link
      dataTemp.imageUrl = dataFormat.authorImage
      newData.push({ ...dataTemp })
    }
    return newData
  }

  render() {
    const { dataApi = {} } = this.state
    const {
      arcSite,
      isMobile,
      isTablet,
      customFields: { titleSection, htmlCode },
    } = this.props
    let data = dataApi && Object.values(dataApi)
    const numStory = 5 // getStoriesQty(isMobile, isTablet)
    data = data.slice(0, numStory)
    return (
      <div className={classes.separator}>
        {titleSection ? (
          <div className={classes.opinionTitle}>{titleSection}</div>
        ) : (
          <HeaderHTML htmlCode={htmlCode} />
        )}
        <div className={classes.opinionBody}>
          {data && this.listAuthorCard(data, arcSite, numStory)}
        </div>
      </div>
    )
  }
}

SeparatorOpinion.propTypes = {
  customFields,
}

SeparatorOpinion.label = 'Separador - Opinión'

export default SeparatorOpinion
