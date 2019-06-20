import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import withSizes from 'react-sizes'

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

@withSizes(({ width }) => ({ isMobile: width < 640 }))
@Consumer
class StorySeparator extends PureComponent {
  constructor(props) {
    super(props)
    const { arcSite: website, globalContent } = props
    const { taxonomy: { primary_section: { path: section } = {} } = {} } =
      globalContent || {}

    this.fetchContent({
      data: {
        source: 'story-feed-by-section',
        query: {
          website,
          section,
          stories_qty: 7,
        },
        filter: schemaFilter,
      },
    })
  }

  /* getSeccionPrimary = dataArticle => {
    const lastSection = '/'
    const splitText = dataArticle
      ? lastSection + dataArticle.path.slice(1).split('/')[0]
      : '/politica'
    return splitText
  } */

  /*   componentDidMount = () => {
    window.addEventListener('resize', this.handleResize)
    this.getContentApi()
  } */

  /*   getContentApi = () => {
    let storiesQty = 7
    const { device } = this.state

    if (device === 'mobile') storiesQty = 0

    const { arcSite, globalContent } = this.props
    const section = this.getSeccionPrimary(globalContent.taxonomy || {})
    const { fetched } = this.getContent(
      'story-feed-by-section',
      {
        website: arcSite,
        section,
        stories_qty: storiesQty,
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
  } */

  // FIXME: Temporal
  /*   handleResize = () => {
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
  } */

  renderItems(stories, excluir) {
    const { deployment, contextPath, arcSite } = this.props
    const instance = new StoryData({
      deployment,
      contextPath,
      arcSite,
      defaultImgSize: 'sm',
    })

    let key = 0
    return stories && stories.map((story, i) => {
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
  }

  render() {
    const { data: { content_elements: stories } = {} } = this.state
    const { globalContent, isMobile } = this.props
    const { website_url: excluir } = globalContent || {}

    return isMobile ? (
      ''
    ) : (
      <div className={classes.separator}>
        <div className={classes.body}>{this.renderItems(stories, excluir)}</div>
      </div>
    )
  }
}

StorySeparator.label = 'Separador de artículo'

export default StorySeparator
