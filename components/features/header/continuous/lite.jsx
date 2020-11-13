import React from 'react'
import { useAppContext } from 'fusion:context'
import getProperties from 'fusion:properties'

import { getAssetsPath } from '../../../utilities/assets'
import HeaderContinuousChild from './_lite/_children/header'

const HeaderContinuous = () => {
  const {
    arcSite,
    requestUri,
    contextPath,
    globalContent,
    metaValue,
  } = useAppContext()
  const { siteDomain, siteTitle } = getProperties(arcSite)

  const isSomos = requestUri.includes('/somos/')
  const mainImage = isSomos
    ? 'https://cloudfront-us-east-1.images.arcpublishing.com/elcomercio/HJJOUB5ZYJDCZLCVEKSSBBWXPE.png'
    : `${getAssetsPath(
        arcSite,
        contextPath
      )}/resources/dist/elcomercio/images/logo.png?d=1`

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
      isSomos={isSomos}
    />
  )
}

HeaderContinuous.label = 'Cabecera Continua'

export default HeaderContinuous
