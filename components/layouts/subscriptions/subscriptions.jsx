import React from 'react'
import PropTypes from 'prop-types'

const SubscriptionsLayout = ({ children = [] }) => {
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

SubscriptionsLayout.propTypes = {
  children: PropTypes.node,
}

SubscriptionsLayout.sections = [
  'Cabecera de página',
  'Contenido',
  'Pie de página',
]

export default SubscriptionsLayout
