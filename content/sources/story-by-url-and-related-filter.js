/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'request-promise-native'
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment'
import RedirectError from '../../components/utilities/redirect-error'

const schemaName = 'story-dev'
const params = [
  {
    name: 'website_url',
    displayName: 'URL de la nota',
    type: 'text',
  },
  {
    name: 'section',
    displayName: 'Sección / Categoría (sin slash)',
    type: 'text',
  },
]

const options = {
  gzip: true,
  json: true,
  auth: {
    bearer: ARC_ACCESS_TOKEN,
  },
}

const getAdditionalData = (storyData, website) => {
  if (storyData.type === 'redirect') return storyData

  return request({
    uri: `${CONTENT_BASE}/content/v4/related-content/stories/?_id=${storyData._id}&website=${website}&published=true`,
    ...options,
  }).then(idsResp => {
    storyData.related_content = idsResp

    return storyData
  })
}

const excludedFieldsStory = '&_sourceExclude=owner,address,websites,language'
const fetch = ({
  website_url: websiteUrl,
  'arc-site': website,
  section = '',
} = {}) => {
  if (!websiteUrl) {
    throw new Error('Esta fuente de contenido requiere una URI y un sitio web')
  }
  if (!website) {
    throw new Error('Arc Site no está definido')
  }

  return request({
    uri: `${CONTENT_BASE}/content/v4/stories/?website_url=${section}${websiteUrl}&website=${website}${excludedFieldsStory}`,
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

const basicVideo = `    
basic_video {
  streams{
    stream_type
    filesize
    url
  }
  duration
  _id
  embed_html
  type
  headlines{
    basic
  }
  publish_date
  description{
    basic
  }
  additional_properties{
    advertising{
      allowPrerollOnDomain
      playAds
      forceAd
      playVideoAds
      enableAdInsertion
      enableAutoPreview
    }
  }
  promo_items{
    basic { 
      url 
      type 
      subtitle
      caption
      width
      height
    }
  }
}`

const basicGallery = `
basic_gallery {
  type
  promo_items{
    basic{
      caption
      type
      width
      height
      url
    }
  }
  content_elements{
    subtitle
    caption
    width
    height
    url
  }
}`

export default {
  fetch,
  schemaName,
  params,
  ttl: 300,
  filter: `
  _id
  type
  content_elements {
    _id
    type
    content
    caption
    embed{
      id
      config{
        link
        photo
        title
        alt
      }
    }
    raw_oembed{
      url
      html
      provider_name
      type
      width
    }
    additional_properties{
      advertising{
        allowPrerollOnDomain
        playAds
        forceAd
        playVideoAds
        enableAdInsertion
        enableAutoPreview
      }
    }
    level
    language
    url
    duration
    list_type
    title
    subtype_label
    subtype
    width
    publish_date
    height
    citation{
      type
      content
    }
    content_elements{
      width
      height
      url
      subtitle
      type
      content
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
    description{
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
      image {
        type
        url
      }
    }
    streams{
      stream_type
      filesize
      url
    }
    duration
    embed_html
    promo_image{
      width
      height
      url
    }
    promo_items{
      basic{
        caption
        subtitle
        url
        width
        height
        
      }
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
        image {
          url
        }
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
    audiencia_nicho{
      text
      url
    }
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
    sections{
      name
    }
    primary_section{
      type
      name
      path
      additional_properties{
        original{
          _admin{
            alias_ids
          }
        }
      }
    }
    seo_keywords
  }
  promo_items{
    basic_html{
      content
      type
    }
    infografia {
      content
      type
    }
    youtube_id {
      content
      type
    }
    basic { 
      url 
      type
      subtitle
      caption
      width
      height

    }
    path_mp3 {
      content
      _id
      type
    }
    ${basicVideo}
    ${basicGallery}
  }

  credits{
    by  {
      name
      slug
      url
      description
      image {
        url
      }
      type
      social_links{
        site
        url
      }
      additional_properties{
        original{
          email
          education
          role
          bio
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
  related_content{
    basic{
      _id
      canonical_url
      website_url
      content_restrictions{
        content_code
      }
      type
      headlines{
        basic
      }
      credits {
        by { name url type }
      }
      promo_items{
        basic{
          type
          url
          width
          height
        }
        basic_gallery{
          promo_items{
            basic{
              type
              caption
              subtitle
              url
            }
          }
        }
        ${basicVideo}
      }
    }
  }
  `,
}
