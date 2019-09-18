export const SchemaSingleStory = arcSite => {
  return `{
    websites { ${arcSite} { website_url } }
    headlines { basic }
    subheadlines { basic }
    display_date
    taxonomy {
      primary_section { name path }
    }
    promo_items {
      basic { url type resized_urls { landscape_md lazy_default  } }
      basic_video {
        _id
        embed_html
        promo_items {
          basic { url type resized_urls { landscape_md lazy_default  } }
        }
      }
      youtube_id {
        content
      }
    }
  }`
}

export const SchemaMultiStory = arcSite => {
  return `{
    content_elements {
      websites { ${arcSite} { website_url } }
      headlines { basic }
      taxonomy {
        primary_section { name path }
      }
      promo_items {
        basic { url type resized_urls { landscape_md lazy_default  } }
        basic_video {
          _id
          embed_html
          promo_items {
            basic { url type resized_urls { landscape_md lazy_default  } }
          }
        }
        youtube_id {
          content
        }
      }
    }
  }`
}

export const SchemaHierarchy = () => {
  return `{ 
		children {
			name
			_id
			display_name
			url
			node_type
		}
	}`
}
