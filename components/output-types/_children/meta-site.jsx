import React from 'react'
import {
  deleteQueryString,
  addSlashToEnd,
  createMarkup,
} from '../../utilities/helpers'
import ConfigParams from '../../utilities/config-params'
import { getAssetsPath } from '../../utilities/constants'

export default ({
  deployment,
  // isStory,
  isAmp,
  siteName = '',
  siteUrl = '',
  colorPrimary = '',
  socialNetworks = [],
  charbeatAccountNumber = '',
  siteDomain = '',
  requestUri = '',
  arcSite = '',
  contextPath = '',
  isLite = false,
  CURRENT_ENVIRONMENT,
  Resource,
  isStyleBasic = false,
} = {}) => {
  const logoSite = `${getAssetsPath(
    arcSite,
    contextPath
  )}/resources/dist/${arcSite}/images/logo-${arcSite}.jpg`

  const structuredData = `{"@context" : "http://schema.org", "@type" : "Organization", "name" : "${siteName}", "url" : "${siteUrl}/", "logo": "${deployment(
    `${logoSite}`
  )}",  "sameAs" : [ ${socialNetworks.map(social => `"${social.url}"`)} ] }`

  const structuredDataEco = `{"@context" : "http://schema.org", "@type" : "Organization", "legalName":"Empresa Editora El Comercio", "name" : "${siteName}", "url" : "${siteUrl}/", "logo": "${deployment(
    `${logoSite}`
  )}", "foundingDate":"1839", "founders":[ { "@type":"Person", "name":"Manuel Amunátegui"}, { "@type":"Person", "name":"Alejandro Villota"  } ],  "address":{ "@type":"PostalAddress","streetAddress":"Jr. Santa Rosa #300 Lima 1 Perú","addressLocality":"Lima Cercado","addressRegion":"LIMA",  "postalCode":"15001", "addressCountry":"PERU" }, "contactPoint":{       "@type":"ContactPoint",      "contactType":"customer service",      "contactOption" : "TollFree",      "telephone":"[+51-311-6310]", "email":"diario.elcomerciope@gmail.com"    }, "sameAs" : [ ${socialNetworks.map(
    social => `"${social.url}"`
  )} ] }`

  const structuredNavigation = `{"@context":"https://schema.org","@graph":[{"@context":"https://schema.org","@type":"SiteNavigationElement","name":"Opinión","url":"https://elcomercio.pe/opinion/"},{"@context":"https://schema.org","@type":"SiteNavigationElement","name":"Política","url":"https://elcomercio.pe/politica/"},{"@context":"https://schema.org","@type":"SiteNavigationElement","name":"Lima","url":"https://elcomercio.pe/lima/"},{"@context":"https://schema.org","@type":"SiteNavigationElement","name":"Economía","url":"https://elcomercio.pe/economia/"},{"@context":"https://schema.org","@type":"SiteNavigationElement","name":"Mundo","url":"https://elcomercio.pe/mundo/"},{"@context":"https://schema.org","@type":"SiteNavigationElement","name":"Deporte Total","url":"https://elcomercio.pe/deporte-total/"},{"@context":"https://schema.org","@type":"SiteNavigationElement","name":"Perú","url":"https://elcomercio.pe/peru/"},{"@context":"https://schema.org","@type":"SiteNavigationElement","name":"Videos","url":"https://elcomercio.pe/videos/"},{"@context":"https://schema.org","@type":"SiteNavigationElement","name":"Luces","url":"https://elcomercio.pe/luces/"},{"@context":"https://schema.org","@type":"SiteNavigationElement","name":"TV+","url":"https://elcomercio.pe/tvmas/"},{"@context":"https://schema.org","@type":"SiteNavigationElement","name":"Tecnología","url":"https://elcomercio.pe/tecnologia/"},{"@context":"https://schema.org","@type":"SiteNavigationElement","name":"Somos","url":"https://elcomercio.pe/somos/"},{"@context":"https://schema.org","@type":"SiteNavigationElement","name":"Redes Sociales","url":"https://elcomercio.pe/redes-sociales/"},{"@context":"https://schema.org","@type":"SiteNavigationElement","name":"Gastronomía","url":"https://elcomercio.pe/gastronomia/"},{"@context":"https://schema.org","@type":"SiteNavigationElement","name":"Viú","url":"https://elcomercio.pe/viu/"}]}`

  const charbeatScript = `
          var _sf_async_config = _sf_async_config || {}
          /** CONFIGURATION START **/
          _sf_async_config.uid = ${charbeatAccountNumber} // ACCOUNT NUMBER
          _sf_async_config.domain = "${siteDomain}" // DOMAIN TRACKED
          _sf_async_config.flickerControl = false
          _sf_async_config.useCanonical = true
          var _sf_startpt = new Date().getTime()
          /** CONFIGURATION END **/`

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

  const style = 'style'
  let styleUrl = `${contextPath}/resources/dist/${arcSite}/css/${style}.css`
  if (CURRENT_ENVIRONMENT === 'prod') {
    styleUrl = `https://cdnc.${siteDomain}/dist/${arcSite}/css/${style}.css`
  }
  if (arcSite === 'elcomerciomag' && CURRENT_ENVIRONMENT === 'prod') {
    styleUrl = `https://cdnc.mag.elcomercio.pe/dist/${arcSite}/css/${style}.css`
  }
  if (arcSite === 'peru21g21' && CURRENT_ENVIRONMENT === 'prod') {
    styleUrl = `https://cdnc.g21.peru21.pe/dist/${arcSite}/css/${style}.css`
  }

  return (
    <>
      {isStyleBasic ? (
        <>
          <Resource path={`resources/dist/${arcSite}/css/basic.css`}>
            {({ data }) => {
              return data ? (
                <style
                  dangerouslySetInnerHTML={createMarkup(
                    data
                      .replace('@charset "UTF-8";', '')
                      .replace('-----------', '')
                  )}
                />
              ) : null
            }}
          </Resource>
        </>
      ) : (
        <>
          {isAmp === false && isLite === false && (
            <link rel="stylesheet" href={deployment(styleUrl)} />
          )}
        </>
      )}
      <link
        rel="shortcut icon"
        type="image/png"
        href={deployment(
          `${getAssetsPath(
            arcSite,
            contextPath
          )}/resources/dist/${arcSite}/images/favicon.png`
        )}
      />
      {isAmp === false && (
        <>
          <link
            rel="apple-touch-icon"
            href={deployment(
              `${getAssetsPath(
                arcSite,
                contextPath
              )}/resources/dist/${arcSite}/images/apple-touch-icon.png`
            )}
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href={deployment(
              `${getAssetsPath(
                arcSite,
                contextPath
              )}/resources/dist/${arcSite}/images/apple-touch-icon-76x76.png`
            )}
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href={deployment(
              `${getAssetsPath(
                arcSite,
                contextPath
              )}/resources/dist/${arcSite}/images/apple-touch-icon-120x120.png`
            )}
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href={deployment(
              `${getAssetsPath(
                arcSite,
                contextPath
              )}/resources/dist/${arcSite}/images/apple-touch-icon-144x144.png`
            )}
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href={deployment(
              `${getAssetsPath(
                arcSite,
                contextPath
              )}/resources/dist/${arcSite}/images/apple-touch-icon-152x152.png`
            )}
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={deployment(
              `${getAssetsPath(
                arcSite,
                contextPath
              )}/resources/dist/${arcSite}/images/apple-touch-icon-180x180.png`
            )}
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
      {arcSite === ConfigParams.SITE_ELCOMERCIO ? (
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
      {isAmp !== true && (
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{ __html: charbeatScript }}
        />
      )}
    </>
  )
}
