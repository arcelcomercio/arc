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
    const schema = ``

    const { fetched } = this.getContent(source, params)
    fetched.then(response => {
      console.log(response)
      console.log(this.props)
      this.setState({
        category: 'Editorial',
        title: 'Piura: fuertes lluvias y crecida de ríos aíslan centros poblados y caseríos',
        author: 'Carlos Chunga',
      })
      if (size == 'twoCol') {
        this.setState({ image: 'https://img.elcomercio.pe/files/listing_ec_home_principal2x1/uploads/2019/02/11/5c6197d68fb3d.jpeg' })
      } else {
        switch (imageSize) {
          case 'parcial':
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
    const { imageSize, headband, size, titleField } = this.props.customFields

    return (
      <article className={`${imageSize == 'complete' ? 'img-complete' : ''} ${size == 'twoCol' ? 'twoCol' : ''}`}>
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