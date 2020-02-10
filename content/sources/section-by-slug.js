import { resizerSecret } from 'fusion:environment'
import getProperties from 'fusion:properties'
import { createResizedUrl } from '../../components/utilities/resizer'
import { removeLastSlash } from '../../components/utilities/helpers'

const schemaName = 'section'

const params = [
  {
    name: '_id',
    displayName: 'Slug de la sección',
    type: 'text',
  },
]

let website = ''

const resolve = (key = {}) => {
  website = key['arc-site'] || 'Arc Site no está definido'
  const { _id: slug = '' } = key

  const clearSlug = removeLastSlash(slug)

  const requestUri =
    !slug || slug === '/'
      ? `/site/v3/website/${website}/section`
      : `/site/v3/website/${website}/section?_id=${clearSlug}`
  return requestUri
}

const transform = data => {
  const { resizerUrl } = getProperties(website)
  const { site_topper: { site_logo_image: siteLogoImage = '' } = {} } =
    data || {}
  const sectionData = data
  if (siteLogoImage) {
    const resizedUrls = createResizedUrl({
      url: siteLogoImage,
      presets: 'landscape_xl:1354x220,landscape_s:304x90',
      resizerUrl,
      resizerSecret,
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
