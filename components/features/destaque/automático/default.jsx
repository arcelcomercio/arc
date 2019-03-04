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
}
@Consumer
class DestaqueAutomatico extends Component {
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
    const { section, imageSize, size } = customFields

    const source = 'get-story-more-reads'
    const params = {
      section,
      website: arcSite,
      num_notes: 1,
    }
    const schema = `{ 
      content_elements { 
        headlines { basic }
        credits { 
          by { name  url } 
        }
        website_url
        promo_items { 
          basic_image { url caption }
        }
        websites {
          ${arcSite} {
            website_section {
              name
              path
            }
          }
        }
      }
    }`

    const { fetched } = this.getContent(source, params, schema)
    fetched.then(response => {
      const storyElement = response.content_elements[0]
      this.setState({
        category: {
          name: storyElement.websites[`${arcSite}`]
            ? storyElement.websites[`${arcSite}`].website_section.name
            : '',
          url: storyElement.websites[`${arcSite}`]
            ? storyElement.websites[`${arcSite}`].website_section.path
            : '',
        },
        title: {
          name: storyElement.headlines.basic,
          url: storyElement.website_url,
        },
        author: {
          name: storyElement.credits.by.length
            ? storyElement.credits.by[0].name
            : '',
          url: storyElement.credits.by.length
            ? storyElement.credits.by[0].url
            : '',
        },
      })
      if (size === 'twoCol') {
        this.setState({
          image: storyElement.promo_items.basic_image
            ? storyElement.promo_items.basic_image.url
            : '',
        })
      } else {
        switch (imageSize) {
          case 'parcialBot':
          case 'parcialTop':
            this.setState({
              image: storyElement.promo_items.basic_image
                ? storyElement.promo_items.basic_image.url
                : '',
            })
            break

          case 'complete':
            this.setState({
              image: storyElement.promo_items.basic_image
                ? storyElement.promo_items.basic_image.url
                : '',
            })
            break
          default:
            break
        }
      }
    })
  }

  render() {
    const { category, title, author, image } = this.state
    const { customFields, editableField } = this.props
    const { imageSize, size, titleField, categoryField } = customFields

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

    return (
      <article
        className={`${classes.destaque} ${getImageSizeClass()} ${
          size === 'twoCol' ? classes.twoCol : ''
        }`}
      >
        {imageSize === 'complete' && <span className={classes.gradient} />}
        <div className={classes.detail}>
          <h3 className={classes.category}>
            <a
              className={classes.link}
              href={category.url}
              {...editableField('categoryField')}
            >
              {categoryField || category.name}
            </a>
          </h3>
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

DestaqueAutomatico.propTypes = {
  customFields: PropTypes.shape({
    section: PropTypes.string.isRequired.tag({
      name: 'Sección',
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

export default DestaqueAutomatico
