export default arcSite => {
  return `{
      content_elements { 
        headlines { basic }
        websites { ${arcSite} { website_url } }
        display_date
        publish_date
        promo_items {
          basic { url type }
          basic_video {
            promo_items {
              basic { url type }
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
              basic { url type }
            }
          }
          youtube_id {
            content
          }
        }
        credits{
          by{
            type
            name
            url
          }
        }
      }
    }`
}
