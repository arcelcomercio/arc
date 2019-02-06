import Consumer from 'fusion:consumer'
import React, { Component, Fragment } from 'react'
import './default.scss'
import PropTypes from 'prop-types'
@Consumer
class Ads extends Component {

    render(){
        const { adElement, device, customFields } = this.props
        return(
            <Fragment>
                {/* Zocalos */}
                {!customFields && <div className='ad' id={`ads_${device}_${adElement}`}></div>}
                {/* Bloques */}
                {customFields && customFields.isMobile && <div id={`ads-m-${customFields.adElement}`}></div>}
                {customFields && customFields.isDesktop && <div id={`ads-d-${customFields.adElement}`}></div>}
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
      isMobile: PropTypes.bool.tag({ name: "Mobile", group: 'Dispositivo' })
    })
  };
  

Ads.static = true

export default Ads