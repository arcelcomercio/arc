import Consumer from 'fusion:consumer'
import React, { Component, Fragment } from 'react'
// import './default.scss'
import PropTypes from 'prop-types'
@Consumer
class Html extends Component {

  render() {

    const { customWidth, customHeight } = this.props.customFields
    return (
      <div className={`${customWidth} ${customHeight}`}>
        {this.props.customFields.freeHtml}
      </div>
    )
  }
}

Html.propTypes = {
  customFields: PropTypes.shape({
    freeHtml: PropTypes.richtext.tag({
      name: "Html"
    }),
    customWidth: PropTypes.oneOf(["col-1", "col-2", "col-3"]).tag({
      name: "Ancho del contenedor",
      labels: {
        "col-1": "1 columna",
        "col-2": "2 columnas",
        "col-3": "3 columnas"
      },
      defaultValue: "col-1",
      group: 'Dimensiones'
    }),
    customHeight: PropTypes.oneOf(["row-1", "row-2", "row-3", "row-4"]).tag({
      name: "Alto del contenedor",
      labels: {
        "row-1": "1 fila",
        "row-2": "2 filas",
        "row-3": "3 filas",
        "row-4": "4 filas"
      },
      defaultValue: "row-1",
      group: 'Dimensiones'
    }),
  })
};

export default Html