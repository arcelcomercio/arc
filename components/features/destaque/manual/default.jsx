import PropTypes from 'prop-types'
import Consumer from 'fusion:consumer'
import React, { Component } from 'react'

const classes = {
  destaque: 'destaque padding-normal flex flex--column row-1',
  gradient: 'destaque__gradient full-width block',
  detail: 'destaque__detail flex flex--column flex--justify-between',
  image: 'destaque__image',

  category: 'destaque__category',
  title: 'destaque__title',
  author: 'destaque__author',

  link: 'destaque__link',
  imageLink: 'block',

  imgComplete: 'destaque--img-complete',
  parcialTop: 'flex--column-reverse',

  twoCol: 'col-2',
  // Headbands
  headband: 'destaque__headband',
  headbandLink: 'destaque__headband-link',

  live: 'destaque--live',
}
@Consumer
class DestaqueManual extends Component {
  constructor(props) {
    super(props)
    this.state = {
      category: {},
      title: {},
      author: {},
      image: '',
    }
    this.fetch()
  }

  fetch() {
    const { customFields, arcSite } = this.props
    const { path, imageSize, size } = customFields

    const source = 'story'
    const params = {
      website: arcSite,
      website_url: path,
    }
    const schema = `{ 
      headlines { basic }
      credits {
        by { name  url }
      }
      website_url
      promo_items {
        basic { url resized_urls }
        basic_video {
          promo_items {
            basic {
              url
              resized_urls
            }
          }
        }
        basic_gallery {
          promo_items {
            basic {
              url
              resized_urls
            }
          }
        }
      }
      websites {
        ${arcSite} {
          website_section {
            name
            path
          }
        }
      }
    }`

    const { fetched } = this.getContent(source, params, schema)
    fetched.then(response => {
      this.setState({
        category: {
          name: response.websites[`${arcSite}`]
            ? response.websites[`${arcSite}`].website_section.name
            : '',
          url: response.websites[`${arcSite}`]
            ? response.websites[`${arcSite}`].website_section.path
            : '',
        },
        title: {
          name: response.headlines.basic,
          url: response.website_url,
        },
        author: {
          name: response.credits.by.length ? response.credits.by[0].name : '',
          url: response.credits.by.length ? response.credits.by[0].url : '',
        },
      })
      let storyTypePath = response.promo_items.basic
        ? response.promo_items.basic
        : ''
      if (!response.promo_items.basic && response.promo_items.basic_gallery) {
        storyTypePath = response.promo_items.basic_gallery.promo_items.basic
      }
      if (!response.promo_items.basic && response.promo_items.basic_video) {
        storyTypePath = response.promo_items.basic_video.promo_items.basic
      }
      if (size === 'twoCol') {
        this.setState({
          image: storyTypePath.resized_urls
            ? storyTypePath.resized_urls['388:187']
            : storyTypePath.url,
        })
      } else {
        switch (imageSize) {
          case 'parcialBot':
          case 'parcialTop':
            this.setState({
              image: storyTypePath.resized_urls
                ? storyTypePath.resized_urls['288:157']
                : storyTypePath.url,
            })
            break
          case 'complete':
            this.setState({
              image: storyTypePath.resized_urls
                ? storyTypePath.resized_urls['164:187']
                : storyTypePath.url,
            })
            break
          default:
            break
        }
      }
    })
  }

  render() {
    const { customFields, editableField } = this.props
    const { category, title, author, image } = this.state
    const {
      imageSize,
      headband,
      size,
      titleField,
      categoryField,
    } = customFields

    const getImageSizeClass = () => {
      switch (imageSize) {
        case 'complete':
          return classes.imgComplete
        case 'parcialTop':
          return classes.parcialTop
        default:
          return ''
      }
    }
    const headBandModify = () => {
      if (headband === 'live') {
        return classes.live
      }
      return ''
    }

    return (
      <article
        className={`${
          classes.destaque
        } ${getImageSizeClass()} ${headBandModify()} ${
          size === 'twoCol' ? classes.twoCol : ''
        }`}
      >
        {imageSize === 'complete' && <span className={classes.gradient} />}
        <div className={classes.detail}>
          {headband === 'normal' ? (
            <h3 className={classes.category}>
              <a
                className={classes.link}
                href={category.url}
                {...editableField('categoryField')}
              >
                {categoryField || category.name}
              </a>
            </h3>
          ) : (
            <div className={classes.headband}>
              <a
                href={category.url}
                className={`${classes.link} ${classes.headbandLink}`}
              >
                {headband === 'live' ? 'En vivo' : ''}
              </a>
            </div>
          )}
          <h2 className={classes.title}>
            <a
              className={classes.link}
              href={title.url}
              {...editableField('titleField')}
            >
              {titleField || title.name}
            </a>
          </h2>

          <span className={classes.author}>
            <a className={classes.link} href={author.url}>
              {author.name}
            </a>
          </span>
        </div>
        <figure className={classes.image}>
          <a className={classes.imageLink} href={title.url}>
            <img src={image} alt="" />
          </a>
        </figure>
      </article>
    )
  }
}
// TODO: agregar el required a path section y la ayuda de editar el texto
DestaqueManual.propTypes = {
  customFields: PropTypes.shape({
    path: PropTypes.string.isRequired.tag({
      name: 'Path',
    }),
    imageSize: PropTypes.oneOf(['parcialBot', 'parcialTop', 'complete']).tag({
      name: 'Posición de la imagen',
      labels: {
        parcialBot: 'Parcial inferior',
        parcialTop: 'Parcial Superior',
        complete: 'Completa',
      },
      defaultValue: 'parcialBot',
    }),
    headband: PropTypes.oneOf(['normal', 'live']).tag({
      name: 'Cintillo',
      labels: {
        normal: 'Normal',
        live: 'En vivo',
      },
      defaultValue: 'normal',
    }),
    size: PropTypes.oneOf(['oneCol', 'twoCol']).tag({
      name: 'Tamaño del destaque',
      labels: {
        oneCol: '1 columna',
        twoCol: '2 columnas',
      },
      defaultValue: 'oneCol',
    }),
    categoryField: PropTypes.string.tag({
      name: 'Sección',
      group: 'Editar texto',
    }),
    titleField: PropTypes.string.tag({
      name: 'Título',
      group: 'Editar texto',
    }),
  }),
}

export default DestaqueManual
