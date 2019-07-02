import React from 'react'

export function Icon({ contextPath, assets }) {
  const { path } = assets
  return (
    <>
      <link
        rel="icon"
        type="image/x-icon"
        href={`${contextPath}${path.concat('favicon.ico')}`}
      />
      <link
        rel="shortcut icon"
        href={`${contextPath}${path.concat('favicon.ico')}`}
      />
      <link
        rel="apple-touch-icon"
        href={`${contextPath}${path.concat('apple-touch-icon.png')}`}
      />
      <link
        rel="apple-touch-icon"
        sizes="76x76"
        href={`${contextPath}${path.concat('apple-touch-icon-76x76.png')}`}
      />
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href={`${contextPath}${path.concat('apple-touch-icon-120x120.png')}`}
      />
      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href={`${contextPath}${path.concat('apple-touch-icon-144x144.png')}`}
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href={`${contextPath}${path.concat('apple-touch-icon-152x152.png')}`}
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={`${contextPath}${path.concat('apple-touch-icon-180x180.png')}`}
      />
    </>
  )
}

export function Theme({ colorPrimary, siteName }) {
  return (
    <>
      <meta name="theme-color" content={colorPrimary} />
      <meta name="msapplication-TileColor" content={colorPrimary} />
      <meta name="apple-mobile-web-app-title" content={siteName} />
      <meta name="application-name" content={siteName} />
    </>
  )
}
