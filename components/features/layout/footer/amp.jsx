// import PropTypes from 'prop-types'
import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'

const classes = {
  footer: 'amp-footer',
  footerInfo: 'amp-footer__info ',
  footerLogoContainer: 'amp-footer__logo ',
}

@Consumer
class LayoutAmpFooter extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { contextPath, requestUri } = this.props

    const querys = requestUri.split('?')[1]
    const queryString = querys !== undefined ? `?${querys}` : ''

    return (
      <footer className={classes.footer}>
        <div className={classes.footerInfo}>
          <a
            href={`${contextPath || ''}/${queryString}`}
            className={classes.footerLogoContainer}>
            <span>Ir a portada</span>
          </a>
        </div>
      </footer>
    )
  }
}

LayoutAmpFooter.label = 'Pie de Página'
export default LayoutAmpFooter
