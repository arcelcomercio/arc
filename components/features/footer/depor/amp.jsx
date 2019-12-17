import { useFusionContext } from 'fusion:context'
import ENV from 'fusion:environment'
import React from 'react'
import StoryData from '../../../utilities/story-data'
import StoriesRecent from '../../../global-components/stories-recent'

const classes = {
  footer: 'amp-footer footer flex items-center pt-25 pb-25 mx-auto w-full',
  footerInfo: 'amp-footer__info m-0 mx-auto',
  footerLogoContainer:
    'amp-footer__text font-bold uppercase secondary-font pl-25 pt-15 text-xl line-h-xs',
  nextPageSeparator: 'amp-footer__next-page-separator mx-auto w-full',
  nextPageSeparatorText:
    'amp-footer__next-page-separator-text text-center text-xs text-gray-200 secondary-font',
}

const FooterDeporAmp = () => {
  const {
    deployment,
    arcSite,
    contextPath,
    siteProperties: { siteUrl },
    globalContent: data = {},
  } = useFusionContext()

  const { id, primarySection, primarySectionLink } = new StoryData({
    data,
    arcSite,
    contextPath,
    siteUrl,
  })

  const parameters = {
    primarySectionLink,
    id,
    arcSite,
    cant: 3,
  }
  const resultStoryRecent = StoriesRecent(parameters)
  const pathUrl = ENV.ENVIRONMENT === 'elcomercio' ? siteUrl : ``

  const instance =
    resultStoryRecent &&
    new StoryData({
      deployment,
      contextPath,
      arcSite,
      defaultImgSize: 'sm',
    })
  const dataStorys = resultStoryRecent.map((story, index) => {
    instance.__data = story
    return (
      instance.multimediaLandscapeMD &&
      `{  
       "image":"${instance.multimediaLandscapeMD}",
       "title":"${instance.title}",
       "ampUrl":"${pathUrl}${instance.websiteLink}?outputType=amp&next=${index +
        1}"
          }`
    )
  })

  const structuredRecent = `{  
    "pages": [${dataStorys}],
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
          <a href={primarySectionLink} className={classes.footerLogoContainer}>
            <span>Ver más de {primarySection}</span>
          </a>
        </div>
      </footer>
    </>
  )
}

FooterDeporAmp.label = 'Pie de Página'

export default FooterDeporAmp
