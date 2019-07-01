const Channel = ({
  siteName,
  siteUrl,
  fechaIso = '',
  descripcion = '',
}) => {
  return `
        <language>es</language>
        <title>${siteName}</title>
        <description>${descripcion}</description>
        <lastBuildDate>${fechaIso}</lastBuildDate>
        <link>${siteUrl}</link>
        @ListItems
  `
}

export default Channel
