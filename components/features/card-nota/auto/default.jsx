import PropTypes from 'prop-types'
import Consumer from 'fusion:consumer'
import React, { Fragment, Component } from 'react'

// Temp
import '../manual/card-nota.scss'

@Consumer
class CardNotaAuto extends Component {

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
    const { section, imageSize, size } = this.props.customFields

    const source = 'get-last-story-by-section'
    const params = {
      section: section,
      website: this.props.arcSite
    }
    const schema = `{ 
      content_elements { 
        headlines { basic }
        credits { by { name } }
      }
    }`

    const { fetched } = this.getContent(source, params, schema)
    fetched.then(response => {
      console.log(response)
      console.log(this.props)
      const storyElement = response.content_elements[0]
      this.setState({
        category: 'Editorial',
        title: storyElement.headlines.basic,
        author: storyElement.credits.by[0].name,
      })
      if (size == 'twoCol') {
        this.setState({ image: 'https://img.elcomercio.pe/files/listing_ec_home_principal2x1/uploads/2019/02/11/5c6197d68fb3d.jpeg' })
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
    const { imageSize, size, titleField, categoryField } = this.props.customFields

    return (
      <article className={`row-1 ${imageSize == 'complete' ? 'img-complete' : imageSize == 'parcialTop' ? 'parcialTop' : ''} ${size == 'twoCol' ? 'col-2' : ''}`}>
        {imageSize == 'complete' && <span className="gradient"></span>}
        <div className="flow-detail">
          <div>
            <h3>
              <a href="" {...this.props.editableField('categoryField')}>{categoryField || category}</a>
            </h3>
            <h2>
              <a href="" {...this.props.editableField('titleField')}>{titleField || title}</a>
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

CardNotaAuto.propTypes = {
  customFields: PropTypes.shape({
    section: PropTypes.string.tag({
      name: 'Sección'
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
    })
  })
}


export default CardNotaAuto