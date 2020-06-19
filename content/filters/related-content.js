import { basicVideo } from './basic-video'

// eslint-disable-next-line import/prefer-default-export
export const relatedContent = `
related_content{
  basic{
    _id
    canonical_url
    website_url
    content_restrictions{
      content_code
    }
    type
    headlines{
      basic
    }
    credits {
      by { name url type }
    }
    promo_items{
      basic{
        type
        url
        width
        height
      }
      basic_gallery{
        promo_items{
          basic{
            type
            caption
            subtitle
            url
          }
        }
      }
      ${basicVideo}
    }
  }
}`
