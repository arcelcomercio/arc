import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'

import schemaFilter from './_dependencies/schema-filter'
import ArticleSeparatorChildItem from './_children/item'
import StoryData from '../../../utilities/story-data'
import UtilListKey from '../../../utilities/list-keys'

const classes = {
  separator: 'articlesep col-3 separator--nota',
  title: 'articlesep__header-title separator__header-title--nota',
  body: 'articlesep__body separator__body--items',
  mvideo: 'articlesep--video',
}

@Consumer
class ArticleSeparator extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      device: this.setDevice(), // TODO: en utilities/resizer hay aun setDevice
      stories: [],
    }
  }

  getSeccionPrimary = dataArticle => {
    const lastSection = '/'
    const splitText = dataArticle.primary_section
      ? lastSection + dataArticle.primary_section.path.slice(1).split('/')[0]
      : '/politica'
    return splitText
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
    const section = this.getSeccionPrimary(globalContent.taxonomy || {})
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
        stories: contentElements || [],
        excluir: websiteUrl,
      })
    })
  }

  // FIXME: Temporal
  handleResize = () => {
    const wsize = window.innerWidth
    const { device, stories } = this.state

    if (wsize >= 840 && device !== 'desktop') {
      this.setState({
        device: 'desktop',
      })
      if (!stories) this.getContentApi()
    }
    if (wsize < 840 && device !== 'mobile')
      this.setState({
        device: 'mobile',
      })
  }

  // FIXME: Temporal
  setDevice = () => {
    const wsize = window.innerWidth
    if (wsize < 840) {
      return 'mobile'
    }
    return 'desktop'
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
    return stories.map((story, i) => {
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
        <ArticleSeparatorChildItem
          data={data}
          key={UtilListKey(i)}
          contextPath={contextPath}
          arcSite={arcSite}
        />
      )
    })
  }

  render() {
    const { stories, excluir, device } = this.state

    if (device === 'mobile') return ''
    return (
      <div className={classes.separator}>
        <div className={classes.body}>{this.renderItems(stories, excluir)}</div>
      </div>
    )
  }
}

ArticleSeparator.label = 'Artículo - separador'

export default ArticleSeparator
