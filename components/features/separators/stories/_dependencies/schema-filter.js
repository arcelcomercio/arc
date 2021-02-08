export default arcSite => `
{
  content_elements{
    websites { ${arcSite} { website_url } }
    credits {
      by { 
        name url type 
      }
    }
    promo_items{
      basic_video {
        type
        promo_items {
          basic {
            type 
            url
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
        type 
        promo_items {
          basic {
            type 
            url
          }
        }
      }
      basic {
        type 
        url
      }
    }
    headlines{
      basic
    }
  } 
  section_name
}
`
