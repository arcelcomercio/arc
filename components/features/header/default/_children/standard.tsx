import { useAppContext } from 'fusion:context'
import * as React from 'react'
import { Story } from 'types/story'

import { getAssetsPath } from '../../../../utilities/assets'

export const HeaderDefaultChildrenStandard: React.FC = () => {
  const {
    arcSite,
    contextPath,
    metaValue,
    siteProperties,
    globalContent,
  } = useAppContext<Story>()

  const {
    headlines: { basic: storyTitle = '', meta_title: StoryMetaTitle = '' } = {},
  } = globalContent || {}

  const logoUrl = `${getAssetsPath(
    arcSite,
    contextPath
  )}/resources/dist/elcomercio/images/logo.png?d=1`

  // Lógica para generar un SEO title en el logo, sacado del feature header/inverted
  const storyTitleRe = StoryMetaTitle || storyTitle
  const seoTitle =
    metaValue('title') &&
    !metaValue('title').match(/content/) &&
    metaValue('title')
  const { siteTitle = '' } = siteProperties
  const title = `${seoTitle}: ${
    storyTitleRe ? storyTitleRe.substring(0, 70) : ''
  } | ${siteTitle.toUpperCase()}`
  // --

  return (
    <header className="header-d">
      <div className="header-d__wrap">
        <a href="/" className="header-d__img-url">
          <img
            className="header-d__img"
            src={logoUrl}
            alt={title}
            title={title}
          />
        </a>
        <a
          className="header-d__sub"
          href="/suscripciones/?ref=btn-suscribete-elcomercio&loc=lima">
          Suscríbete
        </a>
      </div>
    </header>
  )
}
