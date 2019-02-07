import Consumer from 'fusion:consumer'
import React, { Component, Fragment } from 'react'
// import './default.scss'
import PropTypes from 'prop-types'
@Consumer
class Html extends Component {

  createMarkup(html) {
    return { __html: html };
  }

  render() {

    return (
      <div
        dangerouslySetInnerHTML={this.createMarkup(this.props.customFields.freeHtml)}>
      </div>
    )
  }
}

Html.propTypes = {
  customFields: PropTypes.shape({
    freeHtml: PropTypes.richtext.tag({
      name: "Código HTML"
    })
  })
};

export default Html