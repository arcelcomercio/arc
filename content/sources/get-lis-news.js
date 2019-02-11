const resolve = key => {
    let requestUri = `/content/v4/search/published/?q=taxonomy.sites.path:"/politica"&sort=publish_date:desc&from=0&size=10`;
    // if (!key.hasOwnProperty("website_url"))
    //   throw new Error("apertura-extraordinaria content source requires a website");
    
      //requestUri = `${requestUri}?website_url=${key.website_url}`;
    
    console.log(requestUri);
    return `${requestUri}&website=${key.website}`;
  };


  export default {
    resolve,
    schemaName: "list",
    params: {
      website: "text"
    }
  };
  