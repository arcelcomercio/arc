/* eslint-disable camelcase */
/* eslint-disable react/destructuring-assignment */
import Consumer from 'fusion:consumer'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import filterSchema from './_children/filterschema'
import SeparatorListItem from './_children/item'

const classes = {
  separator: 'separator col-3 separator--nota',
  headerHtml: 'separator__headerHtml',
  title: 'separator__headerTitle separator__headerTitle--nota',
  body: 'separator__body separator__body--items',
  mvideo: 'separator--video',
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
    return (
      dataArticle.taxonomy &&
      dataArticle.taxonomy.primary_section &&
      dataArticle.taxonomy.primary_section.path
    )
  }

  componentDidMount = () => {
    window.addEventListener('resize', this.handleResize)
    this.getContentApi()
  }

  getContentApi = () => {
    let news_number = 7
    const { device } = this.state

    if (device === 'mobile') {
      news_number = 0
    } else {
      news_number = 7
    }

    const { arcSite, globalContent } = this.props
    const section = this.getSeccionPrimary(globalContent || {})
    const { fetched } = this.getContent(
      'stories__by-section',
      {
        website: arcSite,
        section,
        news_number,
      },
      filterSchema()
    )
    fetched.then((response = {}) => {
      // TODO: Comprobar estas validaciones {} y []
      if (!response) {
        // eslint-disable-next-line no-param-reassign
        response = []
        console.log(
          'No hay respuesta del servicio para obtener el listado de noticias'
        )
      }

      if (!response.content_elements) {
        response.content_elements = []
        console.log(
          'No hay respuesta del servicio para obtener el listado de noticias'
        )
      }

      this.setState({
        data: response.content_elements,
        excluir: globalContent.website_url,
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
    const { data, excluir, website, device } = this.state
    // eslint-disable-next-line eqeqeq
    if (device == 'mobile') return ''
    return (
      <div className={classes.separator}>
        <h3 className={classes.title}>Más en Política</h3>
        <div className={classes.body}>
          <SeparatorListItem data={data} excluir={excluir} website={website} />
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
