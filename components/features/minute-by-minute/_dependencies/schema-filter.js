export default arcSite => {
  return `{ 
    headlines { basic }
    websites { ${arcSite} { website_url } }
  }`
}
