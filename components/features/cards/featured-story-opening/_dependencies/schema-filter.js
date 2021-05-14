export const schemaNote = (arcSite) => {
  return `{ 
    headlines { basic }
    subheadlines { basic }
    content_restrictions { content_code }
    credits {
      by { name url type }
    }
    websites { ${arcSite} { website_url website_section{name path} } }
  }`
}

export const schemaURL = () => {
  return `{ 
    headlines { basic }
    website_url
  }`
}
