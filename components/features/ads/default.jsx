import Consumer from 'fusion:consumer'
import React, { Component, Fragment } from 'react'
//import './default.scss'
import PropTypes from 'prop-types'
@Consumer
class Ads extends Component {

    createMarkup(html) {
        return { __html: html };
    }

    render() {
        const { adElement, isDesktop, isMobile, freeHtml } = this.props.customFields

        return (
            <Fragment>
                {isMobile && <div id={`ads-m-${adElement}`}></div>}
                {isDesktop && <div id={`ads-d-${adElement}`}></div>}
                {freeHtml && <div dangerouslySetInnerHTML={this.createMarkup(freeHtml)}></div>}
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
        freeHtml: PropTypes.richtext.tag({ name: "Código HTML", group: 'Agregar bloque de html' }),
    })
};

export default Ads