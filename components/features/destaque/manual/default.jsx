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
      category: '',
      title: '',
      author: '',
      image: '',
    }
    this.fetch()
  }

  fetch() {
    const { customFields, arcSite } = this.props
    const { path, imageSize, size } = customFields

    const source = 'get-story-by-websiteurl'
    const params = {
      website: arcSite,
      website_url: path,
    }
    const schema = `{ 
      headlines { basic }
      credits { by { name } }
    }`

    const { fetched } = this.getContent(source, params, schema)
    fetched.then(response => {
      this.setState({
        category: 'Editorial',
        title: response.headlines.basic,
        author: response.credits.by.length ? response.credits.by[0].name : '',
      })
      if (size === 'twoCol') {
        this.setState({
          image:
            'https://www.foxsportsasia.com/uploads/2019/02/mbapperashford.jpg',
        })
      } else {
        switch (imageSize) {
          case 'parcialBot':
          case 'parcialTop':
            this.setState({
              image:
                'https://img.elcomercio.pe/files/listing_ec_home_principal/uploads/2019/02/11/5c6189afd3c81.jpeg',
            })
            break
          case 'complete':
            this.setState({
              image:
                'https://img.elcomercio.pe/files/listing_ec_home_principal_completo/uploads/2019/02/11/5c618f8a3e0b4.jpeg',
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
                href="#/"
                {...editableField('categoryField')}
              >
                {categoryField || category}
              </a>
            </h3>
          ) : (
            <div className={classes.headband}>
              <a
                href="#/"
                className={`${classes.link} ${classes.headbandLink}`}
              >
                {headband === 'live' ? 'En vivo' : ''}
              </a>
            </div>
          )}
          <h2 className={classes.title}>
            <a
              className={classes.link}
              href="#/"
              {...editableField('titleField')}
            >
              {titleField || title}
            </a>
          </h2>

          <span className={classes.author}>
            <a className={classes.link} href="#/">
              {author}
            </a>
          </span>
        </div>
        <figure className={classes.image}>
          <a className={classes.imageLink} href="#/">
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
    path: PropTypes.string.tag({
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
      name: 'Tamaño del card',
      labels: {
        oneCol: '1 columna',
        twoCol: '2 columnas',
      },
      defaultValue: 'oneCol',
    }),
    categoryField: PropTypes.string.tag({
      name: 'Categoría',
      group: 'Editar texto',
    }),
    titleField: PropTypes.string.tag({
      name: 'Título',
      group: 'Editar texto',
    }),
  }),
}

export default DestaqueManual
