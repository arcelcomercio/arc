import Consumer from 'fusion:consumer'
import React, { Component, Fragment } from 'react'
import './default.scss'
import PropTypes from 'prop-types'

@Consumer
class ManualNote extends Component {

  render() {

    return (
      <Fragment>

      </Fragment>
    )
  }
}

ManualNote.propTypes = {
  customFields: PropTypes.shape({

  })
};

export default ManualNote