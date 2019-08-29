import { resizerSecret, CONTENT_BASE } from 'fusion:environment'
import { createUrlResizer } from '@arc-core-components/content-source_content-api-v4'
import getProperties from 'fusion:properties'
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
    slug === '' || slug === null
      ? `${CONTENT_BASE}/site/v3/website/${website}/section`
      : `${CONTENT_BASE}/site/v3/website/${website}/section?_id=${clearSlug}`
  return requestUri
}

const transform = data => {
  const { resizerUrl } = getProperties(website)
  const { site_topper: { site_logo_image: siteLogoImage = '' } = {} } =
    data || {}
  const sectionData = data
  if (siteLogoImage) {
    const resizedUrls = createUrlResizer(resizerSecret, resizerUrl, {
      presets: {
        lazy_default: {
          width: 5,
          height: 5,
        },
        landscape_xl: {
          width: 1354,
          height: 220,
        },
        landscape_xs: {
          width: 157,
          height: 50,
        },
      },
    })({
      url: siteLogoImage,
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
}
