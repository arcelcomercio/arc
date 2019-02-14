const resolve = key => {
  //let requestUri = `/content/v4/search/published/?q=taxonomy.sites.path:"/politica"&sort=publish_date:desc&from=0&size=10`;
  //let requestUri = `/content/v4/search/published/?q=taxonomy.sites.path:`;
  //let requestUri = `/content/v4/search/published?sort=publish_date:desc&from=0&size=10&q=&website=elcomercio`
  let requestUri = ``;
  //let newsNumber = 1; //numero de noticas por defecto
  
  if (!key.newsNumber) {
    key.newsNumber = 1;
  }

  var numero = key.newsNumber;
  if (key.secction) {
    if (key.secction === "*") {
      requestUri = `/content/v4/search/published?sort=publish_date:desc&from=0&size=${numero}&q=`;
    } else {
      requestUri = `/content/v4/search/published/?q=taxonomy.sites.path:`;
      requestUri = `${requestUri}"${
        key.secction
      }"&sort=publish_date:desc&from=0&size=${numero}`;
    }
  } else {
    throw new Error("Lista-component content source requires a secction");
  }

  if (key.website) {
    requestUri = `${requestUri}&website=${key.website}`;
  } else {
    throw new Error("Lista-component content source requires a website");
  }

  console.log(requestUri);
  return requestUri;
  //return `${requestUri}&website=${key.website}`;
};
// if (!key.hasOwnProperty("website"))
// throw new Error("Lista-component content source requires a website");
// requestUri = `${requestUri}?website=${key.website}`;

//let requestUri = `/content/v4/search/published/?q=taxonomy.sites.path:"/politica"&sort=publish_date:desc&from=0&size=10`;
// if (!key.hasOwnProperty("website_url"))
//   throw new Error("apertura-extraordinaria content source requires a website");

//requestUri = `${requestUri}?website_url=${key.website_url}`;

export default {
  resolve,
  schemaName: "list",
  params: {
    website: "text"
  }
};
