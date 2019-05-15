let auxKey

const schemaName = 'stories'

const params = [
  {
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
    displayName: 'Noticia inicial',
    type: 'number',
  },
  {
    name: 'news_number',
    displayName: 'Cantidad de historias',
    type: 'number',
  },
]

export const itemsToArray = (itemString = '') => {
  return itemString.split(',').map(item => {
    return item.replace(/"/g, '')
  })
}

const pattern = (key = {}) => {
  auxKey = key

  const website = key['arc-site'] || 'Arc Site no está definido'
  const { section, excludeSections, feedOffset, news_number: newsNumber } = key

  const sectionsExcluded = itemsToArray(excludeSections)

  const body = {
    query: {
      bool: {
        must: [
          {
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
        must_not: [
          {
            nested: {
              path: 'taxonomy.sections',
              query: {
                bool: {
                  must: [
                    {
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
          },
        ],
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
            must: [
              {
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

  return `/content/v4/search/published?body=${encodedBody}&website=${website}&size=${newsNumber ||
    10}&from=${feedOffset || 0}&sort=publish_date:desc`
}

const resolve = key => pattern(key)

const transform = data => {
  if (!auxKey.section || auxKey.section === '/') return data
  const sectionsIncluded = itemsToArray(auxKey.section)
  if (data.content_elements.length === 0 || sectionsIncluded.length > 1)
    return data
  const {
    content_elements: [
      {
        taxonomy: { sections },
      },
    ],
  } = data
  const realSection = sections.find(item => sectionsIncluded[0] === item._id)
  const sectionName = {
    section_name: realSection.name,
  }
  return {
    ...data,
    ...sectionName,
  }
}

const source = {
  resolve,
  transform,
  schemaName,
  params,
}

export default source
