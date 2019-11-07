export default arcSite => {
  return `{ 
    headlines { basic }
    credits {
      by { 
        name url type 
        image { url }
      }
    }
    websites { ${arcSite} { website_url } }
    promo_items {
        youtube_id {
          content
        }
        basic { url type subtitle caption resized_urls { landscape_l portrait_md square_xl square_md lazy_default  } }
        basic_video {
          promo_items {
            basic { url type subtitle caption resized_urls { landscape_l portrait_md square_xl square_md lazy_default  } }
          }
        }
        basic_gallery {
          promo_items {
            basic { url type subtitle caption resized_urls { landscape_l portrait_md square_xl square_md lazy_default  } }
          }
        }
      }
    taxonomy {
      primary_section {
          name
          path
      }
    }
  }`
}
