export default (arcSite) => `{ 
  headlines { basic mobile }
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
