// import PropTypes from 'prop-types'
import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'

const classes = {
  footer: 'amp-footer flex items-center pt-25 pb-25',
  footerInfo: 'amp-footer__info m-0 mx-auto',
  footerLogoContainer:
    'amp-footer__text font-bold uppercase inline-b primary-font pr-25',
}

@Consumer
class LayoutAmpFooter extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {
      contextPath,
      requestUri,
      globalContent: { taxonomy: { primary_section: { name = '' } = {} } } = {},
    } = this.props

    const querys = requestUri.split('?')[1]
    const queryString = querys !== undefined ? `?${querys}` : ''

    return (
      <footer className={classes.footer}>
        <div className={classes.footerInfo}>
          <a
            href={`${contextPath || ''}/${queryString}`}
            className={classes.footerLogoContainer}>
            <span>Ver más de {name}</span>
          </a>
        </div>
      </footer>
    )
  }
}

LayoutAmpFooter.label = 'Pie de Página'
export default LayoutAmpFooter
