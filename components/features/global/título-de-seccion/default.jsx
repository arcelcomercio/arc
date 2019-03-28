import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

const classes = {
  /** Alineación  */
  title: 'full-width margin-top text-uppercase',
}
@Consumer
class ListTitle extends PureComponent {
  render() {
    const {
      globalContent: { section_name: sectionName = 'Sección' } = {},
      customFields: { textAlign, customText } = {},
      editableField,
    } = this.props

    return (
      <h1
        {...editableField('customText')}
        className={`${classes.title} text-${textAlign}`}>
        {customText || sectionName}
      </h1>
    )
  }
}

ListTitle.propTypes = {
  customFields: PropTypes.shape({
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
  }),
  editableField: PropTypes.func,
}

export default ListTitle
