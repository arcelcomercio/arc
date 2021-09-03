export default function (arcSite) {
  return `{ 
    headlines { basic }
    credits {
      by { name url type }
    }
    websites { ${arcSite} { website_url website_section{name path} } }
  }`
}
