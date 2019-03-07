import Consumer from 'fusion:consumer'
import React, { Component } from 'react'

const classes = {
  title: 'full-width text-left margin-top',
}

@Consumer
class ListTitle extends Component {
  setPageType = uri => {
    let title
    switch (uri.split('/')[1]) {
      case 'archivo':
        title = this.setArchivoTitle(uri)
        break
      case 'autor':
        title = this.setAutorOrTagTitle(uri)
        break
      case 'noticias':
        title = this.setAutorOrTagTitle(uri)
        break
      case 'buscar':
        title = this.setSearchTitle(uri)
        break
      default:
        break
    }

    return title
  }

  setArchivoTitle = uri => {
    let archivoTitle
    if (!uri.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)) archivoTitle = 'ÚLTIMO MINUTO'
    else {
      const date = new Date(uri.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/))
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
      archivoTitle = `ARCHIVO, ${days[
        date.getDay()
      ].toUpperCase()} ${date.getMonth()} DE ${months[
        date.getMonth()
      ].toUpperCase()} DEL ${date.getFullYear()}`
    }
    return archivoTitle
  }

  setAutorOrTagTitle = uri => {
    const aux = uri.split('/')[2].split('-')
    const title =
      aux.length > 1 ? aux.map(item => ` ${item.toUpperCase()}`) : aux
    return title.join(' ')
  }

  setSearchTitle = uri => {
    const aux = uri.match(/(?<=\?query=).*(?=&|\/)/)[0].split('+')
    const search =
      aux.length > 1 ? aux.map(item => ` ${item.toUpperCase()}`) : aux
    return `ESTOS SON LOS RESULTADOS PARA: ${search.join(' ')}`
  }

  render() {
    const { isAdmin, requestUri } = this.props
    return (
      <h1 className={classes.title}>
        {isAdmin
          ? 'ESTE TEXTO SÓLO FUNCIONARÁ EN LA PÁGINA PUBLICADA'
          : this.setPageType(requestUri)}
      </h1>
    )
  }
}

export default ListTitle

// Seguramente cambie comportamiento por global content
