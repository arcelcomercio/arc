import Consumer from 'fusion:consumer'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { GetMultimediaContent } from './../../../../resources/utilsJs/utilities'

const classes = {
  lista: 'List',
  header: 'List__Header',
  title: 'List__title',
  moreNews: 'List__morenews',
  listItem: 'List__listItems',
  itemNews: 'List__itemNews',
  time: 'List__time',
  pageLink: 'List__pageLink',
  bold: 'bold',
  scrolY: 'scroll-vertical-auto',
}
const HeaderList = ({
  titleList,
  urlTitle,
  background,
  seeMore,
  seeMoreurl,
}) => {
  return (
    <div className={`${classes.header} ${background}`}>
      <div className={classes.title}>
        <TituloLista urlTitle={urlTitle} titleList={titleList} />
      </div>
      {seeMore && (
        <div className={classes.moreNews}>
          <a href={seeMoreurl}>
            <h4>ver mas</h4>
          </a>
        </div>
      )}
    </div>
  )
}
const TituloLista = ({ urlTitle, titleList }) => {
  let result = null

  if (urlTitle) {
    result = (
      <a href={urlTitle}>
        <h4>{titleList} </h4>
      </a>
    )
  } else {
    result = <h4>{titleList}</h4>
  }
  return result
}

const ImageNews = ({ urlNews, promo_items: promoItems }) => {
  const imagen = promoItems.basic ? promoItems.basic.url || '' : ''
  const multimedia = GetMultimediaContent(promoItems)
  const { url, medio } = multimedia
  
  return (
    <figure>
      {medio === 'video' && <span>&#8227;</span>}
      {medio === 'gallery' && <span>G</span>}
      {url ? (
        <a href={urlNews}>
          <picture>
            <source
              data-type="srcset"
              srcSet={imagen}
              media="(max-width: 639px)"
            />
            <img datatype="src" src={url} alt="" />
          </picture>
        </a>
      ) : null}
    </figure>
  )
}

const ItemNews = ({
  seeHour,
  seeImageNews,
  time,
  title,
  urlNews,
  promo_items: promoItems,
}) => {
  return (
    <article className={classes.itemNews}>
      {seeImageNews && <ImageNews urlNews={urlNews} promo_items={promoItems} />}
      {seeHour && <div className={classes.time}>{time}</div>}
      <div className={classes.pageLink}>
        <a href={urlNews}>
          <h3 className={classes.bold}>{title}</h3>
        </a>
      </div>
    </article>
  )
}
const ListItemNews = ({ seeHour, seeImageNews, listNews }) => {
  return (
    <div className={`${classes.listItem} ${classes.scrolY}`}>
      {listNews.map(
        (
          {
            display_date: displayDate,
            headlines: { basic },
            canonical_url: canonicalUrl,
            promo_items: promoItems,
          },
          index
        ) => {
          const fechaPublicacion = new Date(displayDate)
          let time = ''

          const fechapresente = new Date().getTime()

          if (
            (fechapresente - new Date(displayDate).getTime()) /
              1000 /
              60 /
              60 >=
            24
          ) {
            time = `${
              fechaPublicacion.getDate() < 10
                ? `0${fechaPublicacion.getDate()}`
                : fechaPublicacion.getDate()
            }/${
              fechaPublicacion.getMonth() < 10
                ? `0${fechaPublicacion.getMonth()}`
                : fechaPublicacion.getMonth()
            }/${fechaPublicacion.getFullYear()}`
          } else {
            time = `${fechaPublicacion.getHours()}:${
              fechaPublicacion.getMinutes() < 10
                ? `0${fechaPublicacion.getMinutes()}`
                : fechaPublicacion.getMinutes()
            }-`
          }

          return (
            <ItemNews
              key={canonicalUrl}
              seeHour={seeHour}
              seeImageNews={
                seeImageNews === true && index === 0 /* ? true : false */
              }
              time={time}
              title={basic}
              urlNews={canonicalUrl}
              promo_items={promoItems || ''}
            />
          )
        }
      )}
    </div>
  )
}
@Consumer
class Lista extends Component {
  constructor(props) {
    super(props)

    const {
      customFields: {
        titleList,
        urlTitle,
        background = '',
        newsNumber,
        seeMore,
        seeMoreurl,
        seeHour,
        seeImageNews,
        section,
      },
    } = this.props || {}

    this.state = {
      titleList,
      urlTitle,
      background,
      newsNumber,
      seeMore,
      seeMoreurl,
      seeHour,
      seeImageNews,
      section,
      data: [],
    }
  }

  componentDidMount = () => {
    const { section, newsNumber } = this.state
    const { arcSite: website } = this.props
    const { fetched } = this.getContent(
      'stories__by-section',
      {
        website,
        section,
        news_number: newsNumber,
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

  filterSchema = () => {
    return `
    {
      content_elements{
        canonical_url
        website_url
        display_date
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
    const {
      titleList,
      urlTitle,
      background,
      seeMore,
      seeMoreurl,
      seeHour,
      seeImageNews,
      data,
    } = this.state
    return (
      <div className={classes.lista}>
        <HeaderList
          titleList={titleList}
          urlTitle={urlTitle}
          background={background}
          seeMore={seeMore}
          seeMoreurl={seeMoreurl}
        />
        <ListItemNews
          seeHour={seeHour}
          seeImageNews={seeImageNews}
          listNews={data || []}
        />
      </div>
    )
  }
}

Lista.propTypes = {
  customFields: PropTypes.shape({
    titleList: PropTypes.string.isRequired.tag({ name: 'Título de la lista' }),
    urlTitle: PropTypes.string.tag({ name: 'Url del título ' }),
    section: PropTypes.string.isRequired.tag({ name: 'Sección' }),
    background: PropTypes.oneOf(['bg-color--lightblue', 'bg-color--white']).tag(
      {
        name: 'Color de fondo cabecera',
        labels: {
          'bg-color--lightblue': 'celeste',
          'bg-color--white': 'blanco',
        },
        defaultValue: 'bg-color--lightblue',
      }
    ),

    newsNumber: PropTypes.number.tag({
      name: 'Número de noticas',
      defaultValue: 5,
    }),
    seeMore: PropTypes.bool.tag({ name: 'Ver más' }),
    seeHour: PropTypes.bool.tag({ name: 'Ver hora' }),
    seeImageNews: PropTypes.bool.tag({ name: 'Ver imagen' }),
    seeMoreurl: PropTypes.string.tag({ name: 'Ver más url' }),
  }),
}

export default Lista
