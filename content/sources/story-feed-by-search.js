// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'request-promise-native'
import { resizerSecret, CONTENT_BASE } from 'fusion:environment'
import getProperties from 'fusion:properties'
import addResizedUrlsToStories from '../../components/utilities/stories-resizer'

const schemaName = 'stories-dev'

const options = {
  gzip: true,
  json: true,
}

const params = [
  {
    name: 'sort',
    displayName: 'Orden',
    type: 'text',
  },
  {
    name: 'from',
    displayName: 'Página de inicio',
    type: 'number',
  },
  {
    name: 'section',
    displayName: 'Sección / Categoría',
    type: 'text',
  },
  {
    name: 'size',
    displayName: 'Cantidad a mostrar',
    type: 'number',
  },
  {
    name: 'query',
    displayName: 'Búsqueda',
    type: 'text',
  },
  {
    name: 'presets',
    displayName: 'Tamaño de las imágenes',
    type: 'text',
  },
  {
    name: 'includedFields',
    displayName: 'Campos incluidos',
    type: 'text',
  },
]

/**
 * @description - calcula, usando el número de página y la cantidad de
 * historias, el índice de la historia desde la cual se debe iniciar la
 * solicitud.
 *
 * @param {*} page - número de página que se quiere consultar
 * @param {*} size - cantidad de noticias que se quiere consultar
 *
 * @returns {*} índice de la historia inicial para la solicitud
 */
const validateFrom = (page, size) => {
  if (page !== '1' && page) {
    return (page - 1) * size
  }
  return '0'
}

const transformImg = ({ contentElements, website, presets }) => {
  const { resizerUrl } = getProperties(website)
  return addResizedUrlsToStories({
    contentElements,
    resizerUrl,
    resizerSecret,
    presets,
  })
}

const fetch = ({
  'arc-site': website,
  query,
  section: rawSection,
  size: rawSize,
  from: page,
  sort: rawSort,
  presets: customPresets,
  includedFields,
}) => {
  const presets = customPresets || 'landscape_s:234x161,landscape_xs:118x72'
  const queryValue = query
  const pageNumber = !page || page === 0 ? 1 : page
  const sort = rawSort === 'ascendente' ? 'asc' : 'desc'
  const from = `${validateFrom(page, rawSize)}`
  const size = `${rawSize || 15}`
  const section = rawSection || 'todas'

  let queryFilter = ''

  if (section === 'todas') {
    queryFilter = `q=canonical_website:${website}+AND+type:story+AND+${query}`
  } else {
    let valueQuery = query.replace(/\+/g, ' ')
    valueQuery = valueQuery.replace(/-/g, '+') || '*'

    const body = {
      query: {
        bool: {
          must: [
            {
              term: {
                type: 'story',
              },
            },
            {
              simple_query_string: {
                query: `"${decodeURI(valueQuery)}"`, // NOTA: El navegador encodea las tildes
              },
            },
            {
              nested: {
                path: 'taxonomy.sections',
                query: {
                  bool: {
                    must: [
                      {
                        terms: {
                          'taxonomy.sections._id': [`/${rawSection}`],
                        },
                      },
                      {
                        term: {
                          'taxonomy.sections._website': website,
                        },
                      },
                    ],
                  },
                },
              },
            },
          ],
        },
      },
    }

    queryFilter = `body=${encodeURIComponent(JSON.stringify(body))}`
  }

  const sourceInclude = includedFields
    ? `&_sourceInclude=${includedFields}`
    : `&_sourceInclude=taxonomy.primary_section.path,taxonomy.primary_section.name,display_date,website_url,websites.${website}.website_url,headlines.basic,subheadlines.basic,credits.by.name,credits.by.url,promo_items.basic.url,promo_items.basic.resized_urls,promo_items.basic_video.promo_items.basic.url,promo_items.basic_video.promo_items.basic.resized_urls,promo_items.basic_gallery.promo_items.basic.url,promo_items.basic_gallery.promo_items.basic.resized_urls,promo_items.youtube_id.content`
  const sourceExclude =
    '&_sourceExclude=owner,address,workflow,label,content_elements,type,revision,language,source,distributor,planning,additional_properties,publishing,website'

  const requestUri = `${CONTENT_BASE}/content/v4/search/published?sort=display_date:${sort}&from=${from}&size=${size}&website=${website}&${queryFilter}${sourceInclude}`

  return request({
    uri: `${CONTENT_BASE}/site/v3/website/${website}/section?_id=/${
      section === 'todas' ? '' : section
    }`,
    ...options,
  }).then(resp => {
    if (Object.prototype.hasOwnProperty.call(resp, 'status'))
      throw new Error('Sección no encontrada')

    return request({
      uri: requestUri,
      ...options,
    }).then(data => {
      const dataStories = data
      const { content_elements: contentElements } = data || {}
      dataStories.content_elements = transformImg({
        contentElements,
        website,
        presets, // 'mobile:314x157'
      })

      const { siteName } = getProperties(website)
      dataStories.siteName = siteName

      return {
        ...dataStories,
        query: queryValue,
        decoded_query: decodeURIComponent(queryValue).replace(/\+/g, ' '),
        page_number: pageNumber,
      }
    })
  })
}

const source = {
  fetch,
  schemaName,
  params,
  ttl: 300,
}

export default source
