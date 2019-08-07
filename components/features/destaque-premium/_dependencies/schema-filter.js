export default function(arcSite) {
  return `{ 
    headlines { basic }
    subheadlines { basic }
    content_restrictions { content_code }
    credits {
      by { name url type }
    }
    websites { ${arcSite} { website_url } }
    promo_items {
        basic { url type resized_urls { landscape_md landscape_l square_md  } }
        basic_video {
          promo_items {
            basic { url type resized_urls { landscape_md landscape_l square_md  } }
          }
        }
        basic_gallery {
          promo_items {
            basic { url type resized_urls { landscape_md landscape_l square_md  } }
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
