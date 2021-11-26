import { ArcSite } from 'types/fusion'

interface DefaultImageProps {
  contextPath: string
  arcSite: ArcSite
}

export const getAssetsPath = (
  arcSite: ArcSite,
  contextPath: string
): string => {
  if (!contextPath) return '/pf'
  if (!arcSite) return contextPath

  let site = `${arcSite}.pe`
  if (arcSite === 'depor') site = `${arcSite}.com`
  if (arcSite === 'elcomerciomag' || arcSite === 'perucom')
    site = 'elcomercio.pe'
  if (arcSite === 'peru21g21') site = 'peru21.pe'

  return `https://cdna.${site}`
}

export const defaultImage = ({
  contextPath,
  arcSite,
}: DefaultImageProps): string =>
  `${getAssetsPath(
    arcSite,
    contextPath
  )}/resources/dist/${arcSite}/images/default-md.png?d=2`

export const defaultAuthorImage = ({
  contextPath,
  arcSite,
}: DefaultImageProps): string =>
  `${getAssetsPath(
    arcSite,
    contextPath
  )}/resources/assets/author-grid/author.png?d=1`

export const getAssetsPathVideo = (arcSite: ArcSite, urlVideo = ''): string => {
  let site = `${arcSite}.pe`
  if (arcSite === 'depor') site = `${arcSite}.com`
  if (arcSite === 'elcomerciomag') site = 'elcomercio.pe'
  if (arcSite === 'peru21g21') site = 'peru21.pe'

  return urlVideo.replace(
    'https://d2yh8l41rvc5n9.cloudfront.net/wp-elcomercio',
    `https://cdnv.${site}`
  )
}
