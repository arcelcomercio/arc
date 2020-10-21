export default function(arcSite) {
  return `{ 
    headlines { basic }
    ${arcSite === 'elcomercio' ? '' : 'subheadlines { basic }'}
    content_restrictions { content_code }
    credits {
      by { name url type }
    }
    websites { ${arcSite} { website_url } }
    promo_items {
        basic { url type subtitle caption resized_urls { landscape_md landscape_l square_md lazy_default portrait_md square_xl } }
        basic_video {
          promo_items {
            basic { url type subtitle caption resized_urls { landscape_md landscape_l square_md lazy_default portrait_md  } }
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
            basic { url type subtitle caption resized_urls { landscape_md landscape_l square_md lazy_default portrait_md  } }
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
