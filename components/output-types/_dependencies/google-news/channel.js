const Channel = channelProps => {
  const {
    siteName = '',
    siteUrl = '',
    siteDescription = '',
  } = channelProps
  return `
    <link>${siteUrl}</link>
    <description>${siteDescription}</description>
    <title>${siteName}</title>
    <image>@StringImageItem</image>
    @ItemsNews
    `
}

export default Channel
