/* 
document.addEventListener("DOMContentLoaded", () => {
  requestIdle(() => {
    const sections = sectionsToReplace;
    const adsHtml = adsHtmlToReplace;
    const contextPath = contextPathToReplace;
    const arcSite = arcSiteToReplace;
    const deployment = deploymentToReplace;
    const VIDEO = "basic_video";
    const GALLERY = "basic_gallery";

    const getAssetsPath = () => {
      if (!contextPath) return "/pf";
      if (!arcSite) return contextPath;

      let site = `${arcSite}.pe`;
      if (arcSite === "depor") site = `${arcSite}.com`;
      if (arcSite === "elcomerciomag") site = "elcomercio.pe";
      if (arcSite === "peru21g21") site = "peru21.pe";

      return `https://cdna.${site}`;
    };

    const defaultImage = () => {
      return `${getAssetsPath(
        arcSite,
        contextPath
      )}/resources/dist/${arcSite}/images/default-md.png?d=2`;
    };

    const getMultimediaIcon = (multimediaType) => {
      let icon = "";
      switch (multimediaType) {
        case VIDEO:
          icon = "icon-video";
          break;
        case GALLERY:
          icon = "icon-img";
          break;
        default:
          return "";
      }
      return icon;
    };
    const getMultimediaType = ({ basicVideoUrl, basicJwPlayerVideoUrl, basicGalleryUrl }) => {
      if (basicVideoUrl || basicJwPlayerVideoUrl) return "basic_video";
      if (basicGalleryUrl) return "basic_gallery";
      return "basic";
    };

    const formatContent = ({ section, content }) => {
      const formatedSection = section ? `/${section}` : "";
      const {
        content_elements: contentElements = [],
        section_name: sectionName,
      } = content || {};
      const [{ websites: websitesSecctionPrimary = {} } = {}] =
        contentElements || [];
      const {
        website_section: {
          path: primarySectionPath = "",
          name: primarySectionName = "",
        } = {},
      } = websitesSecctionPrimary[arcSite] || {};
      return {
        sN: sectionName || primarySectionName || "",
        sU: `${formatedSection || primarySectionPath || ""}/`,
        cE: contentElements.map(
          (
            {
              headlines: { basic } = {},
              websites: { [arcSite]: { website_url: websiteUrl } = {} } = {},
              credits: { by: [{ name, url } = {}] = [] } = {},
              promo_items: {
                basic: { resized_urls: { mobile: basicUrl } = {} } = {},
                basic_video: {
                  promo_items: {
                    basic: {
                      resized_urls: { mobile: basicVideoUrl } = {},
                    } = {},
                  } = {},
                } = {},
                basic_gallery: {
                  promo_items: {
                    basic: {
                      resized_urls: { mobile: basicGalleryUrl } = {},
                    } = {},
                  } = {},
                } = {},
                basic_jwplayer: {
                  embed: {
                    config: {
                      resized_urls: { mobile: basicJwPlayerVideoUrl } = {},
                    } = {},
                  } = {},
                } = {},
              } = {},
            },
            i
          ) => {
            const auxReturnObj = {
              t: basic,
              u: websiteUrl,
              n: name,
              a: url,
              m: getMultimediaType({
                basicVideoUrl,
								basicJwPlayerVideoUrl,
                basicGalleryUrl,
              }),
            };
            if (i === 0) {
              auxReturnObj.i =
                basicJwPlayerVideoUrl ||
                basicVideoUrl ||
                basicGalleryUrl ||
                basicUrl ||
                defaultImage({
                  size: "md",
                });
            }
            return auxReturnObj;
          }
        ),
      };
    };

    const getCinemaFeature = (cinemaContent) => {
      const {
        billboardData: { moviesList = [], cinemasList = [] } = {},
        premiereData: { alt, img: rawImg, title, url } = {},
      } = cinemaContent;

      const img =
        rawImg ||
        defaultImage({
          size: "sm",
        });

      return `<div class="cinema-card bg-white"> <article class="position-relative"> <h3 class="cinema-card__category uppercase primary-font mb-0 pb-15 text-xl line-h-none"> <a class="cinema-card__link text-gray-300" href="/cartelera"> Cartelera </a> </h3> <figure class="cinema-card__figure overflow-hidden"> <a href="/cartelera/${url}/"> <img src="${img}" alt="${alt}" class="w-full h-full object-cover" /> </a> </figure> <div class="cinema-card__detail w-full position-absolute bottom-0 pt-15 pb-15 pl-20 pr-20"> <p class="cinema-card__premiere text-xl line-h-xs font-bold"> Estreno </p> <h2 class="cinema-card__p-title overflow-hidden title-xs text-white"> <a class="cinema-card__p-link font-bold text-white line-h-xs" href="/cartelera/${url}/"> ${title} </a> </h2> </div> </article> <div class="cinema-card__movies-list p-10"> <h4 class="cinema-card__title uppercase primary-font font-bold pt-5 pb-15 pl-10 pr-10 text-md line-h-none"> Vamos al cine </h4> <form id="cinema-form" action="/cartelera/search" method="post" class="text-right mb-10"> <label htmlFor="movie-select" class="font-0"> PELICULAS </label> <select id="movie-select" name="movie" class="cinema-card__select w-full primary-font mb-10 pl-10 text-xs" value=""> <option value="" defaultValue disabled class="cinema-card__option bg-white"> PELÍCULAS </option> ${moviesList
        .map(
          (movie) =>
            `<option value="${movie.url}" class="cinema-card__option bg-white"> ${movie.title} </option>`
        )
        .join(
          ""
        )} </select> <label htmlFor="theater-select" class="font-0"> CINES </label> <select id="theater-select" name="theater" class="cinema-card__select w-full primary-font mb-10 pl-10 text-xs" value=""> <option value="" defaultValue disabled class="cinema-card__option bg-white"> CINES </option> ${cinemasList.map(
        (cinema) =>
          `<option value="${cinema.url}" class="cinema-card__option bg-white"> ${cinema.nombre} </option>`
      )} </select> <button type="submit" class="cinema-card__button bg-white inline-block uppercase font-bold primary-font border-0 text-md rounded-sm"> Buscar </button> </form> </div></div>`;
    };

    const loadFeature = () => {
      const feature = document.getElementById("section-columns-lazy");
      sections.forEach((section, ind) => {
        const newDiv = document.createElement("div");
        feature.append(newDiv);
        const includedJwPlayerPromoItems =
          "promo_items.basic_jwplayer.embed.config.thumbnail_url,promo_items.basic_jwplayer.embed.config.resized_urls";
        const fetchQueryPromoItems =
          "promo_items.basic.type,promo_items.basic.url,promo_items.basic.resized_urls,promo_items.basic_video.promo_items.basic.url,promo_items.basic_video.promo_items.basic.resized_urls,promo_items.basic_gallery.promo_items.basic.type,promo_items.basic_gallery.promo_items.basic.url,promo_items.basic_gallery.promo_items.basic.resized_urls,promo_items.youtube_id.content";
        const fetchQuery = `{"includedFields":"websites.${arcSite}.website_section.path,websites.${arcSite}.website_section.name,websites.${arcSite}.website_url,taxonomy.sections._id,taxonomy.sections.name,${fetchQueryPromoItems},${includedJwPlayerPromoItems},headlines.basic,credits.by._id,credits.by.name,credits.by.url,credits.by.type","presets":"mobile:314x157","section":"/${section}","stories_qty":4}`;
        fetch(
          `/pf/api/v3/content/fetch/story-feed-by-section?query=${encodeURI(
            fetchQuery
          )}&d=${deployment}&_website=${arcSite}`
        )
          .then((res) => res.json())
          .then((content) => {
            const { sN, sU, cE } = formatContent({ section, content }) || {};

            newDiv.innerHTML = `<div class="sec-col bg-white flex flex-col"> <div class="sec-col__header bg-info flex items-center w-auto pr-20 pl-20 mb-5"><a href="${sU}" class="flex items-center full-height"><h4 class="sec-col__title uppercase font-bold">${sN}</h4></a></div> <div role="list" class="sec-col__list bg-white h-full">${cE
              .map(
                ({ t, u, n, a, i, m }, index) =>
                  `${
                    index === 0
                      ? `<a href="${u}" class="position-relative mb-10 overflow-hidden block">${
                          getMultimediaIcon(m)
                            ? `<i class="${getMultimediaIcon(
                                m
                              )} sec-col__icon m-icon position-absolute text-center mx-auto rounded text-gray-100"></i>`
                            : ""
                        }<img class="sec-col__image w-full object-center object-cover" src="${i}" alt="${t}"/></a>`
                      : ""
                  }<article role="listitem" class="sec-col__story flex flex-col pb-10 mr-20 ml-20 mb-20 text-gray-300 border-b-1 border-dashed border-gray"><a href="${u}"><h3 class="sec-col__link mb-15 text-gray-300 line-h-sm font-bold overflow-hidden">${t}</h3></a><a class="sec-col__author text-gray-200" href="${
                    a ? `${a}/` : "/autores/"
                  }">${n || ""}</a></article>`
              )
              .join("")}</div></div>`;
          })
          .catch((err) => {
            throw new Error(err);
          });
        if (ind === 4) {
          const adsDiv = document.createElement("div");
          adsDiv.innerHTML = adsHtml || "";
          feature.append(adsDiv);
        }
        if (ind === 5) {
          const cinemaDiv = document.createElement("div");
          feature.append(cinemaDiv);
          fetch(
            `/pf/api/v3/content/fetch/cinema-billboard?query=%7B%22format%22%3A%22single%22%7D&d=${deployment}&_website=${arcSite}`
          )
            .then((res) => res.json())
            .then((res) => {
              cinemaDiv.innerHTML = getCinemaFeature(res);
              setTimeout(() => {
                const BASE_PATH = "/cartelera";
                const cinemaForm = document.getElementById("cinema-form");
                document.getElementById("movie-select").value = "";
                document.getElementById("theater-select").value = "";
                cinemaForm.addEventListener("submit", (event) => {
                  const movieSelected =
                    document.getElementById("movie-select").value;
                  const cinemaSelected =
                    document.getElementById("theater-select").value;
                  const moviePath = movieSelected || "peliculas";
                  const cinemaPath = cinemaSelected || "cines";
                  const fullPath =
                    !movieSelected && !cinemaSelected
                      ? ""
                      : `${moviePath}/${cinemaPath}`;
                  window.location.href = `${BASE_PATH}/${fullPath}/`;
                  event.preventDefault();
                });
              }, 0);
            })
            .catch((err) => {
              throw new Error(err);
            });
        }
      });
    };

    if ("IntersectionObserver" in window) {
      const { IntersectionObserver } = window;
      const options = {
        rootMargin: "0px 0px 500px 0px",
      };
      const callback = (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadFeature();
            observer.unobserve(entry.target);
          }
        });
      };
      const observer = new IntersectionObserver(callback, options);
      observer.observe(document.querySelector("#section-columns-lazy"));
    } else {
      loadFeature();
    }
  });
});
*/

// eslint-disable-next-line import/prefer-default-export
export const sectionBlockAsyncScrip = (
  sections,
  htmlAds,
  contextPath,
  arcSite,
  deployment
) =>
  `"use strict";var _slicedToArray=function(){return function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var i=[],o=!0,r=!1,a=void 0;try{for(var c,s=e[Symbol.iterator]();!(o=(c=s.next()).done)&&(i.push(c.value),!t||i.length!==t);o=!0);}catch(e){r=!0,a=e}finally{try{!o&&s.return&&s.return()}finally{if(r)throw a}}return i}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();document.addEventListener("DOMContentLoaded",function(){requestIdle(function(){var e=sectionsToReplace,t=adsHtmlToReplace,i=contextPathToReplace,o=arcSiteToReplace,r=deploymentToReplace,a=function(){return function(){if(!i)return"/pf";if(!o)return i;var e=o+".pe";return"depor"===o&&(e=o+".com"),"elcomerciomag"===o&&(e="elcomercio.pe"),"peru21g21"===o&&(e="peru21.pe"),"https://cdna."+e}()+"/resources/dist/"+o+"/images/default-md.png?d=2"},c=function(e){var t="";switch(e){case"basic_video":t="icon-video";break;case"basic_gallery":t="icon-img";break;default:return""}return t},s=function(e){var t=e.basicVideoUrl,i=e.basicJwPlayerVideoUrl,o=e.basicGalleryUrl;return t||i?"basic_video":o?"basic_gallery":"basic"},n=function(){var i=document.getElementById("section-columns-lazy");e.forEach(function(e,n){var l=document.createElement("div");i.append(l);var d;if(fetch("/pf/api/v3/content/fetch/story-feed-by-section?query="+encodeURI('{"includedFields":"websites.'+o+".website_section.path,websites."+o+".website_section.name,websites."+o+'.website_url,taxonomy.sections._id,taxonomy.sections.name,promo_items.basic.type,promo_items.basic.url,promo_items.basic.resized_urls,promo_items.basic_video.promo_items.basic.url,promo_items.basic_video.promo_items.basic.resized_urls,promo_items.basic_gallery.promo_items.basic.type,promo_items.basic_gallery.promo_items.basic.url,promo_items.basic_gallery.promo_items.basic.resized_urls,promo_items.youtube_id.content,promo_items.basic_jwplayer.embed.config.thumbnail_url,promo_items.basic_jwplayer.embed.config.resized_urls,headlines.basic,credits.by._id,credits.by.name,credits.by.url,credits.by.type","presets":"mobile:314x157","section":"/'+e+'","stories_qty":4}')+"&d="+r+"&_website="+o).then(function(e){return e.json()}).then(function(t){var i=function(e){var t=e.section,i=t?"/"+t:"",r=e.content||{},c=r.content_elements,n=void 0===c?[]:c,l=r.section_name,d=_slicedToArray(n||[],1)[0],m=(d=void 0===d?{}:d).websites,u=((void 0===m?{}:m)[o]||{}).website_section,b=(u=void 0===u?{}:u).path,p=void 0===b?"":b,v=u.name;return{sN:l||(void 0===v?"":v)||"",sU:(i||p||"")+"/",cE:n.map(function(e,t){var i=e.headlines,r=(i=void 0===i?{}:i).basic,c=e.websites,n=(c=void 0===c?{}:c)[o],l=(n=void 0===n?{}:n).website_url,d=e.credits,m=(d=void 0===d?{}:d).by,u=_slicedToArray(m=void 0===m?[]:m,1)[0],b=(u=void 0===u?{}:u).name,p=u.url,v=e.promo_items,_=(v=void 0===v?{}:v).basic,f=(_=void 0===_?{}:_).resized_urls,h=(f=void 0===f?{}:f).mobile,y=v.basic_video,w=(y=void 0===y?{}:y).promo_items,g=(w=void 0===w?{}:w).basic,x=(g=void 0===g?{}:g).resized_urls,E=(x=void 0===x?{}:x).mobile,I=v.basic_gallery,T=(I=void 0===I?{}:I).promo_items,L=(T=void 0===T?{}:T).basic,j=(L=void 0===L?{}:L).resized_urls,U=(j=void 0===j?{}:j).mobile,z=v.basic_jwplayer,A=(z=void 0===z?{}:z).embed,B=(A=void 0===A?{}:A).config,S=(B=void 0===B?{}:B).resized_urls,k=(S=void 0===S?{}:S).mobile,V={t:r,u:l,n:b,a:p,m:s({basicVideoUrl:E,basicJwPlayerVideoUrl:k,basicGalleryUrl:U})};return 0===t&&(V.i=k||E||U||h||a()),V})}}({section:e,content:t})||{},r=i.sN,n=i.sU,d=i.cE;l.innerHTML='<div class="sec-col bg-white flex flex-col"> <div class="sec-col__header bg-info flex items-center w-auto pr-20 pl-20 mb-5"><a href="'+n+'" class="flex items-center full-height"><h4 class="sec-col__title uppercase font-bold">'+r+'</h4></a></div> <div role="list" class="sec-col__list bg-white h-full">'+d.map(function(e,t){var i=e.t,o=e.u,r=e.n,a=e.a,s=e.i,n=e.m;return(0===t?'<a href="'+o+'" class="position-relative mb-10 overflow-hidden block">'+(c(n)?'<i class="'+c(n)+' sec-col__icon m-icon position-absolute text-center mx-auto rounded text-gray-100"></i>':"")+'<img class="sec-col__image w-full object-center object-cover" src="'+s+'" alt="'+i+'"/></a>':"")+'<article role="listitem" class="sec-col__story flex flex-col pb-10 mr-20 ml-20 mb-20 text-gray-300 border-b-1 border-dashed border-gray"><a href="'+o+'"><h3 class="sec-col__link mb-15 text-gray-300 line-h-sm font-bold overflow-hidden">'+i+'</h3></a><a class="sec-col__author text-gray-200" href="'+(a?a+"/":"/autores/")+'">'+(r||"")+"</a></article>"}).join("")+"</div></div>"}).catch(function(e){throw new Error(e)}),4===n){var m=document.createElement("div");m.innerHTML=t||"",i.append(m)}5===n&&(d=document.createElement("div"),i.append(d),fetch("/pf/api/v3/content/fetch/cinema-billboard?query=%7B%22format%22%3A%22single%22%7D&d="+r+"&_website="+o).then(function(e){return e.json()}).then(function(e){var t,i,o,r,c,s,n,l,m,u,b;d.innerHTML=(i=(t=e).billboardData,o=(i=void 0===i?{}:i).moviesList,r=void 0===o?[]:o,c=i.cinemasList,s=void 0===c?[]:c,n=t.premiereData,l=(n=void 0===n?{}:n).alt,m=n.img,u=n.title,'<div class="cinema-card bg-white"> <article class="position-relative"> <h3 class="cinema-card__category uppercase primary-font mb-0 pb-15 text-xl line-h-none"> <a class="cinema-card__link text-gray-300" href="/cartelera"> Cartelera </a> </h3> <figure class="cinema-card__figure overflow-hidden"> <a href="/cartelera/'+(b=n.url)+'/"> <img src="'+(m||a())+'" alt="'+l+'" class="w-full h-full object-cover" /> </a> </figure> <div class="cinema-card__detail w-full position-absolute bottom-0 pt-15 pb-15 pl-20 pr-20"> <p class="cinema-card__premiere text-xl line-h-xs font-bold"> Estreno </p> <h2 class="cinema-card__p-title overflow-hidden title-xs text-white"> <a class="cinema-card__p-link font-bold text-white line-h-xs" href="/cartelera/'+b+'/"> '+u+' </a> </h2> </div> </article> <div class="cinema-card__movies-list p-10"> <h4 class="cinema-card__title uppercase primary-font font-bold pt-5 pb-15 pl-10 pr-10 text-md line-h-none"> Vamos al cine </h4> <form id="cinema-form" action="/cartelera/search" method="post" class="text-right mb-10"> <label htmlFor="movie-select" class="font-0"> PELICULAS </label> <select id="movie-select" name="movie" class="cinema-card__select w-full primary-font mb-10 pl-10 text-xs" value=""> <option value="" defaultValue disabled class="cinema-card__option bg-white"> PELÍCULAS </option> '+r.map(function(e){return'<option value="'+e.url+'" class="cinema-card__option bg-white"> '+e.title+" </option>"}).join("")+' </select> <label htmlFor="theater-select" class="font-0"> CINES </label> <select id="theater-select" name="theater" class="cinema-card__select w-full primary-font mb-10 pl-10 text-xs" value=""> <option value="" defaultValue disabled class="cinema-card__option bg-white"> CINES </option> '+s.map(function(e){return'<option value="'+e.url+'" class="cinema-card__option bg-white"> '+e.nombre+" </option>"})+' </select> <button type="submit" class="cinema-card__button bg-white inline-block uppercase font-bold primary-font border-0 text-md rounded-sm"> Buscar </button> </form> </div></div>'),setTimeout(function(){var e=document.getElementById("cinema-form");document.getElementById("movie-select").value="",document.getElementById("theater-select").value="",e.addEventListener("submit",function(e){var t=document.getElementById("movie-select").value,i=document.getElementById("theater-select").value,o=t||i?(t||"peliculas")+"/"+(i||"cines"):"";window.location.href="/cartelera/"+o+"/",e.preventDefault()})},0)}).catch(function(e){throw new Error(e)}))})};if("IntersectionObserver"in window){new(0,window.IntersectionObserver)(function(e,t){e.forEach(function(e){e.isIntersecting&&(n(),t.unobserve(e.target))})},{rootMargin:"0px 0px 500px 0px"}).observe(document.querySelector("#section-columns-lazy"))}else n()})});`
    .replace(
      'sectionsToReplace',
      JSON.stringify(sections.map((sect) => (sect || '').replace(/\//, '')))
    )
    .replace('adsHtmlToReplace', `'${htmlAds}'`)
    .replace('contextPathToReplace', `"${contextPath}"`)
    .replace('arcSiteToReplace', `"${arcSite}"`)
    .replace('deploymentToReplace', `"${deployment}"`)
