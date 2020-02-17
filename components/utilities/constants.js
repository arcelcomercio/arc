// Multimedia type
export const VIDEO = 'basic_video'

export const ELEMENT_YOUTUBE_ID = 'youtube_id'

export const HTML = 'basic_html'

export const IMAGE = 'basic'

export const GALLERY = 'basic_gallery'

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
