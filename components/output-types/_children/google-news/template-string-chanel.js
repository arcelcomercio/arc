const ElementStringChanel = chanelProps => {
  const {
    siteName = '',
    siteUrl = '',
    siteDescription = '',
    googleNewsImage = '',
  } = chanelProps
  return `
    <url>${googleNewsImage}</url>
    <link>${siteUrl}</link>
    <description>${siteDescription}</description>
    <title>${siteName}</title>
    <image>@StringImageItem</image>
    @ItemsNews
    `
}

export default ElementStringChanel
