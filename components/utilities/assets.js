export const getAssetsPath = (arcSite, contextPath) => {
  if (!contextPath) return '/pf'
  if (!arcSite) return contextPath

  let site = `${arcSite}.pe`
  if (arcSite === 'depor') site = `${arcSite}.com`
  if (arcSite === 'elcomerciomag') site = 'elcomercio.pe'
  if (arcSite === 'peru21g21') site = 'peru21.pe'

  return `https://cdna.${site}`
}

/**
 * @param {object} objeto Propiedades necesarias para armar la URL de la imagen por defecto.
 * @param {string} objeto.contextPath Normalmente /pf/. Viene desde fusion.
 * @param {string} objeto.arcSite Identificador del sitio actual. Viene desde fusion.
 *
 * @returns {string} URL de la imagen por defecto desde /resources/dist/...
 */
export const defaultImage = ({ contextPath, arcSite }) => {
  return `${getAssetsPath(
    arcSite,
    contextPath
  )}/resources/dist/${arcSite}/images/default-md.png?d=2`
}

export const getAssetsPathVideo = (arcSite, urlVideo = '') => {
  let site = `${arcSite}.pe`
  if (arcSite === 'depor') site = `${arcSite}.com`
  if (arcSite === 'elcomerciomag') site = 'elcomercio.pe'
  if (arcSite === 'peru21g21') site = 'peru21.pe'

  return urlVideo.replace(
    'https://d2yh8l41rvc5n9.cloudfront.net/wp-elcomercio',
    `https://cdnv.${site}`
  )
}
