const ElementStringChanel = chanelProps => {
  const { siteName, siteUrl = '', descripcion = '' } = chanelProps
  return `
    <link>${siteUrl}</link>
    <description>${descripcion}</description>
    <title>${siteName}</title>
    <image>@StringImageItem</image>
    @ItemsNews
    `
}

export default ElementStringChanel
