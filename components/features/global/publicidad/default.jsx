import Consumer from 'fusion:consumer'
import React, { Component } from 'react' // PureComponent. Leer abajo
import PropTypes from 'prop-types'
import Ads from '../../../../resources/components/ads'

@Consumer
class Publicidad extends Component {
  // PureComponent. Leer abajo.
  /**
   *  TODO: En lugar de "Component" puedes heredar de
   *  "PureComponent" si el componente es stateLess (no tiene estados)
   *  es mucho más óptimo.
   *
   *  TODO: Podrías añadir el label para llamarlo "Publicidad" directamente.
   *  (Si consideras que vale la pena pensando en el editor)
   *
   *  TODO: No necesita el método constructor si no se usa
   */

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {
      customFields: {
        adElement,
        isDesktop,
        isMobile,
        freeHtml,
        columns,
        rows,
      } = {},
    } = this.props
    /**
     * TODO: Si estás declarando "customFields" por propTypes siempre traerá data
     * así sea "null", en este caso la destructuración no le asignará por defecto
     * {} a customFields y podría obtener error. Podría ser mejor separar la
     * destructuración en dos partes:
     *
     * const { customFields } = this.props
     * const { --elementos-- } = customFields || {}
     *
     */

    const params = {
      adElement,
      isDesktop,
      isMobile,
    }

    /**
     * TODO: createMarkup se puede poner como un método en helpers,
     * se usa en varias partes.
     */
    const createMarkup = html => {
      return { __html: html }
    }

    /**
     * TODO: puede ser simple método en lugar de arrowFunction
     * colClass () {...}
     */
    const colClass = () => {
      // FIXME: Innecesario. Lee más abajo
      switch (columns) {
        case 'oneCol':
          return 'col-1'
        case 'twoCol':
          return 'col-2'
        case 'threeCol':
          return 'col-2'
        default:
          return 'full-width'
      }
    }

    /**
     * TODO: puede ser simple método en lugar de arrowFunction
     * rowClass () {...}
     */
    const rowClass = () => {
      // FIXME: Innecesario. Lee más abajo
      switch (rows) {
        case 'oneRow':
          return 'row-1'
        case 'twoRow':
          return 'row-2'
        default:
          return ''
      }
    }

    /**
     * TODO: puede ser simple método en lugar de arrowFunction
     * rowClass () {...}
     */
    const hideClass = () => {
      if (freeHtml) return ''
      if (isDesktop && !isMobile) {
        return 'no-mobile'
      }
      if (!isDesktop && isMobile) {
        return 'no-desktop'
      }
      return ''
    }

    return (
      <div
        className={
          `${colClass()} ${rowClass()} ${hideClass()}`
          /** FIXME: Innecesario. Lee más abajo
           * ${columns}
           * ${rows}
           * No... aún más abajo
           */
        }>
        <Ads {...params} />
        {freeHtml && <div dangerouslySetInnerHTML={createMarkup(freeHtml)} />}
      </div>
    )
  }
}

Publicidad.propTypes = {
  customFields: PropTypes.shape({
    adElement: PropTypes.string.isRequired.tag({
      name: 'Nombre',
    }),
    isDesktop: PropTypes.bool.tag({ name: 'Mostrar en "Desktop"' }),
    isMobile: PropTypes.bool.tag({ name: 'Mostrar en "Mobile"' }),
    freeHtml: PropTypes.richtext.tag({
      name: 'Código HTML',
      group: 'Agregar bloque de html',
    }),
    columns: PropTypes.oneOf(['auto', 'oneCol', 'twoCol', 'threeCol']).tag({
      name: 'Ancho de la publicidad',
      labels: {
        auto: 'auto',
        oneCol: '1 columna',
        twoCol: '2 columnas',
        threeCol: '3 columnas',
      },
      /**
       * TODO: Con esto te evitas los métodos de arriba.
      columns: PropTypes.oneOf(['full-width', 'col-1', 'col-2', 'col-3']).tag({
      name: 'Ancho de la publicidad',
      labels: {
        'full-width': 'auto',
        'col-1': '1 columna',
        'col-2': '2 columnas',
        'col-3': '3 columnas',
      },
      defaultValue: 'full-width',
       */
      defaultValue: 'auto',
      group: 'Tamaño de la publicidad',
    }),
    rows: PropTypes.oneOf(['', 'row-1', 'row-2']).tag({
      name: 'Alto de la publicidad',
      labels: {
        '': 'auto',
        'row-1': '1 fila',
        'row-2': '2 filas',
      },
      /**
       * TODO: Con esto te evitas los métodos de arriba.
      rows: PropTypes.oneOf(['', 'row-1', 'row-2']).tag({
      name: 'Alto de la publicidad',
      labels: {
        '': 'auto',
        'row-1': '1 fila',
        'row-2': '2 filas',
      },
      defaultValue: '',
       */
      defaultValue: 'auto',
      group: 'Tamaño de la publicidad',
    }),
  }),
}

export default Publicidad
