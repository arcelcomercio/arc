import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import customFields from './_dependencies/custom-field'

const classes = {
  adsContainer: 'wrap-perured bg-white p-0 pt-10 m-0 mt-10 mb-10',
  header: 'perured__header m-0 mx-auto',
  title: 'perured__title text-left font-bold mb-5',
  adsBox: 'perured__adsbox m-0 mx-auto',
  footer: `perured__footer overflow-hidden h-auto mt-0 mx-auto mb-10 p-0 pl-10 pr-10 flex flex-row-reverse`,
  iconContainer: 'perured__iconContainer pl-10',
  icon: 'perured__icon',
  footerTextContainer: 'perured__textContainer',
  footerText: 'perured__text font-bold m-0',
}
@Consumer
class Ads extends PureComponent {
  render() {
    const {
      isAdmin,
      outputType,
      customFields: { isDesktop, isMobile } = {},
    } = this.props

    const addEmptyBackground = () => (isAdmin ? 'bg-base-100' : '')

    const getHtml = device => {
      return (
        <div
          className={`${classes.adsContainer} ${addEmptyBackground()} ${
            device === 'd' ? 'no-mobile' : 'no-desktop'
          }`}>
          <div className={`${classes.header} perured-header-${device}`}>
            <p className={classes.title}>Anuncios de interés</p>
          </div>
          <div id={`cnt-perured-${device}`} className={classes.adsBox} />
          <div className={`${classes.footer} perured-footer-${device}`}>
            <div className={classes.iconContainer}>
              <img
                src="https://cdn.perured.pe/static/desktop/i/logo_perured.png?pr"
                alt=""
                className={classes.icon}
              />
            </div>
            <div className={classes.footerTextContainer}>
              <p className={classes.footerText}>Recomendado por:</p>
            </div>
          </div>
        </div>
      )
    }

    return (
      <>
        {outputType !== 'amp' && isDesktop && getHtml('d')}
        {outputType !== 'amp' && isMobile && getHtml('m')}
      </>
    )
  }
}

Ads.propTypes = {
  customFields,
}

Ads.label = 'Publicidad PeruRed'

export default Ads
