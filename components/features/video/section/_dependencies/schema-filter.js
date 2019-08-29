export default function(arcSite) {
  return `{ 
		headlines { basic }
    subheadlines { basic }
		websites { ${arcSite} { website_url } }
		promo_items {
      basic { 
          url 
          type 
          resized_urls { 
            preset1
          } 
        }
        basic_video {
          _id
          embed_html
        }
        youtube_id {
          content
      }
    }
    taxonomy {
			tags { text slug }
      primary_section {
          name
          path
      }
    }
  }`
}
