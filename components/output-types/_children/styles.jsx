import React from 'react'

import {
  SITE_DEPOR,
  SITE_ELBOCON,
  SITE_ELCOMERCIO,
  SITE_ELCOMERCIOMAG,
  SITE_PERU21G21,
  SITE_PERUCOM,
  SITE_TROME,
} from '../../utilities/constants/sitenames'

const Styles = ({
  arcSite,
  requestUri,
  contextPath,
  deployment,
  idMatch,
  isAmp,
  isHome,
  siteDomain = '',
  isLite = false,
  isStory = false,
  CURRENT_ENVIRONMENT,
  Resource,
  isStyleBasic = false,
  isFooterFinal = false,
  metaValue = () => '',
}) => {
  const isStoryMatch = isStory !== '' && idMatch !== ''
  let style = 'style'

  if (
    (arcSite === SITE_ELCOMERCIO ||
      arcSite === SITE_ELCOMERCIOMAG ||
      arcSite === SITE_DEPOR ||
      arcSite === SITE_ELBOCON) &&
    /^\/videos\/(.*)/.test(requestUri)
  )
    style = 'story-video'
  else if (isStoryMatch && arcSite === SITE_ELCOMERCIO) style = 'dstory-video'
  else if (isStoryMatch && arcSite === SITE_ELBOCON) style = 'dstory-video'
  else if (isStoryMatch && arcSite === SITE_DEPOR) style = 'match-score'
  else if (requestUri.includes('/trivias/')) style = 'trivias'
  else if (metaValue('section_style') === 'resultados_elecciones')
    style = 'elecciones-2021'
  else if (metaValue('section_style') === 'agenda_presidencial')
    style = 'agenda-presidencial'
  else if (metaValue('section_style') === 'premios_depor')
    style = 'premios-depor'
  else if (!isStory && metaValue('section_style') === 'provecho')
    style = 'provecho'
  // else if (requestUri.includes('/covid-19/')) style = 'covid'
  else if (/^\/covid-19\//.test(requestUri)) style = 'covid'
  else if (isStory && (arcSite === SITE_ELCOMERCIO || arcSite === SITE_DEPOR))
    style = 'story'
  else if (
    isStory &&
    arcSite === SITE_ELCOMERCIOMAG &&
    requestUri.includes('/recetas/')
  )
    style = 'story-recetas'
  else if (requestUri.includes('/saltar-intro/') && arcSite === SITE_ELCOMERCIO)
    style = 'saltar-intro'
  // else if (requestUri.includes('/provecho/') && arcSite === SITE_ELCOMERCIO) style = 'provecho'
  else if (
    requestUri.includes('/mas-especiales/') ||
    requestUri.includes('/especiales/')
  )
    style = 'specials'
  else if (arcSite === SITE_TROME && /^\/pollon-eliminatorias/.test(requestUri))
    style = 'polla'

  style = isHome && arcSite === SITE_ELCOMERCIO ? 'basic' : style
  style = isHome && arcSite === SITE_TROME ? 'home-v2' : style

  if (metaValue('section_style') === 'landing-v2-home') {
    style = 'landing-v2-home'
  }

  let styleUrl = `${contextPath}/resources/dist/${arcSite}/css/${style}.css`

  if (arcSite === SITE_ELCOMERCIOMAG && CURRENT_ENVIRONMENT === 'prod') {
    styleUrl = `https://cdnc.mag.elcomercio.pe/dist/${arcSite}/css/${style}.css`
  } else if (arcSite === SITE_PERU21G21 && CURRENT_ENVIRONMENT === 'prod') {
    styleUrl = `https://cdnc.g21.peru21.pe/dist/${arcSite}/css/${style}.css`
  } else if (arcSite === SITE_PERUCOM && CURRENT_ENVIRONMENT === 'prod') {
    styleUrl = `https://cdnc.elcomercio.pe/dist/${arcSite}/css/${style}.css`
  } else if (CURRENT_ENVIRONMENT === 'prod') {
    styleUrl = `https://cdnc.${siteDomain}/dist/${arcSite}/css/${style}.css`
  }

  let styleDefault = isStyleBasic ? 'basic' : ''
  styleDefault =
    style === 'dstory' && isAmp === false && isLite === false
      ? style
      : styleDefault

  styleDefault = isFooterFinal ? 'dstory-video' : styleDefault
  styleDefault =
    requestUri.includes('/trivias/') && isAmp === false ? style : styleDefault
  // Cambio temporal, resumen 2020 por el momento solo usa una hoja de estilos para todas las marcas
  if (metaValue('section_style') === 'resumen_2020') {
    style = 'resumen-2020'
    styleUrl = `${contextPath}/resources/dist/elcomercio/css/${style}.css`
  }

  if (metaValue('section_style') === 'polla') {
    style = 'polla'
    styleUrl = `${contextPath}/resources/dist/depor/css/${style}.css`
  }

  return isStyleBasic || styleDefault ? (
    <Resource path={`resources/dist/${arcSite}/css/${styleDefault}.css`}>
      {({ data }) =>
        data ? (
          <style
            dangerouslySetInnerHTML={{
              __html: data
                .replace('@charset "UTF-8";', '')
                .replace('-----------', ''),
            }}
          />
        ) : null
      }
    </Resource>
  ) : (
    isAmp === false && isLite === false && (
      <link rel="stylesheet" href={deployment(styleUrl)} />
    )
  )
}

export default Styles
