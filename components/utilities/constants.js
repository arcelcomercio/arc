// Promo_Item type
export const VIDEO = 'basic_video'

export const ELEMENT_YOUTUBE_ID = 'youtube_id'

export const HTML = 'basic_html'

export const IMAGE = 'basic'

export const GALLERY = 'basic_gallery'

export const UUID_MATCH = 'uuid_match'

export const ADS_MATCH = 'ads_match'

// image size
export const IMAGE_ORIGINAL = 'original'

export const IMAGE_SMALL = 'small'

export const SQUARE_XS = 'square_xs'

export const LANDSCAPE_XS = 'landscape_xs'

export const LANDSCAPE_XXS = 'landscape_xxs'

export const getAssetsPath = (arcSite, contextPath) => {
  if (!contextPath) return '/pf'
  if (!arcSite) return contextPath

  let site = `${arcSite}.pe`
  if (arcSite === 'depor') site = `${arcSite}.com`
  if (arcSite === 'elcomerciomag') site = 'elcomercio.pe'
  if (arcSite === 'peru21g21') site = 'peru21.pe'

  return `https://cdna.${site}`
}

// Estados de los partidos (opta)

export const FIXTURESTATE = 'Fixture' // por jugarse
export const PLAYING = 'Playing' // en vivo
export const PLAYED = 'Played' // jugado
export const POSTPONEDSTATE = 'Postponed' // pospuesto
