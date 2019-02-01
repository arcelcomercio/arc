const resolve = key => {
  const requestUri = `/content/v4/stories/?website_url=${key.website_url ||
    key}&website=elcomercio`;
  return requestUri;
};

export default {
  resolve,
  schemaName: "story",
  params: {
    website_url: "text"
  }
};
