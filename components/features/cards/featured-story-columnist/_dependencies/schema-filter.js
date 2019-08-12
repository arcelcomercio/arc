export default function(arcSite) {
  return `{ 
    subheadlines { basic }
    content_restrictions { content_code }
    credits {
      by { name url type image }
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
