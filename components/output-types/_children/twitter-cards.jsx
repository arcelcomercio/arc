import React from 'react'

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
}) => {
  return (
    <>
      {/* <!-- Twitter Cards --> */}
      <meta
        name="twitter:card"
        content={story ? 'summary_large_image' : 'summary'}
      />
      <meta name="twitter:site" content={twitterUser} />
      <meta name="twitter:title" content={title} />
      <meta
        name="twitter:image"
        content={deployment(
          `${siteUrl}${contextPath}/resources/dist/${arcSite}/images/logo.png`
        )}
      />
      <meta name="twitter:description" content={description} />
      {story && <meta name="twitter:creator" content={twitterCreator} />}
    </>
  )
}
