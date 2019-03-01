import Consumer from 'fusion:consumer'
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
//import { isTablet, isMobileOnly } from 'react-device-detect'

const classes = {
  separator: 'separator',
  headerHtml: 'separator__headerHtml',
  title: 'separator__headerTitle',
  body: 'separator__body',
  item: 'separator__item',
  detail: 'separator__detail',
  separatorTitle: 'separator__title',
}

const SeparatorItem = ({
  headlines,
  promo_items: promoItems,
  website_url: websiteUrl,
}) => {
  return (
    <article className={classes.item}>
      <div className={classes.detail}>
        <h2 className={classes.separatorTitle}>
          <a href={websiteUrl}>{headlines}</a>
        </h2>
      </div>
      <figure>
        {websiteUrl && (
          <a href={websiteUrl}>
            <img src={promoItems} alt="" />
          </a>
        )}
      </figure>
    </article>
  )
}
const SeparatorListItem = ({ data }) => {
  const result = data.map(
    ({ promo_items: promoItems, website_url: websiteUrl, headlines }) => {
      let imagen = null
      if (promoItems) {
        imagen = promoItems.basic && (promoItems.basic.url || null)
      }

      return (
        <SeparatorItem
          key={websiteUrl}
          headlines={headlines.basic}
          promo_items={imagen}
          website_url={websiteUrl}
        />
      )
    }
  )
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
    window.addEventListener('resize', this.handleResize);
    this.getContentApi();
  }

  getContentApi = () => {
    let newsNumber = 4;
    const { device } = this.state;

    if (device === 'mobile') {
      newsNumber = 1;
    }else if (device === 'desktop') {
      newsNumber = 4;
    } else if (device === 'tablet') {
      newsNumber = 4;
    }

    const { arcSite } = this.props
    const { section } = this.state

    debugger
    const { fetched } = this.getContent(
      'get-list-news',
      {
        website: arcSite,
        section,
        newsNumber,
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
    debugger
    const wsize = window.innerWidth

    // ------ Set the new state if you change from mobile to desktop
    if (wsize >= 1024 && this.state.device !== 'desktop') {
      this.setState({
        device: 'desktop',
      })
      this.getContentApi();
      // ------ Set the new state if you change from desktop to mobile
    } else if (wsize < 1024 && wsize >= 640 && this.state.device !== 'tablet') {
      this.setState({
        device: 'tablet',
      })
      this.getContentApi();
    } else if (wsize < 640 && this.state.device !== 'mobile') {
      // ------ Set the new state if you change from desktop to mobile
      this.setState({
        device: 'mobile',
      })
      this.getContentApi();
    }


  }

  setDevice = () => {
    const wsize = window.innerWidth
    console.log(wsize)
    debugger
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
  };

  render() {
    const { titleSeparator, titleLink, htmlCode, data } = this.state

    return(
      <div className={classes.separator}>
        {titleSeparator ? (
          <HeaderTitulo titleSeparator={titleSeparator} titleLink={titleLink} />
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
