import getProperties from 'fusion:properties'
import { ConentSourceBase as ContentSourceBase } from 'types/content-source'
import { Stories } from 'types/story'

import {
  formatIncludedFields,
  includePrimarySection,
  includePromoItems,
} from '../../components/utilities/included-fields'
import { getResizedImageData } from '../../components/utilities/resizer/resizer'

export type StoryMoviesFeedQuery = {
  date: string
  website: string
  presets: string
  includedFields: string
}

type StoryMoviesFeed = StoryMoviesFeedQuery & ContentSourceBase

const schemaName = 'stories'

const params = [
  {
    name: 'date',
    displayName: 'Fecha',
    type: 'text',
  },
  {
    name: 'website',
    displayName: 'ID del sitio (Opcional)',
    type: 'text',
  },
  {
    name: 'presets',
    displayName: 'Tamaño de las imágenes (opcional)',
    type: 'text',
  },
  {
    name: 'includedFields',
    displayName: 'Campos incluidos (opcional)',
    type: 'text',
  },
]

const pattern = (key: StoryMoviesFeed): string => {
  const { website: rawWebsite = '', date = '', includedFields } = key

  const websiteField = rawWebsite === null ? '' : rawWebsite

  const website = websiteField || key['arc-site'] || 'Arc Site no está definido'

  // const excludedFields = '&_sourceExclude=owner,address,workflow,label,content_elements,type,revision,language,source,distributor,planning,additional_properties,publishing,website'

  const sourceInclude = includedFields
    ? `&_sourceInclude=${formatIncludedFields({
        includedFields,
        arcSite: website,
      })}`
    : `&_sourceInclude=${includePrimarySection({
        arcSite: website,
      })},content_elements.embed.config,display_date,website_url,websites.${website}.website_url,headlines.basic,planning.budget_line,${includePromoItems}`

  return `/content/v4/search/published?website=${website}&q=canonical_website:${website}+AND+type:story+AND+content_elements.subtype:"saltar_intro"+AND+planning.budget_line:${date}&from=0&size=100&sort=display_date:desc${sourceInclude}`
}

const transform = (
  data: Stories,
  { 'arc-site': arcSite, presets }: StoryMoviesFeed
) => {
  const { siteName } = getProperties(arcSite)
  const dataStories = getResizedImageData(data, presets, arcSite)
  dataStories.siteName = siteName

  const { content_elements: storiesMovie = [] } = dataStories
  const movies = {}
  storiesMovie.forEach((el) => {
    const { planning: { budget_line: releaseDate = null } = {} } = el
    if (releaseDate !== null) {
      if (!Object.keys(movies).includes(releaseDate)) {
        movies[releaseDate] = []
      }
      movies[releaseDate].push(el)
    }
  })

  return { data: movies }
}
const resolve = (key: StoryMoviesFeed): string => pattern(key)

const source = {
  resolve,
  transform,
  schemaName,
  params,
  ttl: 300,
}

export default source
