import React from 'react'
import StoryData from '../../utilities/story-data'
import {
  SITE_DIARIOCORREO,
  SITE_ELCOMERCIO,
} from '../../utilities/constants/sitenames'
import { getAssetsPath } from '../../utilities/assets'
import { createResizedParams } from '../../utilities/resizer/resizer'

export default ({
  twitterUser,
  title,
  contextPath,
  arcSite,
  description,
  twitterCreator,
  story,
  globalContent: data,
  requestUri = '',
}) => {
  const {
    multimediaLarge,
    title: seoTitle,
    authorImage,
    primarySectionLink,
    idYoutube,
  } = new StoryData({
    data,
    arcSite,
  })

  const imageYoutube = idYoutube
    ? `https://i.ytimg.com/vi/${idYoutube}/hqdefault.jpg`
    : `${getAssetsPath(
        arcSite,
        contextPath
      )}/resources/dist/${arcSite}/images/logo_twitter.jpg?d=1`

  let image =
    story && multimediaLarge && !idYoutube
      ? createResizedParams({
          url: multimediaLarge,
          presets: 'large:980x528',
          arcSite,
        }).large
      : `${imageYoutube}`

  if (arcSite === SITE_DIARIOCORREO && primarySectionLink === '/opinion/') {
    image = authorImage
  }
  if (arcSite === SITE_ELCOMERCIO && !story) {
    const isSaltarIntro = /^\/saltar-intro\//.test(requestUri)
    const isProvecho = /^\/provecho\//.test(requestUri)
    if (isSaltarIntro) {
      image = `${getAssetsPath(
        arcSite,
        contextPath
      )}/resources/dist/${arcSite}/images/logo_saltar-intro.jpg?d=1`
    } else if (isProvecho) {
      image = `${getAssetsPath(
        arcSite,
        contextPath
      )}/resources/dist/${arcSite}/images/logo_provecho.png?d=1`
    }
  }
  return (
    <>
      {/* <!-- Twitter Cards --> */}
      <meta
        name="twitter:card"
        content={story ? 'summary_large_image' : 'summary'}
      />
      <meta name="twitter:site" content={twitterUser} />

      <meta name="twitter:title" content={story ? seoTitle : title} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:description" content={description} />
      {story && <meta name="twitter:creator" content={twitterCreator} />}
    </>
  )
}
