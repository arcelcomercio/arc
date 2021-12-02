// eslint-disable-next-line import/prefer-default-export
export const basicGallery = `
basic_gallery {
  type
  promo_items{
    basic{
      caption
      type
      width
      height
      url
      resized_urls { 
        large
        landscape_md
        landscape_s
      }
    }
  }
  content_elements{
    _id
    subtitle
    caption
    width
    height
    url
    credits{
      by {
        name
      }
      affiliation{
        name
      }
    }
    resized_urls { 
      large
      landscape_md
      landscape_s
    }
  }
}`
