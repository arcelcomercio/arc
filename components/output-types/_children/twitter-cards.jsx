import React from 'react'
import StoryData from '../../utilities/story-data'
import ConfigParams from '../../utilities/config-params'
import { getAssetsPath } from '../../utilities/constants'

export default ({
  twitterUser,
  title,
  siteUrl,
  contextPath,
  arcSite,
  description,
  twitterCreator,
  story,
  deployment = () => {},
  globalContent: data,
}) => {
  const {
    multimediaLarge,
    title: seoTitle,
    authorImage,
    primarySectionLink,
  } = new StoryData({
    data,
    arcSite,
  })
  let image =
    story && multimediaLarge
      ? multimediaLarge
      : deployment(
          arcSite === 'elcomercio'
            ? `${getAssetsPath(
                arcSite,
                contextPath
              )}/resources/dist/${arcSite}/images/logo_twitter.jpg`
            : `${siteUrl}${contextPath}/resources/dist/${arcSite}/images/logo_twitter.jpg`
        )

  if (
    arcSite === ConfigParams.SITE_DIARIOCORREO &&
    primarySectionLink === '/opinion/'
  ) {
    image = authorImage
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
