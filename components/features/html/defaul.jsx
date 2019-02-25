import Consumer from 'fusion:consumer'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

@Consumer
class Html extends Component {
  render() {
    const { customFields } = this.props
    const createMarkup = html => {
      return { __html: html }
    }
    return <div dangerouslySetInnerHTML={createMarkup(customFields.freeHtml)} />
  }
}

Html.propTypes = {
  customFields: PropTypes.shape({
    freeHtml: PropTypes.richtext.tag({
      name: 'Código HTML',
    }),
  }),
}

export default Html
