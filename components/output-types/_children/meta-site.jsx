import React from 'react'
import { addSlashToEnd } from '../../utilities/parse/strings'
import { deleteQueryString } from '../../utilities/parse/queries'
import { SITE_ELCOMERCIO } from '../../utilities/constants/sitenames'
import { getAssetsPath } from '../../utilities/assets'
import Trust from './trust'

export default ({
  isAmp,
  siteName = '',
  siteUrl = '',
  colorPrimary = '',
  socialNetworks = [],
  requestUri = '',
  arcSite = '',
  contextPath = '',
} = {}) => {
  const logoSite = `${getAssetsPath(
    arcSite,
    contextPath
  )}/resources/dist/${arcSite}/images/logo-${arcSite}.jpg?d=1`

  const structuredData = `{"@context" : "http://schema.org", "@type" : "Organization", "name" : "${siteName}", "url" : "${siteUrl}/", "logo": "${logoSite}",  "sameAs" : [ ${socialNetworks.map(
    social => `"${social.url}"`
  )} ] }`

  const structuredDataEco = `{"@context" : "http://schema.org", "@type" : "Organization", "legalName":"Empresa Editora El Comercio", "name" : "${siteName}", "url" : "${siteUrl}/", "logo": "${logoSite}", "foundingDate":"1839", "founders":[ { "@type":"Person", "name":"Manuel Amunátegui"}, { "@type":"Person", "name":"Alejandro Villota"  } ],  "address":{ "@type":"PostalAddress","streetAddress":"Jr. Santa Rosa #300 Lima 1 Perú","addressLocality":"Lima Cercado","addressRegion":"LIMA",  "postalCode":"15001", "addressCountry":"PERU" } }`

  const structuredNavigation = `{"@context":"https://schema.org","@graph":[{"@context":"https://schema.org","@type":"SiteNavigationElement","name":"Opinión","url":"https://elcomercio.pe/opinion/"},{"@context":"https://schema.org","@type":"SiteNavigationElement","name":"Política","url":"https://elcomercio.pe/politica/"},{"@context":"https://schema.org","@type":"SiteNavigationElement","name":"Lima","url":"https://elcomercio.pe/lima/"},{"@context":"https://schema.org","@type":"SiteNavigationElement","name":"Economía","url":"https://elcomercio.pe/economia/"},{"@context":"https://schema.org","@type":"SiteNavigationElement","name":"Mundo","url":"https://elcomercio.pe/mundo/"},{"@context":"https://schema.org","@type":"SiteNavigationElement","name":"Deporte Total","url":"https://elcomercio.pe/deporte-total/"},{"@context":"https://schema.org","@type":"SiteNavigationElement","name":"Perú","url":"https://elcomercio.pe/peru/"},{"@context":"https://schema.org","@type":"SiteNavigationElement","name":"Videos","url":"https://elcomercio.pe/videos/"},{"@context":"https://schema.org","@type":"SiteNavigationElement","name":"Luces","url":"https://elcomercio.pe/luces/"},{"@context":"https://schema.org","@type":"SiteNavigationElement","name":"TV+","url":"https://elcomercio.pe/tvmas/"},{"@context":"https://schema.org","@type":"SiteNavigationElement","name":"Tecnología","url":"https://elcomercio.pe/tecnologia/"},{"@context":"https://schema.org","@type":"SiteNavigationElement","name":"Somos","url":"https://elcomercio.pe/somos/"},{"@context":"https://schema.org","@type":"SiteNavigationElement","name":"Redes Sociales","url":"https://elcomercio.pe/redes-sociales/"},{"@context":"https://schema.org","@type":"SiteNavigationElement","name":"Gastronomía","url":"https://elcomercio.pe/gastronomia/"},{"@context":"https://schema.org","@type":"SiteNavigationElement","name":"Viú","url":"https://elcomercio.pe/viu/"}]}`

  const urlCanonical = deleteQueryString(requestUri)
  const regxTag = /^(\/noticias\/[\wa-zA-ZÀ-ÿ\u00f1\u00d1\d-%]+)\/?(?:\d+)?\/?$/
  const auxUrlCanonicaMatch = urlCanonical.match(regxTag) || []
  const removeAccents = url =>
    decodeURI(url)
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
  const newURLCanonical = urlCanonical.startsWith('/noticias/')
    ? removeAccents(auxUrlCanonicaMatch[1])
    : urlCanonical

  return (
    <>
      <link
        rel="shortcut icon"
        type="image/png"
        href={`${getAssetsPath(
          arcSite,
          contextPath
        )}/resources/dist/${arcSite}/images/favicon.png?d=1`}
      />
      {isAmp === false && (
        <>
          <link
            rel="apple-touch-icon"
            href={`${getAssetsPath(
              arcSite,
              contextPath
            )}/resources/dist/${arcSite}/images/apple-touch-icon.png?d=1`}
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href={`${getAssetsPath(
              arcSite,
              contextPath
            )}/resources/dist/${arcSite}/images/apple-touch-icon-76x76.png?d=1`}
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href={`${getAssetsPath(
              arcSite,
              contextPath
            )}/resources/dist/${arcSite}/images/apple-touch-icon-120x120.png?d=1`}
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href={`${getAssetsPath(
              arcSite,
              contextPath
            )}/resources/dist/${arcSite}/images/apple-touch-icon-144x144.png?d=1`}
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href={`${getAssetsPath(
              arcSite,
              contextPath
            )}/resources/dist/${arcSite}/images/apple-touch-icon-152x152.png?d=1`}
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={`${getAssetsPath(
              arcSite,
              contextPath
            )}/resources/dist/${arcSite}/images/apple-touch-icon-180x180.png?d=1`}
          />
        </>
      )}
      {isAmp !== true && (
        <link
          rel="canonical"
          href={`${siteUrl}${(newURLCanonical !== '/homepage' &&
            addSlashToEnd(newURLCanonical)) ||
            '/'}`}
        />
      )}

      <meta name="theme-color" content={colorPrimary} />
      <meta name="msapplication-TileColor" content={colorPrimary} />
      <meta name="apple-mobile-web-app-title" content={siteName} />
      <meta name="application-name" content={siteName} />
      {arcSite === SITE_ELCOMERCIO ? (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: structuredDataEco }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: structuredNavigation }}
          />
        </>
      ) : (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: structuredData }}
        />
      )}
      <Trust arcSite={arcSite} siteUrl={siteUrl} siteName={siteName} />
    </>
  )
}
