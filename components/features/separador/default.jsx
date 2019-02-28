import Consumer from 'fusion:consumer'
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { isTablet, isMobileOnly } from 'react-device-detect'

const classes = {
  separator: 'separator',
  headerHtml: 'separator__headerHtml',
  title: 'separator__headerTitle',
  body: 'separator__body',
  item: 'separator__item',
  detail: 'separator__detail',
  separatorTitle: 'separator__title',
}
const SeparatorItem = ({ headlines, promo_items, website_url }) => {
  return (
    <article className={classes.item}>
      <div className={classes.detail}>
        <h2 className={classes.separatorTitle}>
          <a href={website_url}>{headlines}</a>
        </h2>
      </div>
      <figure>
        {website_url ? (
          <a href={website_url}>
            <img src={promo_items} />
          </a>
        ) : null}
      </figure>
    </article>
  )
}
const SeparatorListItem = ({ data }) => {
  let result = data.map((item, i) => {
    let imagen = null
    if (item.promo_items) {
      imagen = item.promo_items.basic
        ? item.promo_items.basic.url || null
        : null
    }

    return (
      <SeparatorItem
        key={i}
        headlines={item.headlines.basic}
        promo_items={imagen}
        website_url={item.website_url}
      />
    )
  })
  return result
}

const HeaderTitulo = ({ titleSeparator, titleLink }) => {
  return (
    <Fragment>
      <h1 className={classes.title}>
        <a href={titleLink}>{titleSeparator}</a>
      </h1>
    </Fragment>
  )
}
const createMarkup = html => {
  return { __html: html }
}

const HeaderHTML = ({ htmlCode }) => {
  return (
    <div
      className={classes.title}
      dangerouslySetInnerHTML={createMarkup(htmlCode)}
    />
  )
}
@Consumer
class Separador extends Component {
  constructor(props) {
    super(props)

    const { titleSeparator, titleLink, secction } =
      this.props.customFields || {}

    let { htmlCode } = this.props.customFields || {}

    this.state = {
      titleSeparator,
      titleLink,
      secction,
      htmlCode,
      data: [],
    }
  }
  componentDidMount = () => {
    let newsNumber = 4

    if (isMobileOnly) {
      newsNumber = 1
    }

    if (isTablet) {
      newsNumber = 4
    }

    const { fetched } = this.getContent(
      'get-lis-news',
      {
        website: this.props.arcSite,
        secction: this.state.secction,
        newsNumber: newsNumber,
      },
      this.filterSchema()
    )
    fetched.then(response => {
      if (!response) {
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

  filterSchema() {
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

  render() {
    return (
      <div className={classes.separator}>
        {this.state.titleSeparator ? (
          <HeaderTitulo
            titleSeparator={this.state.titleSeparator}
            titleLink={this.state.titleLink}
          />
        ) : (
          <HeaderHTML htmlCode={this.state.htmlCode} />
        )}

        <div className={classes.body}>
          <SeparatorListItem data={this.state.data} />
        </div>
      </div>
    )
  }
}

Separador.propTypes = {
  customFields: PropTypes.shape({
    titleSeparator: PropTypes.string.tag({ name: 'Titulo del separador' }),
    titleLink: PropTypes.string.tag({ name: 'Enlace del separador' }),
    secction: PropTypes.string.isRequired.tag({ name: 'Sección' }),
    htmlCode: PropTypes.richtext.tag({ name: 'Código HTML' }),
  }),
}
export default Separador
