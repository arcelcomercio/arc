import React, { Component, Fragment } from 'react'
import Consumer from 'fusion:consumer'
import { customFields } from './children/customfields'
import { OpinionTitle } from './children/opinion-title'
import ListOpinion from './children/opinion-list'

@Consumer
class SeparadorOpinion extends Component {
  constructor(props) {
    super(props)

    const {
      customFields: { urlSection, titleSection },
    } = this.props || {}

    this.state = {
      device: this.setDevice(),
      urlSection,
      titleSection,
      defaultSectionName: 'separador opinion  - este es el titulo por defecto',
      data: [
        { title: 'titulo de prueba #1' },
        { title: 'titulo de prueba #2' },
      ],
    }
  }

  componentDidMount = () => {
    window.addEventListener('resize', this.handleResize)
    this.getContentApi()
  }

  filterSchema = () => {
    return `
    {
      content_elements{
        canonical_url
        website_url
        promo_items{
          basic{
            url
          }
        }
        headlines{
          basic
        }
      }
    }
    `
  }

  getContentApi = () => {
    let news_number = 4
    const { device } = this.state

    if (device === 'mobile') {
      news_number = 1
    } else if (device === 'desktop') {
      news_number = 4
    }

    const { arcSite } = this.props
    const { urlSection } = this.state

    const { fetched } = this.getContent(
      'stories__by-section',
      {
        website: arcSite,
        urlSection,
        news_number,
      },
      this.filterSchema()
    )
    fetched.then(response => {
      if (!response) {
        // eslint-disable-next-line no-param-reassign
        response = []
        console.log(
          'No hay respuesta del servicio para obtener el listado de noticias'
        )
      }

      if (!response.content_elements) {
        response.content_elements = []
        console.log('Hay respuesta del servicio pero no contiene data')
      }

      this.setState({
        data: response.content_elements,
      })
    })
  }

  handleResize = () => {
    const wsize = window.innerWidth
    // change1080 by 640
    // ------ Set the new state if you change from mobile to desktop
    if (wsize >= 640 && this.state.device !== 'desktop') {
      this.setState({
        device: 'desktop',
      })
      this.getContentApi()
      // ------ Set the new state if you change from desktop to mobile
    } else if (wsize < 640 && this.state.device !== 'mobile') {
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

  listado = data => {
    const resultado = data.map(alias => {
      return <li>{alias.title}</li>
    })
    return resultado
  }

  render() {
    const { urlSection, titleSection, defaultSectionName, data } = this.state

    return (
      <div>
        <h5>
          {titleSection ? (
            <OpinionTitle titleSection={titleSection} />
          ) : (
            defaultSectionName
          )}
        </h5>
        {/* <ListOpinion data={data} /> */}
        {/* <p>lista de opiniones</p> */}
        <ul>{data[0] && this.listado(data)}</ul>
      </div>
    )
  }
}

SeparadorOpinion.propTypes = {
  customFields,
}

export default SeparadorOpinion
