export default `{ 
    canonical_url 
    headlines { basic }
    subheadlines { basic }
    credits {
      by { name url type }
    }
    website_url
    promo_items {
        basic { url type resized_urls { landscape_xl } }
        basic_video {
          promo_items {
            basic { url type resized_urls { landscape_xl } }
          }
        }
        basic_gallery {
          promo_items {
            basic { url type resized_urls { landscape_xl } }
          }
        }
      }
    taxonomy {
      primary_section {
          name
          path
      }
      tags {
        description
        slug
      }
    }
  }`
