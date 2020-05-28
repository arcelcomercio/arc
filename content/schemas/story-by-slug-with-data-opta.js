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
        matchstatus
    }
}

`

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

const optaCommentaries = `
opta_commentaries{
    items{
        commentary_id
        comment
        lastModified
        time
        commentary_type{
            name
        }
    }
}
`

const filter = params => {
  const {
    basicVideoFilter = false,
    basicGalleryFilter = false,
    optaFilter = false,
    optaCommentariesFilter = false,
  } = params

  return `
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
        ads_match{
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
        ${basicVideoFilter === true ? basicVideo : ''}
        ${basicGalleryFilter === true ? basicGallery : ''}
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
      adsMatch
      ${optaFilter === true ? opta : ''}
      ${optaCommentariesFilter === true ? optaCommentaries : ''}
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
            ${basicVideoFilter === true ? basicVideo : ''}
          }
        }
      }
      `
}

export default filter
