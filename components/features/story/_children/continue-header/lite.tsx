import { useAppContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import * as React from 'react'
import { Story } from 'types/story'

import { getAssetsPath } from '../../../../utilities/assets'

const classes = {
  header: 'h-continuous f f-center pos-rel',
  somos: 'h-continuous--somos',
  image: 'h-continuous__img',
  anchor: 'h-continuous__anchor pos-abs',
  svg: 'h-continuous__svg',
}

interface Props {
  hideAnchor: boolean
  title: string
  metaTitle: string
}

const StoryChildrenContinueHeader: React.FC<Props> = (props) => {
  const { hideAnchor, title = '', metaTitle } = props

  const { arcSite, requestUri, contextPath, metaValue } = useAppContext<Story>()
  const {
    siteDomain,
    siteTitle,
    assets: { header },
  } = getProperties(arcSite)

  const isSomos = requestUri.includes('/somos/')
  const isDeporPlay = /^\/depor-play\//.test(requestUri)
  const mainImage = isSomos
    ? 'https://cloudfront-us-east-1.images.arcpublishing.com/elcomercio/HJJOUB5ZYJDCZLCVEKSSBBWXPE.png'
    : `${getAssetsPath(
        arcSite,
        contextPath
      )}/resources/dist/${arcSite}/images/${header.logo}?d=1`

  const storyTitleRe = metaTitle || title

  const seoTitle =
    metaValue('title') &&
    !metaValue('title').match(/content/) &&
    metaValue('title')

  const titleSeo = `${seoTitle}: ${
    storyTitleRe ? storyTitleRe.substring(0, 70) : ''
  } | ${siteTitle.toUpperCase()}`

  return (
    <>
      <header
        className={`${classes.header} ${isSomos ? classes.somos : ''}`}
        id="h-continuous">
        <a
          itemProp="url"
          href={`${isDeporPlay ? '/depor-play/' : '/'}`}
          title={siteDomain}>
          <img
            className={classes.image}
            src={mainImage}
            alt={titleSeo}
            title={titleSeo}
          />
        </a>
        {hideAnchor ? null : (
          <>
            <button
              type="button"
              aria-label="Ir al inicio de la página"
              id="h-anchor"
              className={classes.anchor}
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }
              }}>
              <svg
                className={classes.svg}
                aria-disabled="true"
                width="25"
                viewBox="0 0 451.8 451.8">
                <path d="M345.4 248.3L151.2 442.6c-12.4 12.4-32.4 12.4-44.7 0 -12.4-12.4-12.4-32.4 0-44.7L278.3 225.9 106.4 54c-12.4-12.4-12.4-32.4 0-44.7 12.4-12.4 32.4-12.4 44.8 0l194.3 194.3c6.2 6.2 9.3 14.3 9.3 22.4C354.7 234 351.6 242.1 345.4 248.3z" />
              </svg>
            </button>
          </>
        )}
      </header>
    </>
  )
}

export default StoryChildrenContinueHeader
