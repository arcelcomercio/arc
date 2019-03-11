import Consumer from 'fusion:consumer'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { GetMultimediaContent } from './../../../../resources/utilsJs/utilities'

const classes = {
  separator: 'separator',
  headerHtml: 'separator__headerHtml',
  title: 'separator__headerTitle',
  body: 'separator__body',
  item: 'separator__item',
  detail: 'separator__detail',
  separatorTitle: 'separator__title',
  mvideo: 'separator--video',
}

const SeparatorItem = ({ headlines, urlImage, website_url, medio }) => {
  debugger
  return (
    <article className={classes.item}>
      {medio === 'video' && <span>&#8227;</span>}
      {medio === 'gallery' && <span>G</span>}
      <div className={classes.detail}>
        <h2 className={classes.separatorTitle}>
          <a href={website_url}>{headlines}</a>
        </h2>
      </div>
      <figure>
        {website_url && (
          <a href={website_url}>
            <img src={urlImage} alt="" />
          </a>
        )}
      </figure>
    </article>
  )
}

const SeparatorListItem = ({ data }) => {
  console.log('separator listItem')
  console.log(data)
  const result = data.map(
    ({ promo_items: promoItems, website_url: websiteUrl, headlines }) => {
      let multimedia = null

      if (promoItems !== null) {
        multimedia = GetMultimediaContent(promoItems)
      }

      const { url, medio } = multimedia

      return (
        <SeparatorItem
          key={websiteUrl}
          headlines={headlines.basic}
          urlImage={url}
          website_url={websiteUrl}
          medio={medio}
        />
      )
    }
  )
  return result
}

// const HeaderTitulo = ({ titleSeparator, titleLink }) => {
//   return (
//     <Fragment>
//       <h1 className={classes.title}>
//         <a href={titleLink}>{titleSeparator}</a>
//       </h1>
//     </Fragment>
//   )
// }

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

@Consumer
class Separador extends Component {
  constructor(props) {
    super(props)

    const {
      customFields: { titleSeparator, titleLink, section, htmlCode },
    } = this.props || {}

    this.state = {
      device: this.setDevice(),
      titleSeparator,
      titleLink,
      section,
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
    } else if (device === 'tablet') {
      news_number = 4
    }

    const { arcSite } = this.props
    const { section } = this.state

    const { fetched } = this.getContent(
      'stories__by-section',
      {
        website: arcSite,
        section,
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
        console.log(
          'No hay respuesta del servicio para obtener el listado de noticias'
        )
      }

      this.setState({
        data: response.content_elements,
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
    } else if (wsize < 1024 && wsize >= 640 && this.state.device !== 'tablet') {
      this.setState({
        device: 'tablet',
      })
      this.getContentApi()
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
    if (wsize >= 640 && wsize < 1024) {
      return 'tablet'
    }
    return 'desktop'
  }

  filterSchema = () => {
    return `
    {
      content_elements{
        canonical_url
        website_url
        promo_items{
          basic_video {
            type
            promo_items {
              basic {
                type 
                url
              }
            }
          }
          basic_gallery {
            type 
            promo_items {
              basic {
                type 
                url
              }
            }
          }
          basic {
            type 
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

  render() {
    const { titleSeparator, titleLink, htmlCode, data } = this.state

    return (
      <div className={classes.separator}>
        {titleSeparator ? (
          <h1 className={classes.title}>
            <a href={titleLink}>{titleSeparator}</a>
          </h1>
        ) : (
          <HeaderHTML htmlCode={htmlCode} />
        )}

        <div className={classes.body}>
          <SeparatorListItem data={data} />
        </div>
      </div>
    )
  }
}

Separador.propTypes = {
  customFields: PropTypes.shape({
    titleSeparator: PropTypes.string.tag({ name: 'Titulo del separador' }),
    titleLink: PropTypes.string.tag({ name: 'Enlace del separador' }),
    section: PropTypes.string.isRequired.tag({ name: 'Sección' }),
    htmlCode: PropTypes.richtext.tag({ name: 'Código HTML' }),
  }),
}
export default Separador
