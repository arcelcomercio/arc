export default arcSite => {
  return `{ 
    headlines { basic }
    credits {
      by { name url }
    }
    websites { ${arcSite} { website_url } }
    promo_items {
        basic { url type resized_urls { landscape_md landscape_l square_md lazy_default  } }
        basic_video {
          promo_items {
            basic { url type resized_urls { landscape_md landscape_l square_md lazy_default  } }
          }
        }
        basic_gallery {
          promo_items {
            basic { url type resized_urls { landscape_md landscape_l square_md lazy_default  } }
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
