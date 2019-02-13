const resolve = key => {
    let requestUri = `/content/v4/search/published/?q=taxonomy.sites.path:"/politica"&sort=publish_date:desc&from=0&size=10`;
    
    if(key.secction){
      requestUri=requestUri.replace("politica",key.secction)
    }
    
    if(key.website){
      
      requestUri = `${requestUri}&website=${key.website}`;
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
  