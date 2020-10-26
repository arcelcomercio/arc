export default arcSite => `{ 
    canonical_url 
    headlines { basic }
    subheadlines { basic }
    credits {
      by { name url type }
    }
    websites {
      ${arcSite} {
        website_url
      }
    }
    promo_items {
        basic { url type subtitle caption resized_urls { landscape_xl } }
        basic_video {
          promo_items {
            basic { url type subtitle caption resized_urls { landscape_xl } }
          }
        }
        basic_jwplayer {
          subtype
          type
          embed{
            config{
              thumbnail_url
              resized_urls { 
                landscape_xs
                landscape_s
                lazy_default 
              }
            }
          }
        }
        basic_gallery {
          promo_items {
            basic { url type subtitle caption resized_urls { landscape_xl } }
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
