import React, { Fragment } from 'react'

export default  ({ sectionName = '', siteName = '', siteUrl = '' }) => {
  return (
    <Fragment>
      {siteName === '' && siteName === '' && siteUrl === '' && (
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${siteName} - ${sectionName}`}
          href={`${siteUrl}/feed/${sectionName}`}
        />
      )}
    </Fragment>
  )
}


