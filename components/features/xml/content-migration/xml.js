import Consumer from 'fusion:consumer'
import {
  includePromoItems,
  includePromoItemsCaptions,
  includePromoItemsSizes,
  includeGalleryUrls,
  includePrimarySection,
  includeSections,
  includeTags,
  includeCredits,
  includeCreditsImage,
  includeContentBasic,
} from '../../../utilities/included-fields'

/**
 * Para que las fechas coincidan con la busqueda, se modifica la
 * zona horaria de UTC+0000 (Z) a UTC-0500.
 *
 * @param {String} date
 *
 * @see https://en.wikipedia.org/wiki/ISO_8601#Coordinated_Universal_Time_(UTC):~:text=If%20the%20time%20is%20in%20UTC%2C,UTC%22%20would%20be%20%2214%3A45%3A15Z%22%20or%20%22144515Z%22.
 */
const fixDate = date => {
  const originalDate = new Date(date)
  const fixedDate = originalDate.setHours(originalDate.getHours() - 5)
  return new Date(fixedDate).toISOString().replace('Z', '-05:00')
}

/**
 * @description Feature temporal para la migracion de
 * contenido de publimetro.
 */
@Consumer
class XmlContentMigration {
  constructor(props) {
    this.props = props
    const { globalContentConfig, arcSite } = props
    // Se espera que use la content source `archive-sitemap`
    const { query: { year, month, day } = {} } = globalContentConfig || {}

    const includedFields = `
      websites.${arcSite}.website_url,
      canonical_url,
      redirect_url,
      headlines.basic,
      subheadlines.basic,
      description.basic,
      first_publish_date,
      last_updated_date,
      created_date,
      publish_date,
      display_date,
      ${includePromoItems},
      ${includePromoItemsCaptions},
      ${includePromoItemsSizes},
      ${includeGalleryUrls},
      ${includePrimarySection},
      ${includeSections},
      ${includeTags},
      ${includeCredits},
      ${includeCreditsImage},
      ${includeContentBasic},
      label,
      related_content.redirect,
      related_content.basic`

    this.fetchContent(
      this.getStates(`${year}-${month}-${day}`, 'no-presets', includedFields)
    )
  }

  getStates = (date, presets, includedFields) => {
    const interval = 100
    const states = {}

    let count = 0
    // MAX 200 historias
    while (count <= 1) {
      states[`data${count}`] = {
        source: 'story-feed-by-section-and-date-v2',
        query: {
          date,
          from: count * interval,
          size: interval,
          presets,
          includedFields,
        },
      }
      count += 1
    }
    return { ...states }
  }

  render() {
    const stories = []
    if (this.state)
      Object.keys(this.state).forEach(key => {
        const { content_elements: contentElements = [] } =
          (key && this.state[key]) || {}
        stories.push(...contentElements)
      })

    if (!stories) {
      return null
    }

    const feed = {
      stories: [
        ...stories.map(story => {
          return {
            data: encodeURIComponent(
              JSON.stringify({
                ...story,
                display_date: fixDate(story.display_date),
                publish_date: fixDate(story.publish_date),
              })
            ),
          }
        }),
      ],
    }

    return feed
  }
}

export default XmlContentMigration
