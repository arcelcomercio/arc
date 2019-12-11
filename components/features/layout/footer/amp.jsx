import Consumer from 'fusion:consumer'
import ENV from 'fusion:environment'
import React, { PureComponent } from 'react'
import StoryData from '../../../utilities/story-data'
import ConfigParams from '../../../utilities/config-params'

const classes = {
  footer: 'amp-footer footer flex items-center pt-25 pb-25 mx-auto w-full',
  footerInfo: 'amp-footer__info m-0 mx-auto',
  footerLogoContainer:
    'amp-footer__text font-bold uppercase secondary-font pr-25 text-xl line-h-xs',
  nextPageSeparator: 'amp-footer__next-page-separator mx-auto w-full',
  nextPageSeparatorText:
    'amp-footer__next-page-separator-text text-center text-xs text-gray-200 secondary-font',
}

@Consumer
class LayoutAmpFooter extends PureComponent {
  render() {
    const {
      contextPath,
      arcSite,
      siteProperties: { siteUrl },
      globalContent: data = {},
    } = this.props

    const { primarySection, primarySectionLink, recentList } = new StoryData({
      data,
      arcSite,
      contextPath,
      siteUrl,
    })

    const pathUrl = ENV.ENVIRONMENT === 'elcomercio' ? siteUrl : ``
    const recentResult = recentList.map(
      ({ basic, websiteUrl, urlImage } = {}, index) => {
        return (
          urlImage &&
          `{  
              "image":"${urlImage}",
              "title":"${basic}",
              "ampUrl":"${pathUrl}${websiteUrl}?outputType=amp&next=${index +
            1}"
            }`
        )
      }
    )

    const structuredRecent = `{  
      "pages": [${recentResult}],
      "hideSelectors": [
        ".amp-header",
        ".ad-amp-movil",
        ".amp-nav__wrapper",
        ".amp-nav",
        ".footer"
        ]
      }`

    return (
      <>
        <>
          <div className={classes.nextPageSeparator} separator>
            <p className={classes.nextPageSeparatorText}>SIGUIENTE ARTÍCULO</p>
          </div>
          <amp-next-page>
            <script
              type="application/json"
              dangerouslySetInnerHTML={{ __html: structuredRecent }}
            />
          </amp-next-page>
        </>

        <footer className={classes.footer}>
          <div className={classes.footerInfo}>
            <a
              href={primarySectionLink}
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
