import Consumer from 'fusion:consumer'
import React, { Component, Fragment } from 'react'
import './default.scss'
import PropTypes from 'prop-types'
@Consumer
class Ads extends Component {

    createMarkup(html) {
        return { __html: html };
    }

    render() {
        const { adElement, device, customFields } = this.props

        return (
            <Fragment>
                {/* Zocalos */}
                {!customFields ? <div className='ad' id={`ads_${device}_${adElement}`}></div>
                    : <div className={`${customFields.customWidth} ${customFields.customHeight}`}>
                        {/* Bloques */}
                        {customFields.isMobile && <div id={`ads-m-${customFields.adElement}`}></div>}
                        {customFields.isDesktop && <div id={`ads-d-${customFields.adElement}`}></div>}
                        {customFields.freeHtml && <div dangerouslySetInnerHTML={this.createMarkup(this.props.customFields.freeHtml)}></div>}
                    </div>}

            </Fragment>
        )
    }
}

Ads.propTypes = {
    customFields: PropTypes.shape({
        adElement: PropTypes.string.isRequired.tag({
            name: "Nombre"
        }),
        isDesktop: PropTypes.bool.tag({ name: "Desktop", group: 'Dispositivo' }),
        isMobile: PropTypes.bool.tag({ name: "Mobile", group: 'Dispositivo' }),
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
        freeHtml: PropTypes.richtext.tag({ name: "Código HTML", group: 'Agregar bloque de html' }),
    })
};


Ads.static = true

export default Ads