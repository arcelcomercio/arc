import { ConentSourceBase } from 'types/content-source'
import { ArcSite } from 'types/fusion'

export type GetAdsSpacesQuery = {
  space?: string
}
type GetAdsSpacesParams = GetAdsSpacesQuery & ConentSourceBase

type AdContent = {
  des_html: string
  fec_fin: string
  fec_inicio: string
  id_programacion_espacio_publicidad: number
  nom_espacio_publicidad: string
  nom_sitio: string
}
export type Ad = {
  [x: string]: AdContent[]
}
type AdsSpaces = {
  [key in ArcSite]: Ad[]
}

const resolve = (): string =>
  'https://d2dvq461rdwooi.cloudfront.net/output/publicidad/espacios.json'

const transform = (
  data: AdsSpaces,
  { 'arc-site': website, space }: GetAdsSpacesParams
): AdsSpaces | Ad => {
  if (!space || !website) return data

  if (!data[website] || space === 'none') return {}

  return data[website].filter((el) => Object.keys(el).includes(space))[0] || {}
}

export default {
  resolve,
  transform,
  params: {
    space: 'text',
  },
}
