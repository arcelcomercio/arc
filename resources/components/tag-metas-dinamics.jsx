import React, { Fragment } from 'react'

export default props => {
  const {
    arcSite,
    tagName,
    siteName,
    titlePage,
    descriptionPage,
    urlSite,
  } = props

  return (
    <Fragment>
      <title>{`${tagName} | ${siteName}`}</title>
      <link rel="canonical" href={`http://${arcSite}/tag-page2.html`} />
      <link rel="prev" href={`https://${arcSite}/tag-page-1.html`} />
      <link rel="next" href={`https://${arcSite}/tag-page-3.html`} />
      <meta
        name="description"
        content={`Todas las noticias de ${tagName} en ${siteName}`}
      />
      <meta name="keywords" content="keyword-1, keyword-2, keyword-3" />
      <meta name="twitter:title" content={`${titlePage}`} />
      <meta name="twitter:description" content={`${descriptionPage}`} />
      <meta property="og:title" content={`${titlePage}`} />
      <meta property="og:description" content={`${descriptionPage}`} />
      <meta property="og:url" content={`${urlSite}`} />
    </Fragment>
  )
}
