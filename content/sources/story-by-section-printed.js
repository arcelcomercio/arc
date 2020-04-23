const schemaName = 'printed'

const params = [
  {
    name: 'feedOffset',
    displayName: 'Número de portada',
    type: 'number',
  },
]

// seccion a la que debe llamar
const section = '/impresa'

const resolve = (key = {}) => {
  const website = key['arc-site'] || 'Arc Site no está definido'
  const { feedOffset } = key

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
            bool: {
              should: [
                {
                  term: {
                    'taxonomy.sites._id': section,
                  },
                },
                {
                  nested: {
                    path: 'taxonomy.sections',
                    query: {
                      bool: {
                        must: [
                          {
                            term: {
                              'taxonomy.sections._id': section,
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
          {
            term: {
              'revision.published': 'false',
            },
          },
        ],
      },
    },
  }

  const encodedBody = encodeURI(JSON.stringify(body))

  const excludedFields =
    '&_sourceExclude=owner,address,workflow,label,content_elements,type,revision,language,source,distributor,planning,additional_properties,publishing,website'

  return `/content/v4/search?website=${website}&sort=created_date:desc&from=${feedOffset ||
    0}&size=1&single=true&body=${encodedBody}${excludedFields}`
}

const transform = storyData => {
  return {
    ...storyData,
    section_name: 'Impresa',
  }
}

const source = {
  resolve,
  transform,
  schemaName,
  params,
  ttl: 600,
}

export default source
