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
    name: 'stories_qty',
    displayName: 'Cantidad de historias',
    type: 'number',
  },
]

export const itemsToArray = (itemString = '') => {
  return itemString.split(',').map(item => item.replace(/"/g, ''))
}

const formatSection = section => {
  if (section === '/') return section
  return section && section.endsWith('/')
    ? section.slice(0, section.length - 1)
    : section
}

const pattern = (key = {}) => {
  auxKey = key

  const website = key['arc-site'] || 'Arc Site no está definido'
  const { section, excludeSections, feedOffset, stories_qty: storiesQty } = key
  const newSection = formatSection(section)

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

  if (newSection && newSection !== '/') {
    const sectionsIncluded = itemsToArray(newSection)
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

  return `/content/v4/search/published?body=${encodedBody}&website=${website}&size=${storiesQty ||
    10}&from=${feedOffset || 0}&sort=publish_date:desc`
}

const resolve = key => pattern(key)

const transform = data => {
  const newSection = formatSection(auxKey.section)
  if (!newSection || newSection === '/') return data
  const sectionsIncluded = itemsToArray(newSection)
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
