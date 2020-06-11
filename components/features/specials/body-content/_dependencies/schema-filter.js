const basicVideo = `    
basic_video {
  streams{
    stream_type
    filesize
    url
  }
  duration
  _id
  embed_html
  type
  headlines{
    basic
  }
  publish_date
  description{
    basic
  }
  additional_properties{
    advertising{
      allowPrerollOnDomain
      playAds
      forceAd
      playVideoAds
      enableAdInsertion
      enableAutoPreview
    }
  }
  promo_items{
    basic { 
      url 
      type 
      subtitle
      caption
      width
      height
    }
  }
}`

const basicGallery = `
basic_gallery {
  type
  promo_items{
    basic{
      caption
      type
      width
      height
      url
    }
  }
  content_elements{
    subtitle
    caption
    width
    height
    url
  }
}`

export default `
content_elements {
  _id
  type
  content
  caption
  embed{
    id
    config{
      link
      photo
      title
      alt
    }
  }
  raw_oembed{
    url
    html
    provider_name
    type
    width
  }
  additional_properties{
    advertising{
      allowPrerollOnDomain
      playAds
      forceAd
      playVideoAds
      enableAdInsertion
      enableAutoPreview
    }
  }
  level
  language
  url
  duration
  list_type
  title
  subtype_label
  subtype
  width
  publish_date
  height
  citation{
    type
    content
  }
  content_elements{
    width
    height
    url
    subtitle
    type
    content
  }
  header{
    type
    content
  }
  rows
      {
        type
        content
      }
  
  headlines{
    basic
  }
  description{
    basic
  }
  items{
    type
    content
    url
    description{
      type
      content
    }
    image {
      type
      url
    }
  }
  streams{
    stream_type
    filesize
    url
  }
  duration
  embed_html
  promo_image{
    width
    height
    url
  }
  promo_items{
    basic{
      caption
      subtitle
      url
      width
      height
      
    }
  }

  canonical_url
  headlines{
    basic
  }
  credits{
    by  {
      type
      name
      slug
      url
      description
      image {
        url
      }
      referent{
        type
        id  
      }
    }
  }
}
canonical_url
promo_items{
  basic_html{
    content
    type
  }
  infografia {
    content
    type
  }
  youtube_id {
    content
    type
  }
  basic { 
    url 
    type
    subtitle
    caption
    width
    height

  }
  path_mp3 {
    content
    _id
    type
  }
  ingredients {
    content
  }
  ${basicVideo}
  ${basicGallery}
}

credits{
  by  {
    name
    slug
    url
    description
    image {
      url
    }
    type
    social_links{
      site
      url
    }
    additional_properties{
      original{
        email
        education
        role
        bio
      }
    }
  }
}`
