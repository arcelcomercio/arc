const resolve = key => {
  // let requestUri = `/content/v4/search/published/?q=taxonomy.sites.path:"/politica"&sort=publish_date:desc&from=0&size=10`;
  // let requestUri = `/content/v4/search/published/?q=taxonomy.sites.path:`;
  // let requestUri = `/content/v4/search/published?sort=publish_date:desc&from=0&size=10&q=&website=elcomercio`
  let requestUri = ``;
  // let newsNumber = 1; //numero de noticas por defecto

  if (!key.newsNumber) {
    // eslint-disable-next-line no-param-reassign
    key.newsNumber = 1;
  }

  const numero = key.newsNumber;
  if (key.section) {
    if (key.section === "*") {
      requestUri = `/content/v4/search/published?sort=publish_date:desc&from=0&size=${numero}&q=`;
    } else {
      requestUri = `/content/v4/search/published/?q=taxonomy.sites.path:`;
      requestUri = `${requestUri}"${
        key.section
      }"&sort=publish_date:desc&from=0&size=${numero}`;
    }
  } else {
    throw new Error("Lista-component content source requires a section");
  }

  if (key.website) {
    requestUri = `${requestUri}&website=${key.website}`;
  } else {
    throw new Error("Lista-component content source requires a website");
  }

  return requestUri;

};


export default {
  resolve,
  schemaName: "list",
  params: {
    website: "text",
    newsNumber: "number",
    section: "text"
  }
};