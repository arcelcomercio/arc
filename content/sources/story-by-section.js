// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'request-promise-native'
import {
  resizerSecret,
  CONTENT_BASE
} from 'fusion:environment'
import {
  addResizedUrls
} from '@arc-core-components/content-source_content-api-v4'
import getProperties from 'fusion:properties'
import {
  addResizedUrlsToStory
} from '../../components/utilities/helpers'

const removeLastSlash = section => {
  if (section === '/') return section
  return section && section.endsWith('/') ?
    section.slice(0, section.length - 1) :
    section
}

let website = ''
const schemaName = 'story'

const params = [{
    name: 'section',
    displayName: 'Sección(es)',
    type: 'text',
  },
  {
    name: 'excludeSections',
    displayName: 'Secciones excluidas',
    type: 'text',
  },
  {
    name: 'feedOffset',
    displayName: 'Número de la noticia',
    type: 'number',
  },
]

const options = {
  json: true,
}

export const itemsToArray = (itemString = '') => {
  return itemString.split(',').map(item => {
    return item.replace(/"/g, '')
  })
}

const pattern = (key = {}) => {
  website = key['arc-site'] || 'Arc Site no está definido'
  const {
    section,
    excludeSections,
    feedOffset
  } = key

  const sectionsExcluded = itemsToArray(excludeSections)

  const clearSection = removeLastSlash(section)
  /** 
   * CR: removeLastSlash() sólo quitará el / final de una sección.
   * Si se espera recibir más de una sección, removeLastSlash() debe ejecutarse
   * dentro de itemsToArray().
   * 
   * Si se espera que siempre venga una sección, debería tomarse en consideración
   * eliminar todo lo referente a excludeSections e itemsToArray.
   * 
   * Si harás esta mejora recuerda dejar el código lo más limpio posible pls.
   * */
  const newSection =
    clearSection === '' || clearSection === undefined || clearSection === null ?
    '/' :
    clearSection
  /**
   * CR: Esta asignación de newSection es lo mismo que hacer. Lo probé en consola.
   * 
   * const clearSection = removeLastSlash(section) || '/' (signo de interrogación)
   * 
   * Si haráś esta mejora recuerda modificar lo que esté relacionado a newSection.
   */

  const body = {
    query: {
      bool: {
        must: [{
            term: {
              'revision.published': 'true',
            },
          },
          {
            term: {
              type: 'story',
            },
          },
        ],
        must_not: [{
          nested: {
            path: 'taxonomy.sections',
            query: {
              bool: {
                must: [{
                    terms: {
                      'taxonomy.sections._id': sectionsExcluded,
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
        }, ],
      },
    },
  }

  if (section && section !== '/') {
    const sectionsIncluded = itemsToArray(section)
    body.query.bool.must.push({
      nested: {
        path: 'taxonomy.sections',
        query: {
          bool: {
            must: [{
                terms: {
                  'taxonomy.sections._id': sectionsIncluded,
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
    })
  }

  const encodedBody = encodeURI(JSON.stringify(body))

  return request({
    uri: `${CONTENT_BASE}/site/v3/website/${website}/section?_id=${newSection}`,
    ...options,
  }).then(resp => {
    /**
     *  CR: no sé que tan pequeño o grande sea el contenido de resp
     * pero quizás valga la pena destructurar simplementa lo que necesitamos,
     * ({ name }) quizás también "status" si se va a usar para el error de
     * la línea siguiente.
     */
    if (Object.prototype.hasOwnProperty.call(resp, 'status'))
      throw new Error('Sección no encontrada')
    return request({
      uri: `${CONTENT_BASE}/content/v4/search/published?body=${encodedBody}&website=${website}&size=1&from=${feedOffset ||
        0}&sort=publish_date:desc&single=true`,
      ...options,
    }).then(data => {
      /**
       * CR: simplementa "data" podría llamarse storyData desde el inicio, sino,
       * recuerda que es storyData, no dataStory.
       */
      const dataStory = data
      const {
        resizerUrl
      } = getProperties(website)
      return {
        ...(addResizedUrlsToStory(
          [dataStory],
          resizerUrl,
          resizerSecret,
          addResizedUrls
        )[0] || null),
        section_name: resp.name || 'Sección',
      }
    })
  })
}

const fetch = key => pattern(key)
/**
 * CR: el nombre del método pattern() ya no tiene sentido :C
 * yo le pondría resolve() porque ya hace todo de una vez, no sólo arma el pattern.
 * Pero se que no se hará y mis palabras serán en vano, pero el día en que no esté
 * sabré que al menos lo intenté y no todo se quedó sólo en pensamientos e ilusiones
 * pasajeras.
 */

const source = {
  fetch,
  schemaName,
  params,
}

export default source