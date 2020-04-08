import React from 'react'

export default ({ globalContent, requestUri, siteName = '', siteUrl = '' }) => {
  const { sectionName = '' } = globalContent || {}

  return (
    <link
      rel="alternate"
      type="application/rss+xml"
      title={`${siteName}${sectionName && ` - ${sectionName}`}`}
      href={`${siteUrl}/arcio/rss/category${requestUri || ''}`}
    />
  )
}
