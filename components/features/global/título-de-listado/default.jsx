import Consumer from 'fusion:consumer'
import React, { Component } from 'react'

const classes = {
  title: 'full-width text-left margin-top',
}

@Consumer
class ListTitle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
    }
  }

  componentDidMount() {
    const { isAdmin } = this.props
    if (isAdmin) {
      this.setState({
        title: 'EL TÍTULO SÓLO SE MOSTRARÁ EN LA PÁGINA PUBLICADA',
      })
    } else {
      const {
        globalContentConfig: {
          query: { page },
        },
      } = this.props
      switch (page) {
        case 'archivo': {
          this.setState({
            title: this.setArchivoTitle(),
          })
          break
        }
        case 'noticias': {
          this.setState({
            title: this.setTagTitle(),
          })
          break
        }
        case 'autor': {
          this.setState({
            title: this.setAuthorTitle(),
          })
          break
        }
        case 'buscar': {
          this.setState({
            title: this.setSearchTitle(),
          })
          break
        }
        default:
          break
      }
    }
  }

  setArchivoTitle = () => {
    const {
      globalContentConfig: {
        query: { date },
      },
    } = this.props

    if (!date.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)) {
      return 'ÚLTIMO MINUTO'
    }

    // NOTE: Usar librería como "moment" o "luxon"
    const dateObj = new Date(date)
    const days = [
      'Domingo',
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
    ]
    const months = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ]

    return `ARCHIVO, ${days[
      dateObj.getUTCDay()
    ].toUpperCase()} ${dateObj.getUTCDate()} DE ${months[
      dateObj.getUTCMonth()
    ].toUpperCase()} DEL ${dateObj.getUTCFullYear()}`
  }

  setTagTitle = () => {
    const {
      globalContent: {
        content_elements: [
          {
            taxonomy: { tags },
          },
        ],
      },
      globalContentConfig: {
        query: { name: tag },
      },
    } = this.props

    let title
    tags.forEach(({ slug, text }) => {
      if (tag === slug) title = text ? text.toUpperCase() : ''
    })

    return title
  }

  setAuthorTitle = () => {
    const {
      globalContent: {
        content_elements: [
          {
            credits: { by },
          },
        ],
      },
    } = this.props

    const author = by.forEach(
      authorData =>
        authorData && authorData.type && authorData === 'author' && authorData
    )

    return `${author.name ? author.name.toUpperCase() : ''}${
      author.org ? `, ${author.org.toUpperCase()}` : ''
    }`
  }

  setSearchTitle = () => {
    const {
      globalContentConfig: {
        query: { uri },
      },
      globalContent: { count },
    } = this.props

    const search =
      uri !== '' && uri.match(/(\?query=)(.*(?=&|\/)|.*)/)[2].replace('+', ' ')
    return `SE ENCONTRARON ${count} RESULTADOS PARA: ${search &&
      search.toUpperCase()}`
  }

  render() {
    const { isAdmin } = this.props
    const { title } = this.state

    return (
      <h1 className={classes.title}>
        {isAdmin ? 'ESTE TEXTO SÓLO SE MOSTRARÁ EN LA PÁGINA PUBLICADA' : title}
      </h1>
    )
  }
}

export default ListTitle
