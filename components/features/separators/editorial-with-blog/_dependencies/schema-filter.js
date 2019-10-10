export const schemaBlog = `{
  blog { path blogname }
  posts { post_permalink post_title }
  user { 
    first_name 
    user_avatarb { 
      resized_urls { lazy_default author_sm }
    }
  }
}`

export const schemaEditorial = `{ 
  content_elements {
    website_url
    headlines { basic }
    credits {
      by { 
        name 
        url 
        image {
          resized_urls { lazy_default square_s }
        }
      }
    }
  }
}`
