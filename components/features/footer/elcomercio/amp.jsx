import { useFusionContext } from 'fusion:context'
import React from 'react'
import StoryData from '../../../utilities/story-data'

const classes = {
  footer: 'amp-footer footer flex items-center pt-25 pb-25 mx-auto w-full',
  footerInfo: 'amp-footer__info m-0 mx-auto',
  footerLogoContainer:
    'amp-footer__text font-bold uppercase secondary-font pr-25 text-xl line-h-xs',
  nextPageSeparator: 'amp-footer__next-page-separator mx-auto w-full',
  nextPageSeparatorText:
    'amp-footer__next-page-separator-text text-center text-xs text-gray-200 secondary-font',
}

const FooterElComercioAmp = () => {
  const {
    globalContent: data = {},
    arcSite,
    contextPath,
    siteProperties: { siteUrl },
  } = useFusionContext()

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
          <a href={primarySectionLink} className={classes.footerLogoContainer}>
            <span>Ver más de {primarySection}</span>
          </a>
        </div>
      </footer>
    </>
  )
}

FooterElComercioAmp.label = 'Pie de Página'

export default FooterElComercioAmp
