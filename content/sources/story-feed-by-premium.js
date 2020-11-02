import getProperties from 'fusion:properties'
import { getResizedImageData } from '../../components/utilities/resizer/resizer'

const schemaName = 'stories'

const params = [
  {
    name: 'from',
    displayName: 'Página de inicio',
    type: 'number',
  },
  {
    name: 'size',
    displayName: 'Cantidad a mostrar',
    type: 'number',
  },
  {
    name: 'website',
    displayName: 'ID del sitio (Opcional)',
    type: 'text',
  },
  {
    name: 'presets',
    displayName: 'Tamaño de las imágenes (opcional)',
    type: 'text',
  },
]

const pattern = (key = {}) => {
  const {
    from: rawFrom = 1,
    size: rawSize = 10,
    website: rawWebsite = '',
  } = key

  const websiteField = rawWebsite === null ? '' : rawWebsite

  const website = websiteField || key['arc-site'] || 'Arc Site no está definido'

  const from = rawFrom === undefined || rawFrom === null ? '1' : rawFrom
  const size = rawSize === undefined || rawSize === null ? '10' : rawSize

  const getPagination = () => {
    if (parseInt(from, 10) > 1) {
      return (from - 1) * size
    }
    return '0'
  }

  const excludedFields =
    '&_sourceExclude=owner,address,workflow,label,content_elements,type,revision,language,source,distributor,planning,additional_properties,publishing,website'

  return `/content/v4/search/published?website=${website}&q=canonical_website:${website}+AND+type:story+AND+content_restrictions.content_code:premium+AND+publish_date:%7Bnow-30d%20TO%20*%7D&sort=display_date:desc&size=${size}&from=${getPagination()}${excludedFields}`
}

const transform = (data, { 'arc-site': arcSite, presets }) => {
  const { siteName } = getProperties(arcSite)
  const dataStories = getResizedImageData(data, presets, arcSite)
  dataStories.siteName = siteName

  return { ...dataStories }
}
const resolve = key => pattern(key)

const source = {
  resolve,
  transform,
  schemaName,
  params,
  ttl: 300,
}

export default source
