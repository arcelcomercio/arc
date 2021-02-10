export default (arcSite) => `{ 
  headlines { basic }
  credits {
    by { name url type }
  }
  promo_items {
    youtube_id {
      content
    }
    basic { 
      url 
      type
      caption
    }
    basic_video {
      promo_items {
        basic { 
          url 
          type
          caption
        }
      }
    }
    basic_jwplayer {
      subtype
      type
      embed{
        config{
          thumbnail_url
        }
      }
    }
    basic_gallery {
      promo_items {
        basic { 
          url 
          type
          caption
        }
      }
    }
  }
  websites {
    ${arcSite} {
      website_url
    }
  }
  taxonomy { 
    primary_section { 
      name
      path 
    }
    sections {
      name
      path 
    }
  }
  publish_date
  display_date
}`