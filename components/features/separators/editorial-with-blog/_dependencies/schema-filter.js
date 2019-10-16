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
  }
}`

export const schemaPhoto = `{
  resized_urls { 
    square_s
    lazy_default
  }
}`
