export default (arcSite) => `
{
  content_elements{
    websites { ${arcSite} { website_url website_section{name path} } }
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
  } 
}
`
