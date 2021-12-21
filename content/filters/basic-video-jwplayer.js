// eslint-disable-next-line import/prefer-default-export
export const basicVideoJWplayer = `    
basic_jwplayer {
  subtype
  type
  embed{
    config{
      key
      title
      date
      description
      duration
      has_ads
      author
      account
      thumbnail_url
      resized_urls { 
        landscape_xs
        landscape_s
        lazy_default
        large 
      }
      conversions{
        key
        mediatype
        link {
          path
          address
        }
      }
    }
  }
}`
