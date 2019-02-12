import PropTypes from 'prop-types'
import Consumer from 'fusion:consumer'
import React, { Fragment, Component } from 'react'

// Temp
import './card-nota.scss'

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
        author: response.credits.by[0].name,
      })
      if (size == 'twoCol') {
        this.setState({ image: 'https://www.foxsportsasia.com/uploads/2019/02/mbapperashford.jpg' })
      } else {
        switch (imageSize) {
          case 'parcial':
            this.setState({ image: 'https://www.foxsportsasia.com/uploads/2019/02/mbapperashford.jpg' })
            break;

          case 'complete':
            this.setState({ image: 'http://rollingstone.com.mx/wp-content/uploads/2018/05/Pepsi-Dua.jpg' })
            break;
        }
      }
    })
  }

  render() {
    const { category, title, author, image } = this.state
    const { imageSize, headband, size, titleField } = this.props.customFields

    return (
      <article className={`row-1 ${imageSize == 'complete' ? 'img-complete' : ''} ${size == 'twoCol' ? 'col-2' : ''}`}>
        {imageSize == 'complete' && <span className="gradient"></span>}
        <div className="flow-detail">
          <div>
            {headband == 'normal' && <h3>
              <a href="">{category}</a>
            </h3>}
            {headband == 'live' && <span className="live">EN VIVO</span>}
            <h2>
              <a href="" {...this.props.editableField('titleField')}>{titleField ? titleField : title}</a>
            </h2>
          </div>
          <span className="author">
            <a href="">{author}</a>
          </span>
        </div>
        <figure className="flow-image">
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
    imageSize: PropTypes.oneOf(['parcial', 'complete']).tag({
      name: 'Posición de la imagen',
      labels: {
        parcial: 'Parcial',
        complete: 'Completa'
      },
      defaultValue: 'parcial'
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
    titleField: PropTypes.string.tag({
      name: 'Título',
      group: 'Editar texto'
    }),
  })
}


export default CardNotaManual