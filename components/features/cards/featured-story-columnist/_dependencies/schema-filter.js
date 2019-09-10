export default function(arcSite) {
  return `{ 
    subheadlines { basic }
    content_restrictions { content_code }
    credits {
      by { name url type image { url } }
    }
    websites { ${arcSite} { website_url } }
    taxonomy {
      primary_section {
          name
          path
      }
    }
  }`
}
