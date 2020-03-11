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
 * @param {function} objeto.deployment Agrega un parámetro al final de la cadena
 * con la versión de deployment. Viene desde Fusion.
 * @param {string} objeto.contextPath Normalmente /pf/. Viene desde fusion.
 * @param {string} objeto.arcSite Identificador del sitio actual. Viene desde fusion.
 * @param {string} [objeto.size=lg] Tamaño de la imagen por defecto. Hay tres opciones
 * 'sm', 'md' y 'lg'. Definido manualmente.
 *
 * @returns {string} URL de la imagen por defecto desde /resources/dist/...
 */
export const defaultImage = ({
  deployment,
  contextPath,
  arcSite,
  size = 'lg',
}) => {
  if (size !== 'lg' && size !== 'md' && size !== 'sm') return ''

  return deployment(
    `${getAssetsPath(
      arcSite,
      contextPath
    )}/resources/dist/${arcSite}/images/default-${size}.png`
  )
}

export const getAssetsPathVideo = (arcSite, urlVideo) => {
  let site = `${arcSite}.pe`
  if (arcSite === 'depor') site = `${arcSite}.com`
  if (arcSite === 'elcomerciomag') site = 'elcomercio.pe'
  if (arcSite === 'peru21g21') site = 'peru21.pe'

  return urlVideo.replace(
    'https://d2yh8l41rvc5n9.cloudfront.net/wp-elcomercio',
    `https://cdnv.${site}`
  )
}
