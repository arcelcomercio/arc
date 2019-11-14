export default (website) => `
  {
    content_elements {
      url
      responsetype
      _id
      canonical_url
      websites{
        ${website}{
          website_url
        }
      }
      promo_items{
        basic_video {
          type
          promo_items {
            basic {
              type 
              url
              resized_urls { 
                portrait_xs
              }
            }
          }
        }
        basic_gallery {
          type 
          promo_items {
            basic {
              type 
              url
              resized_urls { 
                portrait_xs
              }
            }
          }
        }
        basic {
          type 
          url
          resized_urls { 
            portrait_xs
          }
        }
      }
      headlines{
        basic
      }
      taxonomy {
        primary_section {
            _id 
            _website 
            type 
            name 
            path
        }
      }
    }
  }
    `