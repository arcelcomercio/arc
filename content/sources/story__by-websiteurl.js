const resolve = key => {
  const requestUri = `/content/v4/stories/?website_url=${key.website_url}&website=${key.website}`;

  const hasWebsite = Object.prototype.hasOwnProperty.call(key, 'website')
  const hasWebsiteUrl = Object.prototype.hasOwnProperty.call(key, 'website_url')

  if (hasWebsiteUrl && hasWebsite)
    return requestUri;
  throw new Error("The content source requires a website and url");
}

export default {
  resolve,
  schemaName: "story",
  params: {
    website_url: "text",
    website: "text"
  }
}