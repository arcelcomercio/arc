export default arcSite => {
  return `{ 
    headlines { basic }
    websites { ${arcSite} { website_url } }
    promo_items {
        youtube_id {
          content
        }
        basic { url type subtitle caption resized_urls { landscape_md landscape_l square_md lazy_default  } }
        basic_video {
          promo_items {
            basic { url type subtitle caption resized_urls { landscape_md landscape_l square_md lazy_default  } }
          }
        }
        basic_gallery {
          content_elements
          promo_items {
            basic { url type subtitle caption resized_urls { landscape_md landscape_l square_md lazy_default  } }
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
