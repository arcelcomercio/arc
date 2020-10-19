// eslint-disable-next-line import/prefer-default-export
export const basicVideoJWplayer = `    
basic_jwplayer {
  subtype
  type
  embed{
    config{
      key
      title
      description
      duration
      thumbnail_url
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
