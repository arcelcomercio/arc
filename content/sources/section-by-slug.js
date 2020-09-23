import { createResizedParams } from '../../components/utilities/resizer/resizer'
import { removeLastSlash } from '../../components/utilities/parse/strings'

const schemaName = 'section'

const params = [
  {
    name: '_id',
    displayName: 'Slug de la sección',
    type: 'text',
  },
]

const resolve = (key = {}) => {
  const website = key['arc-site'] || 'Arc Site no está definido'
  const { _id: slug = '' } = key

  const clearSlug = removeLastSlash(slug)

  const requestUri =
    !slug || slug === '/'
      ? `/site/v3/website/${website}/section`
      : `/site/v3/website/${website}/section?_id=${clearSlug}`
  return requestUri
}

const transform = (data, { 'arc-site': website }) => {
  const { site_topper: { site_logo_image: siteLogoImage = '' } = {} } =
    data || {}
  const sectionData = data
  if (siteLogoImage) {
    const resizedUrls = createResizedParams({
      url: siteLogoImage,
      presets: 'landscape_xl:1354x220,landscape_s:304x90',
      arcSite: website,
    })
    sectionData.site_topper.resized_urls = resizedUrls
  }
  return sectionData
}

export default {
  resolve,
  transform,
  schemaName,
  params,
  ttl: 600,
}
