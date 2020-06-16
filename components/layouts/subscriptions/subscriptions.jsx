import React from 'react'
import PropTypes from 'prop-types'

const Subscriptions = ({ children = [] }) => {
  return (
    <>
      <div>{children[0]}</div>
      <div>
        <div role="main">{children[1]}</div>
      </div>
      <div>
        <div>{children[2]}</div>
      </div>
    </>
  )
}

Subscriptions.propTypes = {
  children: PropTypes.node,
}

Subscriptions.sections = ['Cabecera de página', 'Contenido', 'Pie de página']

export default Subscriptions
