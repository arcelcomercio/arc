export default (arcSite) => `{ 
  canonical_url
  websites {
    ${arcSite} {
      website_url
    }
  }
  content_elements {
    _id
    type
    subtype
    embed {
      config {
        chapter
        plataform
      }
    }
  }
  promo_items{
    basic_video {
      type
      promo_items {
        basic {
          type 
          url
          resized_urls { 
            landscape_s
            lazy_default
            portrait_s
          }
        }
      }
    }
    basic_gallery {
      type 
      promo_items {
        basic {
          type 
          url
          resized_urls { 
            landscape_s
            lazy_default
            portrait_s
          }
        }
      }
    }
    basic_jwplayer {
      subtype
      type
      embed{
        config{
          thumbnail_url
          resized_urls { 
            landscape_xs
            landscape_s
            portrait_s
            lazy_default 
          }
        }
      }
    }
    basic {
      type 
      url
      resized_urls { 
        landscape_s
        lazy_default
        portrait_s
      }
    }
  }
  headlines{
    basic
  }
  taxonomy {
    primary_section {
        name
        path
    }
  }
  credits {
    by { name url type }
  } 
  } 
  section_name
}`
