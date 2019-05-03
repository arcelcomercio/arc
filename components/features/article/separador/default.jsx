/* eslint-disable camelcase */
/* eslint-disable react/destructuring-assignment */
import Consumer from 'fusion:consumer'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import filterSchema from './_children/filterschema'
import SeparatorListItem from './_children/item'

const classes = {
  separator: 'articlesep col-3 separator--nota',
  headerHtml: 'articlesep__headerHtml',
  title: 'articlesep__headerTitle separator__headerTitle--nota',
  body: 'articlesep__body separator__body--items',
  mvideo: 'articlesep--video',
}

@Consumer
class Separador extends Component {
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
    let news_number = 7
    const { device } = this.state

    if (device === 'mobile') news_number = 0

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
        news_number,
      },
      filterSchema()
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

    // ------ Set the new state if you change from mobile to desktop
    if (wsize >= 1024 && this.state.device !== 'desktop') {
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
        <h3 className={classes.title}>Más en {nameSeccion}</h3>
        <div className={classes.body}>
          <SeparatorListItem
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

Separador.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  globalContent: PropTypes.object,
}
export default Separador
