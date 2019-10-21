import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import { customFields } from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'
import { createMarkup } from '../../../utilities/helpers'
import StoryData from '../../../utilities/story-data'
import AuthorCard from './_children/author-card'

const classes = {
  separator: 'separator__opinion bg-white pt-10 pb-10 pr-10 pl-10',
  opinionBody: 'separator__opinion--body mt-0 mb-0 ',
  opinionTitle:
    'separator__opinion-title uppercase title-md pt-15 pb-25 pr-20 pl-20 text-black',
  colorText: 'text-white',
}

const HeaderHTML = ({ htmlCode }) => {
  return (
    <div
      className={classes.opinionTitle}
      dangerouslySetInnerHTML={createMarkup(htmlCode)}
    />
  )
}

@Consumer
class SeparatorOpinion extends PureComponent {
  constructor(props) {
    super(props)
    this.fetchDataApi()
  }

  listAuthorCard = (data, arcSite) => {
    return (
      data &&
      data.map(info => (
        <AuthorCard key={info.id} data={info} arcSite={arcSite} />
      ))
    )
  }

  fetchDataApi = (storiesQty = 5) => {
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

  processDataApi = (data, deployment, contextPath, arcSite) => {
    const { content_elements: dataElements = [] } = data || {}
    const dataFormat = new StoryData({
      deployment,
      contextPath,
      arcSite,
    })
    const newData = []
    const dataTemp = {}
    for (let i = 0; i < dataElements.length; i++) {
      const { credits: { by = [] } = {} } = dataElements[i] || {}
      const { image: { resized_urls: { square_s: squareS = '' } = {} } = {} } =
        by[0] || {}
      dataFormat.__data = dataElements[i]
      dataTemp.id = dataFormat.id
      dataTemp.author = dataFormat.author
      dataTemp.authorUrl = dataFormat.authorLink
      dataTemp.titulo = dataFormat.title
      dataTemp.section = dataFormat.primarySection
      dataTemp.sectionUrl = dataFormat.primarySectionLink
      dataTemp.websiteUrl = dataFormat.link
      dataTemp.imageUrl = squareS || dataFormat.authorImage
      newData.push({ ...dataTemp })
    }
    return newData
  }

  render() {
    const { dataApi = {} } = this.state
    const {
      arcSite,
      customFields: { titleSection, htmlCode, section },
    } = this.props
    const data = dataApi && Object.values(dataApi)
    return (
      <div className={classes.separator}>
        {titleSection ? (
          <div className={classes.opinionTitle}>
            <a href={section} className={classes.colorText}>
              {titleSection}
            </a>
          </div>
        ) : (
          <HeaderHTML htmlCode={htmlCode} />
        )}
        <div className={classes.opinionBody}>
          {data && this.listAuthorCard(data, arcSite)}
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
