import React from 'react'

const dataLD = `{
          "@context" : "http://schema.org",
          "@type" : "Organization",
          "name" : "Nombre Sitio",
          "url" : "https://sitio.pe/",
          "logo": "https://sitio.pe/[ruta_images]/logo-sitio.jpg",
          "sameAs" : [
          "https://www.facebook.com/nombresitio",
          "https://twitter.com/nombresitio",
          "https://www.youtube.com/user/nombresitio",
          "https://www.pinterest.es/nombresitio/"
          ]
        }`

export default ({
  children,
  contextPath,
  deployment,
  arcSite,
  CssLinks,
  Fusion,
  Libs,
  MetaTags,
}) => (
    <html lang="es">
      <head>
        <title>Fusion Article</title>
        <MetaTags />
        <Libs />
        <CssLinks />
        <meta charset="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: dataLD }} />
        <link rel="shortcut icon" href="https://sitio.pe/favicon.ico" />
        <link rel="apple-touch-icon" href="https://sitio.pe/apple-touch-icon.png" />
        <link rel="canonical" href="https://sitio.pe/url-canonical-de-la-pagina" />
        <link
          rel="icon"
          type="image/x-icon"
          href={deployment(
            `${contextPath}/resources/dist/${arcSite}/favicon.ico`
          )}
        />
        <link
          rel="stylesheet"
          href={deployment(
            `${contextPath}/resources/dist/${arcSite}/css/style.css`
          )}
        />
      </head>
      <body>
        <div id="fusion-app">{children}</div>
        <script
          src={deployment(`${contextPath}/resources/dist/${arcSite}/js/index.js`)}
        />
        <Fusion />
      </body>
    </html>
  )
