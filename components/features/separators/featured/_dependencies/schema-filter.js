export default arcSite => `
{
  content_elements{
    websites { ${arcSite} { website_url } }
    promo_items{
      basic_video {
        type
        promo_items {
          basic {
            type 
            url
            caption
          }
        }
      }
      basic_gallery {
        type 
        promo_items {
          basic {
            type 
            url
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
      basic {
        type 
        url
        caption
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
  } 
}
`
