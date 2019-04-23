import React from 'react'
import PropTypes from 'prop-types'

const classes = 'content-grid-base col-1'

export default function Content1Col(props) {
  const { children = {}, customFields: { staticHeight } = {} } = props

  return (
    <section className={`${classes} ${staticHeight ? 'row-1' : ''}`}>
      {children}
    </section>
  )
}

Content1Col.propTypes = {
  customFields: PropTypes.shape({
    staticHeight: PropTypes.bool.tag({
      name: '¿Alto fijo?',
    }),
  }),
}
