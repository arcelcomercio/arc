const ElementStringChanel = chanelProps => {
  const { siteName, siteUrl, fechaIso = '', descripcion = '' } = chanelProps
  return `
        <language>es</language>
        <title>${siteName}</title>
        <description>${descripcion}</description>
        <lastBuildDate>${fechaIso}</lastBuildDate>
        <link>${siteUrl}</link>
        @ListItems
  `
}

export default ElementStringChanel