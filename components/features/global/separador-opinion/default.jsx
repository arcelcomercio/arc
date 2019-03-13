import React, { Component, Fragment } from 'react'
import Consumer from 'fusion:consumer'
import { customFields } from './children/customfields'
//import OpinionItem from './children/opinion-item'
import ListOpinion from './children/opinion-list'

import { GetMultimediaContent } from './../../../../resources/utilsJs/utilities'

// 01 evaluar las clases
const classes = {
  separator: 'separator',
  headerHtml: 'separator__headerHtml',
  title: 'separator__headerTitle',
  body: 'separator__body',
  item: 'separator__item',
  detail: 'separator__detail',
  separatorTitle: 'separator__title',
  mvideo: 'separator--video',
  separadorTitleOpinion: 'separador__headerTitle-opinion',
  opinionItem: 'opinion-item',
  opinionItemImage: 'opinion-item-image'
}

const createMarkup = html => {
  return { __html: html }
}

const HeaderHTML = ({ htmlCode }) => {
  return (
    <div
      className={classes.title}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={createMarkup(htmlCode)}
    />
  )
}

const OpinionItem = props => {
  return (
    <div className={classes.opinionItem}>
      <article>
        <div className="item-detail">
          <h3 className="item-detail__column">
            <a href="#">{props.section}!!!</a>
          </h3>
          <span className="item-detail__author">
            {/* <a href="#">{props.author}</a> */}
          </span>
          <p className="item-detail__summary">
            <a href="#">{props.basic}</a>
          </p>
        </div>
        <figure className={classes.opinionItemImage}>
          <a href="#">
            <img src={props.imagen} alt="imagen aqui" />
          </a>
        </figure>
      </article>
    </div>
  )
}

@Consumer
class SeparadorOpinion extends Component {
  constructor(props) {
    super(props)

    const {
      customFields: { section, titleSection, htmlCode },
    } = this.props || {}

    this.state = {
      device: this.setDevice(),
      section,
      titleSection,
      htmlCode,
      data: [],
    }
  }

  componentDidMount = () => {
    window.addEventListener('resize', this.handleResize)
    this.getContentApi()
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
    console.log(`arcSite: ${arcSite}`)

    const { section } = this.state
    console.log(`Section --> ${section}`)
    console.log(`newsNumber --> ${news_number}`)

    const { fetched } = this.getContent(
      'stories__by-section',
      {
        website: arcSite,
        news_number,
        section,
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
        console.log(
          'No hay respuesta del servicio para obtener el listado de noticias'
        )
      }

      this.setState({
        data: response.content_elements,
      })

      console.log(response)
    })
  }

  handleResize = () => {
    const wsize = window.innerWidth
    if (wsize >= 1024 && this.state.device !== 'desktop') {
      this.setState({
        device: 'desktop',
      })
      this.getContentApi()
    } else if (wsize < 640 && this.state.device !== 'mobile') {
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

  filterSchema = () => {
    return `
    {
      content_elements{
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
  }

  listado = () => {
    const { data } = this.state
    const listOpinion = data.map(data => {
      return (
        <OpinionItem
          // author={
          //   data.credits.by.some(alias => alias.type == 'author') &&
          //   data.credits.by[0].name
          // }
          basic={data.headlines.basic}
          websiteUrl={data.website_url}
          section={
            data.taxonomy.sections.some(alias => alias.type === 'section') &&
            data.taxonomy.sections[0].name
          }
          // imagen={
          //   data.credits.by.some(credit => credit.type === 'author') &&
          //   data.credits.by[0].url
          // }
        />
      )
    })
    return listOpinion
  }

  render() {
    const { titleSection, htmlCode, data } = this.state

    return (
      <div className={classes.separator}>
        {titleSection ? (
          <h1 className={classes.title classes.separadorTitleOpinion}>
            <a href="#">{titleSection}</a>
          </h1>
        ) : (
          <HeaderHTML htmlCode={htmlCode} />
        )}
        <div className={classes.body}>{data[0] && this.listado()}</div>
      </div>
    )
  }
}

SeparadorOpinion.propTypes = {
  customFields,
}

export default SeparadorOpinion
