export default arcSite => {
  return `{ 
    headlines { basic }
    subheadlines { basic }
    websites { ${arcSite} { website_url } }
  }`
}
