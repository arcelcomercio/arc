export default arcSite => {
  return `{
      content_elements { 
        headlines { basic }
        websites { ${arcSite} { website_url } }
        display_date
        publish_date
        promo_items {
          basic { url type resized_urls { landscape_md lazy_default  } }
          basic_video {
            promo_items {
              basic { url type resized_urls { landscape_md lazy_default  } }
            }
          }
          basic_gallery {
            promo_items {
              basic { url type resized_urls { landscape_md lazy_default  } }
            }
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
