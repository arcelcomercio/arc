const resolve = key => {
  let requestUri = `/content/v4/stories/`;
  if (!key.hasOwnProperty("website_url"))
    throw new Error("apertura-extraordinaria content source requires a website");
  requestUri = `${requestUri}?website_url=${key.website_url}`;
  if (!key.hasOwnProperty("website"))
    throw new Error("apertura-extraordinaria content source requires a website");
  return `${requestUri}&website=${key.website}`;
};

export default {
  resolve,
  schemaName: "story",
  params: {
    website_url: "text",
    website: "text"
  }
};
