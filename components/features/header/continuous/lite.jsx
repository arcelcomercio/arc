import { useAppContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import * as React from 'react'

import { getAssetsPath } from '../../../utilities/assets'
import { SITE_GESTION } from '../../../utilities/constants/sitenames'
import customFields from './_dependencies/custom-fields'
import HeaderContinuousChild from './_lite/_children/header'

const HeaderContinuous = (props) => {
  const { customFields: { hideAnchor } = {} } = props
  const {
    arcSite,
    requestUri,
    contextPath,
    globalContent,
    metaValue,
  } = useAppContext()
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
      )}/resources/dist/${arcSite}/images/${
        arcSite === SITE_GESTION && 'white-'
      }${header.logo}?d=1`

  const {
    headlines: { basic: storyTitle = '', meta_title: StoryMetaTitle = '' } = {},
  } = globalContent || {}

  const storyTitleRe = StoryMetaTitle || storyTitle

  const seoTitle =
    metaValue('title') &&
    !metaValue('title').match(/content/) &&
    metaValue('title')

  const title = `${seoTitle}: ${
    storyTitleRe ? storyTitleRe.substring(0, 70) : ''
  } | ${siteTitle.toUpperCase()}`

  return (
    <HeaderContinuousChild
      title={title}
      siteDomain={siteDomain}
      mainImage={mainImage}
      hideAnchor={hideAnchor}
      isSomos={isSomos}
      isDeporPlay={isDeporPlay}
    />
  )
}

HeaderContinuous.propTypes = {
  customFields,
}

HeaderContinuous.label = 'Cabecera Continua'
HeaderContinuous.static = true

export default HeaderContinuous
