import PropTypes from 'prop-types'
import Consumer from 'fusion:consumer'
import React, { Fragment, Component } from 'react'

import { FormatClassName } from '../../../../resources/utilsJs/utilities'

const classes = FormatClassName({
  cardNotaContainer: [
    'padding-normal',
    'card',
    'flex',
    'flex--column',
    'row-1'
  ],
  imgComplete: [
    'img-complete'
  ],
  parcialTop: [
    'flex--column-reverse'
  ],
  twoCol: [
    'col-2'
  ],
  spanGradient: [
    'gradient',
    'full-width',
    'block'
  ],
  flowDetail: [
    'flow-detail',
    'flex',
    'flex--column',
    'flex--justify-between'
  ],
  spanHeadband: [
    'live'
  ],
  author: [
    'author'
  ],
  flowImage: [
    'flow-image'
  ]
})
@Consumer
class CardNotaManual extends Component {

  constructor(props) {
    super(props)
    this.state = {
      category: '',
      title: '',
      author: '',
      image: ''
    }
    this.fetch()
  }

  fetch() {
    const { path, imageSize, size } = this.props.customFields

    const source = 'get-story-by-websiteurl'
    const params = {
      website: this.props.arcSite,
      website_url: path
    }
    const schema = `{ 
      headlines { basic }
      credits { by { name } }
    }`

    const { fetched } = this.getContent(source, params, schema)
    fetched.then(response => {
      console.log(response)
      console.log(this.props)
      this.setState({
        category: 'Editorial',
        title: response.headlines.basic,
        author: response.credits.by.length ? response.credits.by[0].name : '',
      })
      if (size == 'twoCol') {
        this.setState({ image: 'https://www.foxsportsasia.com/uploads/2019/02/mbapperashford.jpg' })
      } else {
        switch (imageSize) {
          case 'parcialBot':
          case 'parcialTop':
            this.setState({ image: 'https://img.elcomercio.pe/files/listing_ec_home_principal/uploads/2019/02/11/5c6189afd3c81.jpeg' })
            break;
          case 'complete':
            this.setState({ image: 'https://img.elcomercio.pe/files/listing_ec_home_principal_completo/uploads/2019/02/11/5c618f8a3e0b4.jpeg' })
            break;
        }
      }
    })
  }

  render() {
    const { category, title, author, image } = this.state
    const { imageSize, headband, size, titleField, categoryField } = this.props.customFields

    return (
      <article className={`${classes.cardNotaContainer} ${imageSize == 'complete' ? classes.imgComplete : imageSize == 'parcialTop' ? classes.parcialTop : ''} ${size == 'twoCol' ? classes.twoCol : ''}`}>
        {imageSize == 'complete' && <span className={classes.spanGradient}></span>}
        <div className={classes.flowDetail}>
          <div>
            {headband == 'normal' && <h3>
              <a href="" {...this.props.editableField('categoryField')}>{categoryField || category}</a>
            </h3>}
            {headband == 'live' && <span className={classes.spanHeadband}>EN VIVO</span>}
            <h2>
              <a href="" {...this.props.editableField('titleField')}>{titleField || title}</a>
            </h2>
          </div>
          <span className={classes.author}>
            <a href="">{author}</a>
          </span>
        </div>
        <figure className={classes.flowImage}>
          <a href="">
            <img
              src={image}
              alt=""
            />
          </a>
        </figure>
      </article>
    )
  }
}

CardNotaManual.propTypes = {
  customFields: PropTypes.shape({
    path: PropTypes.string.tag({
      name: 'Path'
    }),
    imageSize: PropTypes.oneOf(['parcialBot', 'parcialTop', 'complete']).tag({
      name: 'Posición de la imagen',
      labels: {
        parcialBot: 'Parcial inferior',
        parcialTop: 'Parcial Superior',
        complete: 'Completa'
      },
      defaultValue: 'parcialBot'
    }),
    headband: PropTypes.oneOf(['normal', 'live']).tag({
      name: 'Cintillo',
      labels: {
        normal: 'Normal',
        live: 'En vivo'
      },
      defaultValue: 'normal'
    }),
    size: PropTypes.oneOf(['oneCol', 'twoCol']).tag({
      name: 'Tamaño del card',
      labels: {
        oneCol: '1 columna',
        twoCol: '2 columnas'
      },
      defaultValue: 'oneCol'
    }),
    categoryField: PropTypes.string.tag({
      name: 'Categoría',
      group: 'Editar texto'
    }),
    titleField: PropTypes.string.tag({
      name: 'Título',
      group: 'Editar texto'
    }),
  })
}


export default CardNotaManual