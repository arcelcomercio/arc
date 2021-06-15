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
    subtitle
    caption
    width
    height
    url
    credits{
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
