import PropTypes from 'prop-types'
import React from 'react'

const SubscriptionsLayout = ({ children = [] }) => (
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

SubscriptionsLayout.propTypes = {
  children: PropTypes.node,
}

SubscriptionsLayout.sections = [
  'Cabecera de página',
  'Contenido',
  'Pie de página',
]

export default SubscriptionsLayout
