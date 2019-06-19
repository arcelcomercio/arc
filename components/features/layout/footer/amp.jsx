// import PropTypes from 'prop-types'
import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import StoryData from '../../../utilities/story-data'

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
      arcSite,
      siteUrl,
      globalContent: data = {},
    } = this.props

    const { primarySection, primarySectionLink } = new StoryData({
      data,
      arcSite,
      contextPath,
      siteUrl,
    })

    return (
      <>
        <footer className={classes.footer}>
          <div className={classes.footerInfo}>
            <a
              href={`${contextPath || ''}${primarySectionLink}`}
              className={classes.footerLogoContainer}>
              <span>Ver más de {primarySection}</span>
            </a>
          </div>
        </footer>
      </>
    )
  }
}

LayoutAmpFooter.label = 'Pie de Página'
export default LayoutAmpFooter
