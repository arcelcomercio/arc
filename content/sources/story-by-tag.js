import { resizerSecret } from 'fusion:environment'
import { addResizedUrls } from '@arc-core-components/content-source_content-api-v4'
import getProperties from 'fusion:properties'
import { addResizedUrlsToStory } from '../../components/utilities/helpers'

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
    0}&sort=display_date:desc&website=${website}&single=true`

  return requestUri
}

const resolve = key => pattern(key)

const transform = data => {
  const dataStory = data
  const { resizerUrl } = getProperties(website)
  return (
    addResizedUrlsToStory(
      [dataStory],
      resizerUrl,
      resizerSecret,
      addResizedUrls
    )[0] || null
  )
}

const source = {
  resolve,
  transform,
  schemaName,
  params,
}

export default source
