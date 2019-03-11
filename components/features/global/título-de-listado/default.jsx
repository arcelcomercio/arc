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
      title: 'CARGANDO...',
    }
  }

  componentDidMount() {
    const {
      globalContentConfig: {
        query: { page },
      },
    } = this.props
    switch (page) {
      case 'archivo': {
        // Funciona
        this.setState({
          title: this.setArchivoTitle(),
        })
        break
      }
      case 'noticias': {
        // Tag
        // Solucionando
        this.setState({
          title: this.setTagTitle(),
        })
        break
      }
      case 'autor': {
        // Funciona
        this.setState({
          title: this.setAuthorTitle(),
        })
        break
      }
      case 'buscar': {
        // Probar
        this.setState({
          title: this.setSearchTitle(),
        })
        break
      }
      default:
        break
    }
  }

  setArchivoTitle = () => {
    let {
      globalContentConfig: {
        query: { date },
      },
    } = this.props

    if (!date.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)) {
      return 'ÚLTIMO MINUTO'
    }

    // Setting correct Date format to new Date()
    const [y, m, d] = date.split('-')
    date = [m, d, y].join('-')

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
      dateObj.getDay()
    ].toUpperCase()} ${dateObj.getDate()} DE ${months[
      dateObj.getMonth()
    ].toUpperCase()} DEL ${dateObj.getFullYear()}`
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
        query: { tag },
      },
    } = this.props

    return tags.find(({ slug, text }) => tag === slug && text)
  }

  setAuthorTitle = () => {
    const {
      globalContent: {
        content_elements: [
          {
            credits: {
              by: [{ name, org }],
            },
          },
        ],
      },
    } = this.props

    return `${name.toUpperCase()} ${org && `DE ${org.toUpperCase()}`}`
  }

  setAutorOrTagTitle = key => {
    const aux = key.split('-')
    const title =
      aux.length > 1 ? aux.map(item => ` ${item.toUpperCase()}`) : aux
    return title.join(' ')
  }

  setSearchTitle = () => {
    const {
      globalContentConfig: {
        query: { uri },
      },
    } = this.props

    const search =
      uri !== '' && uri.match(/(\?query=)(.*(?=&|[/])|.*)/)[2].replace('+', ' ')
    return `ESTOS SON LOS RESULTADOS PARA: ${search.toUpperCase()}`
  }

  render() {
    const { isAdmin } = this.props
    const { title } = this.state

    console.log(title)

    return (
      <h1 className={classes.title}>
        {isAdmin ? 'ESTE TEXTO SÓLO SE MOSTRARÁ EN LA PÁGINA PUBLICADA' : title}
      </h1>
    )
  }
}

export default ListTitle

// Seguramente cambie comportamiento por global content
