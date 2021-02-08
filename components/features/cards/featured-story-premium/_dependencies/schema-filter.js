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
        basic { url type subtitle caption }
        basic_video {
          promo_items {
            basic { url type subtitle caption }
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
            basic { url type subtitle caption }
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
