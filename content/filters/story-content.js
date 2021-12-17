import { basicGallery } from './basic-gallery'
import { basicVideo } from './basic-video'
import { basicVideoJWplayer } from './basic-video-jwplayer'

const websites = `
website_section{
  type
  name
  path
}
`
export const storyContent = `
param
_id
type
content_elements {
  _id
  type
  content
  text
  correction_type
  caption
  embed{
    id
    config{
      key
      chapter
      score
      plataform
      interviewed
      career_interviewed
      release_date
      premiere_image
      year
      director {
        name
        url
      }
      cast {
        name
        url
      }
      genre {
        name
        url
      }
      clasification
      description
      duration
      thumbnail_url
      has_ads
      account
      resized_urls { 
        landscape_xs
        landscape_s
        lazy_default 
        landscape_md
        large
      }
      link
      photo
      title
      alt
      width
      height
      prepTime
      totalTime
      recipeCuisine
      recipeYield
      puntuation
      countReviews
      content
      date
      type_event
      name
      location_name
      location_address
      start_date
      category_software
      so_software
      author_book
      isbn_book
      url_book
      image_local
      sameas_movie
      image_movie
      description_movie
      review_product
      author_product
      image_recipe
      customBlockType
      customBlockContent
      url
      url_img
      conversions{
        key
        mediatype
        link {
          path
          address
        }
      }
      response
      question{
        name
        response
      }
      image{
        url
        title
        alt
        width
        height
      }
      block
      data { 
        bg_color color html type title url url_logo url_mobile author_type text_type text name list gallery_id author img listTitle topText
        item {
          author
          img
          number
          text
          title
          topText
        }
        stories {
          date description title url image {caption url}
        }
        image {caption url}
      }
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
  resized_urls { 
    landscape_md
  }
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
      _id
      caption
      subtitle
      url
      width
      height
      resized_urls { 
        large
        landscape_md
        landscape_s
      }
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
created_date
last_updated_date
canonical_url
headlines {
  basic
  meta_title
}
address{
  locality
}
subheadlines {
  basic
}
source
label{
  audiencia_nicho{
    text
    url
  }
  nucleo{
    text
    url
  }
  formato{
    text
    url
  }
  contenido{
    text
    url
  }
  genero{
    text
    url
  }
  facebook_ia{
    text
    url
  }
  trustproject{
    text
    url
  }
}
content_restrictions{
  content_code
}
subheadlines{
  basic
}
description
copyright
source{
  source_id
}
comments{
  allow_comments
  display_comments
  moderation_required
}
taxonomy {
  tags{
    text
    description
    slug
  }
  sections{
    name
  }
  seo_keywords
}
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
    _id 
    url 
    type
    subtitle
    caption
    width
    height
    credits {
      by {
        name
      }
    }
    resized_urls { 
      large
      landscape_md
      landscape_s
    }
  }
  basic_movil { 
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
  ${basicVideoJWplayer}
  ${basicVideo}
  ${basicGallery}
  basic_parallax { embed { config { block data { bg_color color html type url url_logo url_mobile } } } }
  basic_resumen { embed { config { block data { description name text title } } } }
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
}
subtype
display_date
publish_date
website

editor_note
website_url
related_content{
  redirect{
    type
    redirect_url
  }
}
websites{
  elcomercio{
    ${websites}
  }
  elcomerciomag{
    ${websites}
  }
  peru21g21{
    ${websites}
  }
  peru21{
    ${websites}
  }
  trome{
    ${websites}
  }      
  depor{
    ${websites}
  }   
  ojo{
    ${websites}
  }  
  diariocorreo{
    ${websites}
  }   
  gestion{
    ${websites}
  }      
  elbocon{
    ${websites}
  }      
  perucom{
    ${websites}
  }
}
description { basic }
`
