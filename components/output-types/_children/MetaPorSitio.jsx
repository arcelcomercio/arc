/* eslint-disable react/destructuring-assignment */
import React, { Fragment } from 'react'

export default props => {
  return (
    <Fragment>
      <link
        rel="shortcut icon"
        href={`https://${props.siteProperties.siteUrl}/favicon.ico`}
      />
      <link
        rel="apple-touch-icon"
        href={`https://${props.siteProperties.siteUrl}apple-touch-icon.png`}
      />
      <link
        rel="apple-touch-icon"
        sizes="76x76"
        href={`https://${
          props.siteProperties.siteUrl
        }apple-touch-icon-76x76.png`}
      />
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href={`https://${
          props.siteProperties.siteUrl
        }apple-touch-icon-120x120.png`}
      />
      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href={`https://${
          props.siteProperties.siteUrl
        }apple-touch-icon-144x144.png`}
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href={`https://${
          props.siteProperties.siteUrl
        }apple-touch-icon-152x152.png`}
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={`https://${
          props.siteProperties.siteUrl
        }apple-touch-icon-180x180.png`}
      />
      <link
        rel="canonical"
        href={`https://${props.siteProperties.siteUrl}${props.requestUri}`}
      />
      <meta name="theme-color" content={props.siteProperties.colorPrimary} />
      <meta
        name="msapplication-TileColor"
        content={props.siteProperties.colorPrimary}
      />
      <meta
        name="apple-mobile-web-app-title"
        content={props.siteProperties.siteName}
      />
      <meta name="application-name" content={props.siteProperties.siteName} />
      <script type="application/ld+json">
        {JSON.parse(
          `{
            "@context" : "http://schema.org",
            "@type" : "Organization",
            "name" : ${props.siteProperties.siteName},
            "url" : "https://sitio.pe/",
            "logo": "https://sitio.pe/[ruta_images]/logo-sitio.jpg",
            "sameAs" : [
              "https://www.facebook.com/nombresitio",
              "https://twitter.com/nombresitio",
              "https://www.youtube.com/user/nombresitio",
              "https://www.pinterest.es/nombresitio/"
            ]
          }`
        )}
      </script>
    </Fragment>
  )
}
