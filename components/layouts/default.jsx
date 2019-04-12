import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const DefaultLayout = ({ children = [] }) => {
  return (
    <Fragment>
      <div>
        <header>{children[0]}</header>
      </div>
      <div>
        <div>{children[1]}</div>
        <section>
          <article>{children[2]}</article>

          <aside>{children[3]}</aside>
        </section>

        <footer>{children[4]}</footer>
      </div>
    </Fragment>
  )
}

DefaultLayout.propTypes = {
  children: PropTypes.node,
}

DefaultLayout.sections = [
  'header',
  'top-furniture',
  'main',
  'sidebar',
  'footer',
]

export default DefaultLayout
