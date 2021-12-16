export default (arcSite) => `{ 
  content_elements {
    _id
    type
    subtype
    embed {
      config {
        plataform
        score
        career_interviewed
        interviewed
      }
    }
  }
  headlines { basic }
  subheadlines { basic }
  credits {
    by { name url type }
  }
  promo_items {
    basic { 
      url 
      type
      subtitle
      caption
      resized_urls { 
        landscape_md
        landscape_s
        lazy_default
      } 
    }
    basic_video {
      promo_items {
        basic { 
          url 
          type
          subtitle
          caption
          resized_urls { 
            landscape_md
            landscape_s
            lazy_default
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
            landscape_md
            landscape_s
            lazy_default 
          }
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
          resized_urls { 
            landscape_md
            landscape_s
            lazy_default
          } 
        }
      }
    }
  }
  websites {
    ${arcSite} {
      website_url
      website_section {
        name
        path
      }
    }
  }
  taxonomy { 
    sections {
      name
      path 
    }
  }
  publish_date
  display_date
}`
