import { resizerSecret } from 'fusion:environment'
import { addResizedUrls } from '@arc-core-components/content-source_content-api-v4'
import getProperties from 'fusion:properties'
import { addResizedUrlsToStory } from '../../components/utilities/helpers'

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
]

const pattern = (key = {}) => {
  const website = key['arc-site']

  const { from: rawFrom = 1, size: rawSize = 10 } = key

  const from = rawFrom === undefined || rawFrom === null ? '1' : rawFrom
  const size = rawSize === undefined || rawSize === null ? '10' : rawSize

  const getPagination = () => {
    if (parseInt(from, 10) > 1) {
      return (from - 1) * size
    }
    return '0'
  }

  return `/content/v4/search/published?website=${website}&q=type:story+AND+content_restrictions.content_code:premium&sort=display_date:desc&size=${size}&from=${getPagination()}`
}

const transform = (data, key) => {
  const website = key['arc-site']

  const dataStories = data
  const { resizerUrl, siteName } = getProperties(website)

  dataStories.content_elements = addResizedUrlsToStory(
    dataStories.content_elements,
    resizerUrl,
    resizerSecret,
    addResizedUrls
  )
  dataStories.siteName = siteName

  return { ...dataStories }
}
const resolve = key => pattern(key)

const source = {
  resolve,
  transform,
  schemaName,
  params,
  ttl: 120,
}

export default source
