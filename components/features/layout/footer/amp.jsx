// import PropTypes from 'prop-types'
import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import { pathToFileURL } from 'url'

const classes = {
  footer: 'amp-footer flex items-center pt-25 pb-25',
  footerInfo: 'amp-footer__info m-0 mx-auto',
  footerLogoContainer:
    'amp-footer__text font-bold uppercase inline-block primary-font pr-25 text-xl line-h-xs',
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
      globalContent: {
        taxonomy: { primary_section: { name = '', path } = {} },
      } = {},
    } = this.props

    return (
      <footer className={classes.footer}>
        <div className={classes.footerInfo}>
          <a
            href={`${contextPath || ''}${path}`}
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
