import getProperties from 'fusion:properties'
import { ConentSourceBase } from 'types/content-source'
import { ArcSite } from 'types/fusion'
import { InlinePresets } from 'types/resizer'
import { Stories, Story } from 'types/story'

import { removeLastSlash } from '../../components/utilities/parse/strings'
import { getResizedImageData } from '../../components/utilities/resizer/resizer'

const SCHEMA_NAME = 'stories-dev'

const params = [
  {
    name: 'section',
    displayName: 'Section(es)',
    type: 'text',
  },
  {
    name: 'stories_qty',
    displayName: 'Cantidad de historias',
    type: 'number',
  },
  {
    name: 'presets',
    displayName: 'Tamaño de las imágenes (opcional)',
    type: 'text',
  },
]

export type StoryByIdQuery = {
  section: string
  stories_qty?: string
  story?: Story
  presets?: InlinePresets | undefined
}

type StoryByIdParams = StoryByIdQuery & ConentSourceBase

const resolve = (key: StoryByIdParams): string => {
  const website = key?.['arc-site'] || 'Arc Site no está definido'
  const { section, stories_qty: storiesQty } = key

  const clearSection =
    section === '' ||
    section === undefined ||
    section === null ||
    section === '/'
      ? '/'
      : removeLastSlash(section)

  const body = {
    query: {
      bool: {
        must: [
          {
            term: {
              type: 'story',
            },
          },
        ],
      },
    },
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nested: any = {
    nested: {
      path: 'taxonomy.sections',
      query: {
        bool: {
          must: [
            {
              terms: {
                'taxonomy.sections._id': [clearSection],
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
  }

  if (clearSection !== '/') {
    body.query.bool.must.push(nested)
  }

  const encodedBody = encodeURI(JSON.stringify(body))
  const sourceExclude = `&_sourceExclude=owner,address,workflow,label,content_elements,type,revision,language,source,distributor,planning,additional_properties,publishing,related_content`

  return `/content/v4/search/published?body=${encodedBody}&website=${website}&size=${
    storiesQty || 50
  }&from=0&sort=display_date:desc${sourceExclude}`
}
const ResultadosOnpe = (contentElement: Story, arcSite: ArcSite) => {
  const { display_date: publishDate = '', websites = {} } = contentElement
  const { website_url: websiteUrl = '' } = websites[arcSite] || {}
  const isResultadosOnpe =
    /^(\/[\w\d-\\/]+\/resultados-onpe\/.+-(?:\d{3,9}|noticia(?:-\d{1,2})?\/))$/.test(
      websiteUrl
    ) || false
  const dataStory = contentElement
  if (isResultadosOnpe) dataStory.publish_date = publishDate
  return { ...dataStory }
}

const transform = (data: Stories, key: StoryByIdParams): Stories => {
  const arcSite = key?.['arc-site'] || 'Arc Site no está definido'
  const presets = key?.presets
  const { siteName = '' } = getProperties(arcSite)
  data?.content_elements.forEach((contentElement) => {
    ResultadosOnpe(contentElement, arcSite)
  })
  const dataStory = getResizedImageData(data, presets, arcSite)
  dataStory.siteName = siteName

  return dataStory as Stories
}

const source = {
  resolve,
  transform,
  schemaName: SCHEMA_NAME,
  params,
  ttl: 120,
}
export default source
