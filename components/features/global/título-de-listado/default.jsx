import Consumer from 'fusion:consumer'
import React, { Component } from 'react'

const classes = {
  title: 'full-width text-left margin-top text-uppercase',
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
    const {
      globalContentConfig: { query: { page = '' } = {} } = {},
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
      default: {
        this.setState({
          title: 'TÍTULO',
        })
        break
      }
    }
  }

  setArchivoTitle = () => {
    const {
      globalContentConfig: { query: { date = '' } = {} } = {},
    } = this.props

    if (date === '' || !date.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)) {
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

    return `ARCHIVO, ${days[dateObj.getUTCDay()]} ${dateObj.getUTCDate()} DE ${
      months[dateObj.getUTCMonth()]
    } DEL ${dateObj.getUTCFullYear()}`
  }

  setTagTitle = () => {
    const {
      globalContent: {
        content_elements: [{ taxonomy: { tags = [] } = {} }] = [],
      } = {},
      globalContentConfig: { query: { name: tag = '' } = {} } = {},
    } = this.props

    let title = ''

    tags.forEach(({ slug = '/', text = '' }) => {
      if (tag === slug) title = text
    })

    return title
  }

  setAuthorTitle = () => {
    const {
      globalContent: {
        content_elements: [{ credits: { by = [] } = {} }] = [],
      } = {},
    } = this.props

    let author
    by.forEach(authorData => {
      if (authorData.type === 'author') author = authorData
    })
    return `${author.name || ''}${author.org ? `, ${author.org}` : ''}`
  }

  setSearchTitle = () => {
    const {
      globalContentConfig: { query: { query = '' } = {} } = {},
      globalContent: { count = 0 } = {},
    } = this.props

    const search = query && query.replace('+', ' ')
    const title = search
      ? `SE ENCONTRARON ${count} RESULTADOS PARA: ${search}`
      : `ÚLTIMAS NOTICIAS`
    return title
  }

  render() {
    const { title } = this.state

    return <h1 className={classes.title}>{title}</h1>
  }
}

export default ListTitle
