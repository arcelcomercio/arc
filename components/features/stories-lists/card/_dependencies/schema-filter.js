export default (arcSite, seeImageNews) => {
  return `{
    content_elements { 
      headlines { basic }
      websites { ${arcSite} { website_url } }
      content_restrictions{
        content_code
      }
      display_date
      ${
        seeImageNews
          ? `promo_items {
        basic { url type resized_urls { landscape_md lazy_default  } }
        basic_video {
          promo_items {
            basic { url type resized_urls { landscape_md lazy_default  } }
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
            basic { url type resized_urls { landscape_md lazy_default  } }
          }
        }
        youtube_id {
          content
        }
      }`
          : ''
      }
    }
  }`
}
