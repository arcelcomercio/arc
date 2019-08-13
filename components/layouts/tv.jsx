import React from 'react'
import PropTypes from 'prop-types'

import ENV from 'fusion:environment'

const GOLDFISH_ENV = ENV.ENVIRONMENT === 'elcomercio' ? 'prod' : 'sandbox'

const classes = {
  layout: 'tv-layout',
  content: 'tv-layout__content mx-auto',
}

const TvLayout = ({ children = [] }) => {
  return (
    <>
      <div className={classes.layout}>
        <div className={classes.content}>
          <div role="main">{children[0]}</div>
          {children[1]}
        </div>
      </div>
      <script
        async
        src={`https://d1tqo5nrys2b20.cloudfront.net/${GOLDFISH_ENV}/powaBoot.js?org=elcomercio`}
      />
    </>
  )
}

TvLayout.propTypes = {
  children: PropTypes.node,
}

TvLayout.sections = ['Contenido', 'Pie de página']

export default TvLayout
