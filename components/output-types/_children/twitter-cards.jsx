import React from 'react'
import StoryData from '../../utilities/story-data'

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
  const { multimediaLarge, title: seoTitle } = new StoryData({
    data,
    arcSite,
  })
  const image =
    story && multimediaLarge
      ? multimediaLarge
      : deployment(
          `${siteUrl}${contextPath}/resources/dist/${arcSite}/images/logo_twitter.jpg`
        )
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
