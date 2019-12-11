export default arcSite => {
  return `{ 
    content_elements { 
      headlines { basic }
      subheadlines { basic }
      display_date
      taxonomy {
        primary_section {
          name
          path
        }
      }
      credits {
        by { 
          name url type 
          image {
            url
          }
        }
      }
      websites { ${arcSite} { website_url } }
      promo_items {
        youtube_id {
          content
        }
        basic { url type resized_urls { landscape_xs landscape_md landscape_s lazy_default } }
        basic_video {
          promo_items {
            basic { url type resized_urls { landscape_xs landscape_md landscape_s lazy_default } }
          }
        }
        basic_gallery {
          promo_items {
            basic { url type resized_urls { landscape_xs landscape_md landscape_s lazy_default } }
          }
        }
        basic_html {
          content 
        }
      }
    }    
  }`
}
