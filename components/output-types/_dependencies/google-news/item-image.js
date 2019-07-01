const ItemImage = ({siteDomain='',siteUrl='',googleNewsImage =''}) => {
  return `
  <url>${googleNewsImage}</url>
  <title>${siteDomain}</title>
  <link>${siteUrl}</link>
  `
}

export default ItemImage
