import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import PropTypes from 'prop-types'
import { formatSlugToText } from '../../utilities/helpers'

const classes = {
  title: 'full-width mg-top-20',
}

@Consumer
class CustomTitle extends PureComponent {
  getArchivoTitle() {
    const { globalContentConfig } = this.props
    const { source } = globalContentConfig || {}
    if (source !== 'story-feed-by-section-and-date') {
      return undefined
    }
    const { query: { date = '' } = {} } = globalContentConfig || {}
    if (date === '' || !date.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)) {
      return 'ÚLTIMO MINUTO'
    }

    // TODO: Usar librería como "moment" o "luxon"
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
    ].toUpperCase()} DEL ${dateObj.getUTCFullYear()}` // ARCHIVO, LUNES 03 DE FEBRERO DEL 2018
  }

  getSearchTitle() {
    const { globalContentConfig } = this.props
    const { source } = globalContentConfig || {}
    if (source !== 'story-feed-by-search') {
      return undefined
    }
    const { query: { query = '' } = {} } = globalContentConfig || {}
    const { globalContent } = this.props
    const { count = 0 } = globalContent || {}

    const search = query && query.replace('+', ' ')
    const title = search
      ? `SE ENCONTRARON ${count} RESULTADOS PARA: ${search.toUpperCase()}` // SE ENCONTRARON 99 RESULTADOS PARA: MADURO
      : `ÚLTIMAS NOTICIAS`

    return title
  }

  render() {
    const {
      globalContent,
      globalContentConfig,
      editableField,
      customFields: {
        isUppercase,
        customText,
        TextType = 'h1',
        textAlign = 'left',
      } = {},
    } = this.props
    const {
      section_name: sectionName,
      tag_name: tagName,
      author_name: authorName,
    } = globalContent || {}
    const { query: { section } = {} } = globalContentConfig || {}

    return (
      <TextType
        {...editableField('customText')}
        suppressContentEditableWarning
        className={`${classes.title} text-${textAlign} ${
          isUppercase ? 'uppercase' : ''
        }`}>
        {customText ||
          sectionName ||
          tagName ||
          authorName ||
          this.getSearchTitle() ||
          this.getArchivoTitle() ||
          formatSlugToText(section) ||
          'Título'}
      </TextType>
    )
  }
}

CustomTitle.propTypes = {
  customFields: PropTypes.shape({
    TextType: PropTypes.oneOf(['h1', 'h2']).tag({
      name: 'Tipo de texto',
      labels: {
        h1: 'Título',
        h2: 'Subtítulo',
      },
      defaultValue: 'h1',
    }),
    textAlign: PropTypes.oneOf(['left', 'center', 'right']).tag({
      name: 'Alineación del texto',
      labels: {
        left: 'Izquierda',
        center: 'Centro',
        right: 'Derecha',
      },
      defaultValue: 'left',
    }),
    isUppercase: PropTypes.bool.tag({
      name: 'Texto en mayúsculas',
    }),
    customText: PropTypes.string.tag({
      name: 'Título personalizado',
    }),
  }),
  editableField: PropTypes.func,
}

CustomTitle.label = 'Título Personalizable'
CustomTitle.static = true

export default CustomTitle
