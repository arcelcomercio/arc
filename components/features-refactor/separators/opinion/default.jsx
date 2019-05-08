import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'

import { customFields } from './_dependencies/custom-fields'
import DataStory from '../../../../resources/components/utils/data-story'
import AuthorCard from './_children/author-card'

const classes = {
  separator: 'separator__opinion',
  opinionBody: 'separator__opinion--body',
  opinionTitle: 'separator__opinion-title',
}

const createMarkup = html => {
  return { __html: html }
}

const HeaderHTML = ({ htmlCode }) => {
  return (
    <div
      className={classes.opinionTitle}
      dangerouslySetInnerHTML={createMarkup(htmlCode)}
    />
  )
}

const schemaFilter = `
{
  content_elements{
    _id
    website_url
    taxonomy{
      sections{
        type
        path
        name
      }
    }
    credits{
      by{
        type
        name
        url
        image{
          url
        }
      }
    }
    headlines{
      basic
    }
  }
}
`

@Consumer
class SeparatorOpinion extends PureComponent {
  constructor(props) {
    super(props)

    const {
      arcSite,
      customFields: { section = '', titleSection = '', htmlCode = '' } = {},
    } = props

    this.state = {
      device: this.setDevice(),
      section,
      titleSection,
      arcSite,
      htmlCode,
      data: [],
    }
  }

  componentDidMount = () => {
    window.addEventListener('resize', this.handleResize) // Temporal
    this.getContentApi()
  }

  getContentApi = () => {
    let newsNumber = 5
    const { device } = this.state

    if (device === 'mobile') {
      newsNumber = 1
    } else if (device === 'tablet') {
      newsNumber = 3
    }

    const { arcSite } = this.props

    const { section } = this.state

    const { fetched } = this.getContent(
      'story-feed-by-section',
      {
        website: arcSite,
        news_number: newsNumber,
        section,
      },
      schemaFilter
    )
    fetched.then(({ content_elements: contentElements = [] } = {}) => {
      const newDatos = []
      const nObj = {}
      for (let i = 0; i < newsNumber; i++) {
        const dh = new DataStory(contentElements[i], arcSite)

        nObj.id = dh.id
        nObj.author = dh.author
        nObj.authorUrl = dh.authorLink
        nObj.titulo = dh.title
        nObj.seccion = dh.section
        nObj.seccionUrl = dh.sectionLink
        nObj.websiteUrl = dh.link
        nObj.imageUrl = dh.authorImage
        newDatos.push({ ...nObj })
      }
      this.setState({
        data: newDatos,
      })
    })
  }

  handleResize = () => {
    const wsize = window.innerWidth
    const { device } = this.state
    if (wsize >= 1024 && device !== 'desktop') {
      this.setState({
        device: 'desktop',
      })
      this.getContentApi()
    } else if (wsize >= 640 && wsize < 1024 && device !== 'tablet') {
      this.setState({
        device: 'tablet',
      })
      this.getContentApi()
    } else if (wsize < 640 && device !== 'mobile') {
      this.setState({
        device: 'mobile',
      })
      this.getContentApi()
    }
  }

  setDevice = () => {
    const wsize = window.innerWidth

    if (wsize < 640) return 'mobile'
    if (wsize >= 640 && wsize < 1024) return 'tablet'
    return 'desktop'
  }

  listado = () => {
    const { data, arcSite } = this.state
    return data.map(info => (
      <AuthorCard key={info.id} data={info} arcSite={arcSite} />
    ))
  }

  render() {
    const { titleSection, htmlCode, data } = this.state

    return (
      <div className={classes.separator}>
        {titleSection ? (
          <div className={classes.opinionTitle}>{titleSection}</div>
        ) : (
          <HeaderHTML htmlCode={htmlCode} />
        )}
        <div className={classes.opinionBody}>{data[0] && this.listado()}</div>
      </div>
    )
  }
}

SeparatorOpinion.propTypes = {
  customFields,
}

SeparatorOpinion.label = 'Separador - Opinión'

export default SeparatorOpinion
