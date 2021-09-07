import Consumer from 'fusion:consumer'

import { VIDEO } from '../../../utilities/constants/multimedia-types'
import { localISODate } from '../../../utilities/date-time/dates'
import { createResizedParams } from '../../../utilities/resizer/resizer'
import schemaFilter from './_dependencies/schema-filter'

const SOURCE = 'story-feed-by-section'
const VIDEO_FORMAT = 'mp4'

/**
 * @description Sitemap para Videos.
 *
 * @returns {Object} Objeto con estructura manipulable por
 * xmlBuilder, para construir sitemaps para Videos.
 */
@Consumer
class XmlVideosSitemap {
  constructor(props) {
    this.props = props
    const { arcSite } = props
    this.fetchContent({
      data: {
        source: SOURCE,
        query: {
          section: '/videos',
          stories_qty: 100,
          presets: 'no-presets',
          includedFields: `headlines.basic,subheadlines.basic,websites.${arcSite}.website_url,promo_items.${VIDEO}.promo_image.url,promo_items.${VIDEO}.type,promo_items.${VIDEO}.url,promo_items.${VIDEO}.headlines.basic,promo_items.${VIDEO}.subheadlines.basic,promo_items.${VIDEO}.description.basic,promo_items.${VIDEO}.streams.stream_type,promo_items.${VIDEO}.streams.url,promo_items.${VIDEO}.streams.height,promo_items.${VIDEO}.streams.width,promo_items.${VIDEO}.duration,promo_items.${VIDEO}.display_date,promo_items.${VIDEO}.taxonomy.primary_section.name,promo_items.${VIDEO}.taxonomy.tags.text,promo_items.basic_jwplayer.embed.config.thumbnail_url`,
        },
        filter: schemaFilter(arcSite, VIDEO),
      },
    })
  }

  msToSec = (duration = 0) => duration / 1000

  render() {
    const { arcSite, siteProperties: { siteUrl = '' } = {} } = this.props
    const { data } = this.state || {}
    const { content_elements: videos = [] } = data || {}

    if (!videos) {
      return null
    }

    const sitemap = {
      urlset: [
        { '@xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9' },
        { '@xmlns:video': 'http://www.google.com/schemas/sitemap-video/1.1' },
        ...videos.map((video) => {
          const {
            headlines: { basic: title = '' } = {},
            subheadlines: { basic: description = '' } = {},
            websites = {},
            promo_items: promoItems = {},
          } = video || {}

          const { website_url: storyUrl = '' } = websites[arcSite] || {}

          const {
            promo_image: { url: thumbnailUrl = '' } = {},
            streams = [],
            duration = 0,
            display_date: date = '',
            taxonomy: {
              primary_section: { name: section = 'Videos' } = {},
              tags = [],
            } = {},
          } = promoItems[VIDEO] || {}
          const {
            basic_jwplayer: {
              embed: {
                config: { thumbnail_url: thumbnailUrlImg = '' } = {},
              } = {},
            } = {},
          } = promoItems || {}

          const { image } = createResizedParams({
            url: thumbnailUrl || thumbnailUrlImg,
            presets: 'image:1280x720',
            arcSite,
          })

          const dataVideo =
            streams &&
            streams
              .map(({ url, stream_type: streamType }) => streamType === VIDEO_FORMAT ? url : [])
              .filter(String)

          const cantidadVideo = dataVideo.length

          const videoUrl = dataVideo[cantidadVideo - 1]
          return {
            url: {
              loc: `${siteUrl}${storyUrl}`,
              'video:video': [
                { 'video:thumbnail_loc': image },
                { 'video:title': title },
                { 'video:description': description },
                { 'video:content_loc': videoUrl },
                /* 'video:player_loc': {
                                    '@allow_embed': 'yes',
                                    '@autoplay': 'ap=1',
                                    '#text': 'http://www.example.com/videoplayer.swf?video=123'
                                }, */
                { 'video:duration': this.msToSec(duration) },
                // { 'video:view_count': '15: ni idea de donde sacar esto' },
                { 'video:publication_date': localISODate(date) },
                ...tags
                  .map((tag = {}) => ({
                      'video:tag': tag.text !== 'sample' ? tag.text : '',
                    }))
                  .filter(({ 'video:tag': videoTag }) => videoTag !== ''),
                { 'video:category': section },
                { 'video:family_friendly': 'yes' }, // o no
              ],
            },
          }
        }),
      ],
    }

    return sitemap
  }
}

export default XmlVideosSitemap
