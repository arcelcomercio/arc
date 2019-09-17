export default function(arcSite) {
  return `{ 
    headlines { basic }
    credits {
      by { name url type }
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
