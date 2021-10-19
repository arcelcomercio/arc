export const SchemaSingleStory = (arcSite) => `{
    websites { ${arcSite} { website_url website_section{name path} } }
    headlines { basic }
    subheadlines { basic }
    display_date
    credits { by { name, url, id, type } }
    promo_items {
      basic { url type caption }
      basic_jwplayer {
        subtype
        type
        embed{
          config{
            key
            title
            thumbnail_url
            resized_urls { 
              landscape_xs
              landscape_s
              lazy_default 
            }
          }
        }
      }
      basic_video {
        _id
        additional_properties { 
          advertising { playAds playVideoAds }
        }
        duration
        streams { stream_type url }
        embed_html
        promo_items {
          basic { url type caption }
        }
      }
      youtube_id {
        content
      }
    }
  }`

export const SchemaMultiStory = (arcSite) => `{
    content_elements {
      websites { ${arcSite} { website_url website_section{name path} } }
      headlines { basic }
      credits { by { name, url, id, type } }
      promo_items {
        basic { url type resized_urls { landscape_md lazy_default  } }
        basic_video {
          _id
          embed_html
          duration
          additional_properties { 
            advertising { playAds playVideoAds }
          }
          promo_items {
            basic { url type resized_urls { landscape_md lazy_default  } }
          }
        }
        basic_jwplayer {
          subtype
          type
          embed{
            config{
              key
              thumbnail_url
              title
              resized_urls { 
                landscape_xs
                landscape_s
                lazy_default 
              }
            }
          }
        }
        youtube_id {
          content
        }
      }
    }
  }`

export const SchemaHierarchy = () => `{ 
		children {
			name
			_id
			display_name
			url
			node_type
		}
	}`
