const mediaContentHtml = mediaContentHtmlProps => {
  const {
    multimedia,
    title,
    type
  } = mediaContentHtmlProps

  const element = `
      <media:thumbnail url="${multimedia}" type="image/jpeg" />
      <media:title>${title}</media:title>
      <media:credit></media:credit>      
    `
  return element
}

export default mediaContentHtml