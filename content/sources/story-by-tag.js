import { resizerSecret } from 'fusion:environment'
import { addResizedUrls } from '@arc-core-components/content-source_content-api-v4'
import getProperties from 'fusion:properties'

let website = ''
const schemaName = 'story'

const params = [
  {
    name: 'name',
    displayName: 'Slug de la etiqueta',
    type: 'text',
  },
  {
    name: 'feedOffset',
    displayName: 'Número de la noticia',
    type: 'number',
  },
]

const pattern = (key = {}) => {
  website = key['arc-site'] || 'Arc Site no está definido'
  const { name, feedOffset } = key

  const slugSearch = name ? `AND+taxonomy.tags.slug:${name}+` : ''

  const q = `canonical_website:${website}+${slugSearch}AND+type:story+AND+revision.published:true`

  const requestUri = `/content/v4/search/published?q=${q}&size=1&from=${feedOffset ||
    0}&sort=publish_date:desc&website=${website}&single=true`

  return requestUri
}

const resolve = key => pattern(key)

const itemsToArrayImge = data => {
  const { resizerUrl } = getProperties(website)

  return addResizedUrls(data, {
    resizerUrl,
    resizerSecret,
    presets: {
      small: {
        width: 100,
        height: 200,
      },
      medium: {
        width: 480,
      },
      large: {
        width: 940,
        height: 569,
      },
      amp: {
        width: 600,
        height: 375,
      },
    },
  })
}

const transform = data => {
  const dataStory = data

  const { promo_items: { basic_gallery: contentElements = null } = {} } = data
  const contentElementsData = contentElements || data

  const image = itemsToArrayImge(contentElementsData)

  if (contentElements) {
    dataStory.promo_items.basic_gallery = image
  }

  return itemsToArrayImge(dataStory)
}

const source = {
  resolve,
  transform,
  schemaName,
  params,
}

export default source
