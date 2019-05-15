import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'

import schemaFilter from './_dependencies/schema-filter'
import ArticleSeparatorChildItem from './_children/item'

const classes = {
  separator: 'articlesep col-3 separator--nota',
  headerHtml: 'articlesep__headerHtml',
  title: 'articlesep__headerTitle separator__headerTitle--nota',
  body: 'articlesep__body separator__body--items',
  mvideo: 'articlesep--video',
}

@Consumer
class ArticleSeparator extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      device: this.setDevice(),

      data: [],
    }
  }

  getSeccionPrimary = dataArticle => {
    return dataArticle.taxonomy
      ? dataArticle.taxonomy.primary_section
      : { name: '', section: '' }
  }

  componentDidMount = () => {
    window.addEventListener('resize', this.handleResize)
    this.getContentApi()
  }

  getContentApi = () => {
    let newsNumber = 7
    const { device } = this.state

    if (device === 'mobile') newsNumber = 0

    const { arcSite, globalContent } = this.props
    const { name, path: section } = this.getSeccionPrimary(globalContent || {})
    this.setState({
      // eslint-disable-next-line react/no-unused-state
      nameSeccion: name,
    })
    const { fetched } = this.getContent(
      'story-feed-by-section',
      {
        website: arcSite,
        section,
        news_number: newsNumber,
      },
      schemaFilter
    )
    fetched.then(response => {
      const { content_elements: contentElements } = response || {}
      const { website_url: websiteUrl = '' } = globalContent || {}

      this.setState({
        data: contentElements || [],
        excluir: websiteUrl,
        website: arcSite,
      })
    })
  }

  handleResize = () => {
    const wsize = window.innerWidth
    const { device } = this.state

    // ------ Set the new state if you change from mobile to desktop
    if (wsize >= 1024 && device !== 'desktop') {
      this.setState({
        device: 'desktop',
      })
      this.getContentApi()
      // ------ Set the new state if you change from desktop to mobile
    } else {
      // ------ Set the new state if you change from desktop to mobile
      this.setState({
        device: 'mobile',
      })
      this.getContentApi()
    }
  }

  setDevice = () => {
    const wsize = window.innerWidth

    if (wsize < 640) {
      return 'mobile'
    }

    return 'desktop'
  }

  render() {
    const { data, excluir, website, device, nameSeccion } = this.state
    const { arcSite } = this.props

    if (device === 'mobile') return ''
    return (
      <div className={classes.separator}>
        <div className={classes.body}>
          <ArticleSeparatorChildItem
            data={data}
            excluir={excluir}
            website={website}
            arcSite={arcSite}
          />
        </div>
      </div>
    )
  }
}

ArticleSeparator.label = 'Artículo - separador'

export default ArticleSeparator
