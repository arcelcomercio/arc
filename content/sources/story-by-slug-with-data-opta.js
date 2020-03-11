/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'request-promise-native'
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment'
import RedirectError from '../../components/utilities/redirect-error'
import { getFootballGameId } from '../../components/utilities/get-story-values'

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
  auth: {
    bearer: ARC_ACCESS_TOKEN,
  },
}

const getDataOpta = storyData => {
  // const {} = storyData
  const footballGameId = getFootballGameId(storyData)
  if (footballGameId !== '') {
    const urlCDN = `https://cdna-resultadosopta.minoticia.pe/api/v2/match/?format=json&uuid=${footballGameId}`

    return request({
      uri: urlCDN,
      ...options,
    })
      .then(dataOpta => {
        storyData.opta_data = dataOpta
        return storyData
      })
      .catch(error => {
        console.log(error)
        return storyData
      })
  }
  return storyData
}

const getAdditionalData = (storyData, website) => {
  if (storyData.type === 'redirect') return storyData

  return request({
    uri: `${CONTENT_BASE}/content/v4/related-content/stories/?_id=${storyData._id}&website=${website}&published=true`,
    ...options,
  }).then(idsResp => {
    storyData.related_content = idsResp

    return getDataOpta(storyData)
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

const opta = `
opta_data{
    items{
        opid
        contestant_home{
            id
            name
            image
        }
        contestant_away{
            id
            name
            image
        }
        scores_total_home
        scores_total_away
        tournamentcalendar{
            season_opta_widget
        }
        competition{
            opid
        }
        goals{
            contestant{
                id
            }
            time_min_sec
            type
            home_score
            away_score
            scorer_name
        }
        match_time
        period_id

    }
}

`

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
      subtitle
      raw_oembed{
        url
        html
        provider_name
        type
        width
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
      uuid_match{
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
    ${opta}
    related_content{
      basic{
        _id
        canonical_url
        website_url
        content_restrictions{
          content_code
        }
        subtype
        type
        headlines{
          basic
        }
        promo_items{
          basic{
            type
            url
            width
            height
          }
          uuid_match{
            content
            type
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
