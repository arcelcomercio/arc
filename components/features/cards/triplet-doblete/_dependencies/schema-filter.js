export default function (arcSite) {
  return `{ 
    _id
    headlines { 
      basic
      mobile
    }
    promo_items {
      basic_video {
        type
        promo_items {
          basic {
            type 
            url
          }
        }
      }
      basic_jwplayer {
        subtype
        type
        embed {
          config {
            thumbnail_url
          }
        }
      }
      basic_gallery {
        type 
        promo_items {
          basic {
            type 
            url
          }
        }
      }
      basic {
        type 
        url
      }
    }
    credits {
      by { 
        name 
        url 
        type 
      }
    }
    websites { ${arcSite} { website_url website_section{name path} } }
  }`
}
