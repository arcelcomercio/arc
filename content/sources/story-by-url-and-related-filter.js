/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ARC_ACCESS_TOKEN, CONTENT_BASE } from 'fusion:environment'
// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'request-promise-native'

import RedirectError from '../../components/utilities/redirect-error'
import { getResizedImageData } from '../../components/utilities/resizer/resizer'
import { storyContent } from '../filters/story-content'

const schemaName = 'story-dev'
const params = [
  {
    name: 'website_url',
    displayName: 'URL de la nota',
    type: 'text',
  },
  {
    name: 'section',
    displayName: 'Sección / Categoría (sin slash)',
    type: 'text',
  },
  {
    name: 'presets',
    displayName: 'Tamaño de las imágenes (opcional)d',
    type: 'text',
  },
  {
    name: 'param',
    displayName: 'Query parametro',
    type: 'text',
  },
]

const options = {
  gzip: true,
  json: true,
  auth: {
    bearer: ARC_ACCESS_TOKEN,
  },
}

const excludedFieldsStory = '&_sourceExclude=owner,websites,language'
const fetch = ({
  website_url: websiteUrl,
  'arc-site': website,
  section = '',
} = {}) => {
  if (!websiteUrl) {
    throw new Error('Esta fuente de contenido requiere una URI y un sitio web')
  }
  if (!website) {
    throw new Error('Arc Site no está definido')
  }
  const isUrlTrome = /^(\/[\w\d-/]+-((?:\d{1,9}))\/.*trome\.pe)\/*[\w\d-/]*$/.test(
    websiteUrl
  )
  if (isUrlTrome) throw new RedirectError(`/410`, 410)

  return request({
    uri: `${CONTENT_BASE}/content/v4/stories/?website_url=${section}${websiteUrl}&website=${website}${excludedFieldsStory}`,
    ...options,
  }).then((storyResp) => {
    const {
      related_content: {
        redirect: [
          { redirect_url: redirectUrl = '', type: typeRedirect = '' } = {},
        ] = [],
      } = {},
    } = storyResp
    if (typeRedirect === 'redirect' && redirectUrl)
      throw new RedirectError(redirectUrl, 301)
    if (storyResp.type === 'redirect' && storyResp.redirect_url)
      throw new RedirectError(storyResp.redirect_url, 301)
    return storyResp
  })
}

const transform = (data, { 'arc-site': arcSite, presets, param }) => {
  let dataStory = data

  const { publish_date: publishDate = '', websites = {} } = data
  const { website_url: websiteUrl = '' } = websites[arcSite] || {}
  const isResultadosOnpe =
    /^(\/[\w\d-\\/]+\/resultados-onpe\/.+-(?:\d{3,9}|noticia(?:-\d{1,2})?\/))$/.test(
      websiteUrl
    ) || false
  if (isResultadosOnpe) dataStory.display_date = publishDate
  if (presets) dataStory = getResizedImageData(data, presets, arcSite)

  return { ...dataStory, param }
}

export default {
  fetch,
  transform,
  schemaName,
  params,
  ttl: 300,
  filter: storyContent,
}
