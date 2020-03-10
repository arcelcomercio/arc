import { resizerSecret } from 'fusion:environment'
import getProperties from 'fusion:properties'
import { addResizedUrlsToStory } from '../../components/utilities/resizer'

const schemaName = 'story'

const params = [
  {
    name: 'name',
    displayName: 'ID del autor',
    type: 'text',
  },
  {
    name: 'feedOffset',
    displayName: 'Número de la noticia',
    type: 'number',
  },
]

const resolve = (key = {}) => {
  const website = key['arc-site'] || 'Arc Site no está definido'
  const { name, feedOffset } = key

  const slugSearch = name ? `AND+credits.by.url:"/autor/${name}"+` : ''

  const q = `canonical_website:${website}+${slugSearch}AND+type:story`

  const excludedFields =
    '&_sourceExclude=owner,address,workflow,label,content_elements,type,revision,language,source,distributor,planning,additional_properties,publishing,website'

  return `/content/v4/search/published?q=${q}&size=1&from=${feedOffset ||
    0}&sort=display_date:desc&website=${website}&single=true${excludedFields}`
}

const transform = (data, { 'arc-site': arcSite }) => {
  const dataStory = data
  const { resizerUrl } = getProperties(arcSite)
  return (
    addResizedUrlsToStory([dataStory], resizerUrl, resizerSecret)[0] || null
  )
}

const source = {
  resolve,
  transform,
  schemaName,
  params,
  ttl: 300,
}

export default source
