import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import PropTypes from 'prop-types'
import {
  formatSlugToText,
  arrayMonths,
  arrayDays,
} from '../../utilities/helpers'

const classes = {
  title: 'w-full mt-20 custom-title',
  button:
    'custom-title__button position-absolute right-0 text-sm font-normal border-1 border-gray border-solid p-10 text-gray-200',
  darkButton:
    'custom-title__button position-absolute right-0 text-sm font-normal border-1 border-white border-solid p-10 text-white',
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

    // TODO: Usar librería como luxon"
    const dateObj = new Date(date)

    return `ARCHIVO, ${arrayDays[
      dateObj.getUTCDay()
    ].toUpperCase()} ${dateObj.getUTCDate()} DE ${arrayMonths[
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

    let search = query && query.replace(/\+/g, ' ')
    search = decodeURIComponent(search)
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
        isThreeCol,
        isCustomBorder,
        seeMoreButton,
        customText,
        isDarkBg,
        seeMoreButtonLink = '',
        TextType = 'h1',
        textAlign = 'left',
        size = 'large',
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
        } ${isThreeCol ? 'col-3' : ''} ${
          isCustomBorder ? 'custom-border' : ''
        } ${seeMoreButton ? 'position-relative ' : ''} ${
          isDarkBg ? 'dark-bg text-white bg-base-100' : ''
        } ${size}`}>
        {customText ||
          sectionName ||
          tagName ||
          authorName ||
          this.getSearchTitle() ||
          this.getArchivoTitle() ||
          formatSlugToText(section) ||
          'Título'}
        {seeMoreButton && (
          <a
            href={seeMoreButtonLink}
            className={isDarkBg ? classes.darkButton : classes.button}>
            VER MÁS
          </a>
        )}
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
    size: PropTypes.oneOf(['large', 'medium']).tag({
      name: 'Tamaño del texto',
      labels: {
        large: 'Grande',
        medium: 'Mediano',
      },
      defaultValue: 'large',
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
    customText: PropTypes.string.tag({
      name: 'Título personalizado',
    }),
    isUppercase: PropTypes.bool.tag({
      name: 'Texto en mayúsculas',
    }),
    isThreeCol: PropTypes.bool.tag({
      name: 'Ancho de 3 columnas',
    }),
    isCustomBorder: PropTypes.bool.tag({
      name: 'Borde perzonalizado',
    }),
    isDarkBg: PropTypes.bool.tag({
      name: 'Fondo personalizado',
    }),
    seeMoreButton: PropTypes.bool.tag({
      name: 'Agregar botón "Ver más"',
    }),
    seeMoreButtonLink: PropTypes.string.tag({
      name: 'Url del botón "Ver más"',
    }),
  }),
  editableField: PropTypes.func,
}

CustomTitle.label = 'Título Personalizable'
CustomTitle.static = true

export default CustomTitle
