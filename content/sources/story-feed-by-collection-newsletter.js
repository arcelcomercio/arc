import { resizerSecret, resizerUrl }  from 'fusion:environment'
import { addResizedUrls } from '@arc-core-components/content-source_content-api-v4'

let website = ''

const schemaName = 'stories'

const params = [
  {
    name: 'id',
    displayName: 'Slug de la etiqueta',
    type: 'text',
  },
]

const pattern = (key = {}) => {
  website = key['arc-site'] || 'Arc Site no está definido'

  if (!key.id) {
    throw new Error('Esta fuente de contenido necesita el ID de la collección')
  }
  const requestUri = `/content/v4/collections?website=${website}&_id=${key.id}`

  return requestUri
}

const transform = data => {

  data
  return data.map(item =>{
    return addResizedUrls(item, { resizerUrl, resizerSecret, presets: {
      small: { width: 50, height: 50 },
      large: {width: 480 }
    }});
  })
  
}
const resolve = key => pattern(key)

const source = {
  resolve,
  transform,
  schemaName,
  params,
}

export default source
