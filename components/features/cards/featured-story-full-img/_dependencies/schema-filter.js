export default (arcSite) => {
  return `{ 
    headlines { basic }
    credits {
      by { 
        name url type 
        image { url }
      }
    }
    websites { ${arcSite} { website_url } }
    websites { ${arcSite} { website_url website_section{name path} } }
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
            basic { url type subtitle caption resized_urls { landscape_l portrait_md square_xl square_md lazy_default  } }
          }
        }
      }
  }`
}
