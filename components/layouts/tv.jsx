import React from 'react'
import PropTypes from 'prop-types'

const classes = {
  layout: 'tv-layout',
  content: 'tv-layout__content mx-auto',
}

const TvLayout = ({ children = [] }) => {
  return (
    <div className={classes.layout}>
      <div className={classes.content}>
        <div role="main">{children[0]}</div>
        {children[1]}
      </div>
    </div>
  )
}

TvLayout.propTypes = {
  children: PropTypes.node,
}

TvLayout.sections = ['Contenido', 'Pie de página']

export default TvLayout
