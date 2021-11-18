export default (arcSite) => `
{
  content_elements{
    content_restrictions { content_code }
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
            resized_urls { mobile }
          }
        }
      }
      basic_jwplayer {
        subtype
        type
        embed{
          config{
            thumbnail_url
            resized_urls { mobile }
          }
        }
      }
      basic_gallery {
        type 
        promo_items {
          basic {
            type 
            url
            resized_urls { mobile }
          }
        }
      }
      basic {
        type 
        url
        resized_urls { mobile }
      }
    }
    headlines{
      basic
    }
  } 
  section_name
  section_id
  next
}
`
