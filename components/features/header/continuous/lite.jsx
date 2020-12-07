import * as React from 'react'
import { useAppContext } from 'fusion:context'
import getProperties from 'fusion:properties'

import { getAssetsPath } from '../../../utilities/assets'

import HeaderContinuousChild from './_lite/_children/header'
import customFields from './_dependencies/custom-fields'

const HeaderContinuous = props => {
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
  const mainImage = isSomos
    ? 'https://cloudfront-us-east-1.images.arcpublishing.com/elcomercio/HJJOUB5ZYJDCZLCVEKSSBBWXPE.png'
    : `${getAssetsPath(
        arcSite,
        contextPath
      )}/resources/dist/${arcSite}/images/${header.logo}?d=1`

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
    />
  )
}

HeaderContinuous.propTypes = {
  customFields,
}

HeaderContinuous.label = 'Cabecera Continua'
HeaderContinuous.static = true

export default HeaderContinuous
