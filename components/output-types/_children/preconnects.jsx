import React from 'react'

import { getAssetsPath } from '../../utilities/assets'
import {
  SITE_ELCOMERCIO,
  SITE_ELCOMERCIOMAG,
  SITE_GESTION,
  SITE_PERU21,
  SITE_PERU21G21,
  SITE_DEPOR,
} from '../../utilities/constants/sitenames'

const Preconnects = ({ siteDomain, arcSite, contextPath }) => {
  return (
    <>
      {/**
       * dns-prefetch hace solo DNS lookup.
       * preconnect hace DNS lookup, TLS negotiation, y TCP handshake.
       * -----------------
       * Si el la conexion se hace SIEMPRE, vale la pena usar preconnect
       * (con dns-prefetch como fallback). Si la conexion no se hace siempre,
       * sino algunas veces, es mejor usar solo dns-prefetch para evitar la
       * TLS negotiation, y TCP handshake adicionales sin necesidad.
       *
       * https://web.dev/preconnect-and-dns-prefetch/
       */}
      <link rel="preconnect" href={`//cdnc.${siteDomain}`} />
      <link rel="dns-prefetch" href={`//cdnc.${siteDomain}`} />
      <link
        rel="preconnect"
        href={getAssetsPath(arcSite, contextPath).replace('https:', '')}
      />
      <link
        rel="dns-prefetch"
        href={getAssetsPath(arcSite, contextPath).replace('https:', '')}
      />
      <link rel="preconnect" href="//d1r08wok4169a5.cloudfront.net" />
      <link rel="dns-prefetch" href="//d1r08wok4169a5.cloudfront.net" />
      <link rel="preconnect" href="//s.go-mpulse.net" />
      <link rel="dns-prefetch" href="//s.go-mpulse.net" />
      <link rel="preconnect" href="//fonts.gstatic.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="preconnect" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//ajax.googleapis.com" />
      <link rel="preconnect" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="preconnect" href="//www.googletagmanager.com/" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com/" />
      {arcSite !== SITE_ELCOMERCIO && arcSite !== SITE_ELCOMERCIOMAG && (
        <>
          <link rel="preconnect" href="//www.facebook.com" />
          <link rel="preconnect" href="//connect.facebook.net" />
        </>
      )}
      <link rel="dns-prefetch" href="//www.facebook.com" />
      <link rel="dns-prefetch" href="//connect.facebook.net" />
      <link rel="preconnect" href="//tags.bluekai.com" />
      <link rel="dns-prefetch" href="//tags.bluekai.com" />
      <link rel="preconnect" href="//tags.bkrtx.com" />
      <link rel="dns-prefetch" href="//tags.bkrtx.com" />
      <link rel="preconnect" href="//static.chartbeat.com/" />
      <link rel="dns-prefetch" href="//static.chartbeat.com/" />
      <link rel="preconnect" href="//mab.chartbeat.com/" />
      <link rel="dns-prefetch" href="//mab.chartbeat.com/" />
      <link rel="preconnect" href="//scomcluster.cxense.com/" />
      <link rel="dns-prefetch" href="//scomcluster.cxense.com/" />
      <link rel="preconnect" href="//sb.scorecardresearch.com/" />
      <link rel="dns-prefetch" href="//sb.scorecardresearch.com/" />
      <link rel="preconnect" href="//cdn.cxense.com" />
      <link rel="dns-prefetch" href="//cdn.cxense.com" />
      {arcSite === SITE_ELCOMERCIO ||
        arcSite === SITE_GESTION ||
        arcSite === SITE_PERU21 ||
        arcSite === SITE_PERU21G21 ||
        (arcSite === SITE_DEPOR && (
          <>
            <link rel="preconnect" href="//arc-subs-sdk.s3.amazonaws.com" />
            <link rel="dns-prefetch" href="//arc-subs-sdk.s3.amazonaws.com" />
          </>
        ))}
      <link rel="dns-prefetch" href="//acdn.adnxs.com" />
      {arcSite === SITE_ELCOMERCIO && (
        <>
          <link
            rel="preload"
            as="font"
            crossOrigin="crossorigin"
            type="font/woff2"
            href="https://cdna.elcomercio.pe/resources/dist/elcomercio/fonts/libre-franklin-v4-latin-500.woff2"
          />
          <link
            rel="preload"
            as="font"
            crossOrigin="crossorigin"
            type="font/woff2"
            href="https://cdna.elcomercio.pe/resources/dist/elcomercio/fonts/noto-serif-sc-v6-latin-500.woff2"
          />
        </>
      )}
    </>
  )
}

export default Preconnects
