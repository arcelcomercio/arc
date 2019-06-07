import React from 'react'

export default ({
  twitterUser,
  title,
  siteUrl,
  contextPath,
  arcSite,
  description,
  twitterCreator,
  article,
  deployment = () => {},
}) => {
  return (
    <>
      {/* <!-- Twitter Cards --> */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content={twitterUser} />
      <meta name="twitter:title" content={title} />
      <meta
        name="twitter:image"
        content={deployment(
          `${siteUrl}${contextPath}/resources/dist/${arcSite}/images/logo.png`
        )}
      />
      <meta name="twitter:description" content={description} />
      {article && <meta name="twitter:creator" content={twitterCreator} />}
    </>
  )
}
