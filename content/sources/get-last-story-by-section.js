const resolve = key => {
  let requestUri = `/content/v4/search/published?q=taxonomy.sites.path:"/${key.section}"&sort=publish_date:desc&size=1&website=${key.website}`;

  if (!key.hasOwnProperty("section"))
    throw new Error("content source requires a section");
  if (!key.hasOwnProperty("website"))
    throw new Error("content source requires a website");
  return requestUri;
};

export default {
  resolve,
  schemaName: "stories",
  params: {
    section: "text",
    website: "text"
  }
};
