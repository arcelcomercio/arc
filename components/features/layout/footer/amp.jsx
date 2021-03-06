import React from 'react'
import { ENVIRONMENT } from 'fusion:environment'
import { useFusionContext } from 'fusion:context'
import StoryData from '../../../utilities/story-data'
import StoriesRecent from '../../../global-components/stories-recent'
import { formatHtmlToText } from '../../../utilities/helpers'
import { SITE_GESTION } from '../../../utilities/constants/sitenames'

const classes = {
  footer: 'amp-footer footer flex items-center pt-25 pb-25 mx-auto w-full',
  footerInfo: 'amp-footer__info m-0 mx-auto',
  footerLogoContainer:
    'amp-footer__text font-bold uppercase secondary-font pr-25 text-xl line-h-xs',
  nextPageSeparator: 'amp-footer__next-page-separator mx-auto w-full',
  nextPageSeparatorText:
    'amp-footer__next-page-separator-text text-center text-xs text-gray-200 secondary-font',
}

const LayoutAmpFooter = () => {
  const {
    globalContent: data = {},
    arcSite,
    deployment,
    contextPath,
    siteProperties: { siteUrl },
  } = useFusionContext()

  const { primarySection, primarySectionLink, id } = new StoryData({
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
  const pathUrl = ENVIRONMENT === 'elcomercio' ? siteUrl : ``

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
            "title":"${formatHtmlToText(instance.title)}",
            "ampUrl":"${pathUrl}${
        instance.websiteLink
      }?outputType=amp&next=${index + 1}"
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
      {arcSite === SITE_GESTION && (
        <>
          <div className={classes.nextPageSeparator} separator>
            <p className={classes.nextPageSeparatorText}>SIGUIENTE ART??CULO</p>
          </div>
          <amp-next-page>
            <script
              type="application/json"
              dangerouslySetInnerHTML={{ __html: structuredRecent }}
            />
          </amp-next-page>
        </>
      )}
      <footer className={classes.footer}>
        <div className={classes.footerInfo}>
          <a href={primarySectionLink} className={classes.footerLogoContainer}>
            <span>Ver m??s de {primarySection}</span>
          </a>
        </div>
      </footer>
    </>
  )
}

LayoutAmpFooter.label = 'Pie de P??gina'

export default LayoutAmpFooter
