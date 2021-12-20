import { useAppContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import * as React from 'react'

import { getAssetsPath } from '../../../utilities/assets'
import {
  SITE_GESTION,
  SITE_TROME,
} from '../../../utilities/constants/sitenames'
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

  const getMainImage = () => {
    if (isSomos)
      return 'https://cloudfront-us-east-1.images.arcpublishing.com/elcomercio/HJJOUB5ZYJDCZLCVEKSSBBWXPE.png'

    let imageLogo = header.logo

    if (arcSite === SITE_GESTION) imageLogo = `white-${header.logo}`
    else if (arcSite === SITE_TROME) imageLogo = 'trome-logo_5.png'

    return `${getAssetsPath(
      arcSite,
      contextPath
    )}/resources/dist/${arcSite}/images/${imageLogo}?d=1`
  }

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
      mainImage={getMainImage()}
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
