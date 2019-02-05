import './style.scss'

import PropTypes from 'prop-types'
import Consumer from 'fusion:consumer'
import React, { Fragment, Component } from 'react'

@Consumer
class Block extends Component {
  constructor(props) {
    super(props)
  }

  render() {

    const { ads_name, isDesktop, isMobile } = this.props.customFields;

    return (
      <div>
        {isMobile && <div id={`ads-m-${ads_name}`}></div>}
        {isDesktop && <div id={`ads-d-${ads_name}`}></div>}
      </div>
    )
  }
}

Block.propTypes = {
  customFields: PropTypes.shape({
    ads_name: PropTypes.string.isRequired.tag({
      name: "Nombre"
    }),
    isDesktop: PropTypes.bool.tag({ name: "Desktop", group: 'Dispositivo' }),
    isMobile: PropTypes.bool.tag({ name: "Mobile", group: 'Dispositivo' })
  })
};

export default Block