/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'request-promise-native'
import { resizerSecret, CONTENT_BASE } from 'fusion:environment'
import { addResizedUrls } from '@arc-core-components/content-source_content-api-v4'
import getProperties from 'fusion:properties'
import { addResizedUrlsToStory } from '../../components/utilities/helpers'

const schemaName = 'story-dev'

const params = [
  {
    name: 'website_url',
    displayName: 'URL de la nota',
    type: 'text',
  },
]

const options = {
  gzip: true,
  json: true,
}

class RedirectError extends Error {
  constructor(location, statusCode) {
    super()
    this.location = location
    this.statusCode = statusCode || 302
  }
}

const queryStoryRecent = (section, site) => {
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
      },
    },
  }

  if (section && section !== '/') {
    body.query.bool.must.push({
      nested: {
        path: 'taxonomy.sections',
        query: {
          bool: {
            must: [
              {
                terms: {
                  'taxonomy.sections._id': [section],
                },
              },
              {
                term: {
                  'taxonomy.sections._website': site,
                },
              },
            ],
          },
        },
      },
    })
  }

  return encodeURI(JSON.stringify(body))
}

const transformImg = data => {
  const storyData = data
  const { resizerUrl } = getProperties(data.website)
  if (storyData.related_content && storyData.related_content.basic)
    storyData.related_content.basic = addResizedUrlsToStory(
      storyData.related_content.basic,
      resizerUrl,
      resizerSecret,
      addResizedUrls,
      'related'
    )
  return (
    addResizedUrlsToStory(
      [storyData],
      resizerUrl,
      resizerSecret,
      addResizedUrls,
      'story'
    )[0] || null
  )
}

const getAdditionalData = (storyData, website) => {
  if (storyData.type === 'redirect') return storyData

  const {
    taxonomy: { primary_section: { path: section } = {} } = {},
  } = storyData

  const excludedFields =
    '&_sourceExclude=owner,address,workflow,label,content_elements,type,revision,language,source,distributor,planning,additional_properties,publishing,website,subheadlines,description,related_content,credits,websites,content_restrictions'

  const encodedBody = queryStoryRecent(section, website)
  return request({
    uri: `${CONTENT_BASE}/content/v4/search/published?body=${encodedBody}&website=${website}&size=6&from=0&sort=display_date:desc${excludedFields}`,
    ...options,
  }).then(recientesResp => {
    storyData.recent_stories = recientesResp
    return request({
      uri: `${CONTENT_BASE}/content/v4/related-content/stories/?_id=${
        storyData._id
      }&website=${website}&published=true`,
      ...options,
    }).then(idsResp => {
      storyData.related_content = idsResp
      const result = transformImg(storyData)
      return result
    })
  })
}

const excludedFieldsStory = '&_sourceExclude=owner,address,websites,language'
const fetch = ({ website_url: websiteUrl, 'arc-site': website } = {}) => {
  if (!websiteUrl) {
    throw new Error('Esta fuente de contenido requiere una URI y un sitio web')
  }
  if (!website) {
    throw new Error('Arc Site no está definido')
  }

  return request({
    uri: `${CONTENT_BASE}/content/v4/stories/?website_url=${websiteUrl}&website=${website}${excludedFieldsStory}`,
    ...options,
  }).then(storyResp => {
    if (storyResp.type === 'redirect' && storyResp.redirect_url) {
      // Redirect with 301 code
      throw new RedirectError(storyResp.redirect_url, 301)
    }
    // Fetch additional data
    return getAdditionalData(storyResp, website)
  })
}

export default {
  fetch,
  schemaName,
  params,
  filter: `
  _id
  content_elements {
    _id
    type
    content
    caption
    subtitle
    level
    language
    url
    duration
    list_type
    title
    subtype_label
    subtype
    citation{
      type
      content
    }
    content_elements{
      url
      subtitle
      type
    }
    header{
      type
      content
    }
    rows
        {
          type
          content
        }
    
    headlines{
      basic
    }
    items{
      type
      content
      url
      description{
        type
        content
      }
    }
    streams{
      stream_type
      filesize
      url
    }
    embed_html
    promo_image{
      url
    }
    promo_items{
      basic{
        caption
        subtitle
        url
      }
    }
    resized_urls{
      large
      content_small
      content
      landscape_md
      story_small
      amp_new
      impresa
      medium
    }
    canonical_url
    headlines{
      basic
    }
    credits{
      by  {
        type
        name
        slug
        url
        description
        image
        referent{
          type
          id  
        }
      }
    }
  }
  created_date
  last_updated_date
  canonical_url
  headlines {
    basic
    meta_title
  }
  subheadlines {
    basic
  }
  source
  label{
    nucleo{
      text
      url
    }
    formato{
      text
      url
    }
    contenido{
      text
      url
    }
    genero{
      text
      url
    }
    facebook_ia{
      text
      url
    }
  }
  content_restrictions{
    content_code
  }
  subheadlines{
    basic
  }
  description
  copyright
  source{
    source_id
  }
  comments{
    allow_comments
    display_comments
    moderation_required
  }
  taxonomy {
    tags{
      text
      description
      slug
    }
    primary_section{
      type
      name
      path
    }
    seo_keywords
  }
  promo_items{
    youtube_id {
      content
    }
    basic { 
      url 
      type
      subtitle
      caption
      resized_urls{
        large
        landscape_md
        story_small
        amp_new
        impresa
      }
    }
    path_mp3 {
      content
      _id
      type
    }
    basic_video {
      promo_items {
        basic { 
          url 
          type 
          subtitle
          caption
          resized_urls 
        }
      }
    }
    basic_gallery {
      promo_items {
        basic { 
          url 
          type
          subtitle
          caption
          resized_urls{
            large
            landscape_md
            story_small
            amp_new
            impresa
          } 
        }
      }
    }
  }

  credits{
    by  {
      name
      slug
      url
      description
      image
      additional_properties{
        original{
          email
          education
        }
      }
    }
  }
  subtype
  display_date
  publish_date
  website
  editor_note
  website_url
  recent_stories{
    content_elements{
      canonical_url
      promo_items{
        basic{
          url
          subtitle
        }
      }
      publish_date
      headlines{
        basic
      }
      _id
    }
  }
  related_content{
    basic{
      _id
      canonical_url
      website_url
      headlines{
        basic
      }
      promo_items{
        basic{
          url
          resized_urls{
            original
            landscape_md
          }
        }
      }
    }
  }
  `,
}
