/* document.addEventListener('DOMContentLoaded', () => {
  requestIdle(() => {
    const sections = sectionsToReplace
    const adsHtml = adsHtmlToReplace
    const contextPath = contextPathToReplace
    const arcSite = arcSiteToReplace
    const deployment = deploymentToReplace
    const VIDEO = 'basic_video'
    const GALLERY = 'basic_gallery'
  
    const getAssetsPath = () => {
      if (!contextPath) return '/pf'
      if (!arcSite) return contextPath
  
      let site = `${arcSite}.pe`
      if (arcSite === 'depor') site = `${arcSite}.com`
      if (arcSite === 'elcomerciomag') site = 'elcomercio.pe'
      if (arcSite === 'peru21g21') site = 'peru21.pe'
  
      return `https://cdna.${site}`
    }
  
    const defaultImage = () => {
      return `${getAssetsPath(
        arcSite,
        contextPath
      )}/resources/dist/${arcSite}/images/default-md.png?d=2`
    }
  
    const getMultimediaIcon = multimediaType => {
      let icon = ''
      switch (multimediaType) {
        case VIDEO:
          icon = 'icon-video'
          break
        case GALLERY:
          icon = 'icon-img'
          break
        default:
          return ''
      }
      return icon
    }
    const getMultimediaType = ({ basicVideoUrl, basicGalleryUrl }) => {
      if (basicVideoUrl) return 'basic_video'
      if (basicGalleryUrl) return 'basic_gallery'
      return 'basic'
    }
  
    const formatContent = ({ section, content }) => {
      const formatedSection = section ? `/${section}` : ''
      const {
        content_elements: contentElements = [],
        section_name: sectionName,
      } = content || {}
      const [
        {
           websites:websitesSecctionPrimary = {},
        } = {},
      ] = contentElements || []
      const { website_section: {path:primarySectionPath='', name:primarySectionName=''} } = websitesSecctionPrimary[arcSite] || {}
      return {
        sN: sectionName || primarySectionName || '',
        sU: `${formatedSection || primarySectionPath || ''}/`,
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
                    basic: { resized_urls: { mobile: basicVideoUrl } = {} } = {},
                  } = {},
                } = {},
                basic_gallery: {
                  promo_items: {
                    basic: {
                      resized_urls: { mobile: basicGalleryUrl } = {},
                    } = {},
                  } = {},
                } = {},
              } = {},
            },
            i
          ) => ({
            t: basic,
            u: websiteUrl,
            n: name,
            a: url,
            ...(i === 0
              ? {
                  i:
                    basicVideoUrl ||
                    basicGalleryUrl ||
                    basicUrl ||
                    defaultImage({
                      size: 'md',
                    }),
                }
              : {}),
            m: getMultimediaType({
              basicVideoUrl,
              basicGalleryUrl,
            }),
          })
        ),
      }
    }
  
    const getCinemaFeature = cinemaContent => {
      const {
        billboardData: { moviesList = [], cinemasList = [] } = {},
        premiereData: { alt, img: rawImg, title, url } = {},
      } = cinemaContent
  
      const img =
        rawImg ||
        defaultImage({
          size: 'sm',
        })
  
      return `<div class="cinema-card bg-white"> <article class="position-relative"> <h3 class="cinema-card__category uppercase primary-font mb-0 pb-15 text-xl line-h-none"> <a class="cinema-card__link text-gray-300" href="/cartelera"> Cartelera </a> </h3> <figure class="cinema-card__figure overflow-hidden"> <a href="/cartelera/${url}/"> <img src="${img}" alt="${alt}" class="w-full h-full object-cover" /> </a> </figure> <div class="cinema-card__detail w-full position-absolute bottom-0 pt-15 pb-15 pl-20 pr-20"> <p class="cinema-card__premiere text-xl line-h-xs font-bold"> Estreno </p> <h2 class="cinema-card__p-title overflow-hidden title-xs text-white"> <a class="cinema-card__p-link font-bold text-white line-h-xs" href="/cartelera/${url}/"> ${title} </a> </h2> </div> </article> <div class="cinema-card__movies-list p-10"> <h4 class="cinema-card__title uppercase primary-font font-bold pt-5 pb-15 pl-10 pr-10 text-md line-h-none"> Vamos al cine </h4> <form id="cinema-form" action="/cartelera/search" method="post" class="text-right mb-10"> <label htmlFor="movie-select" class="font-0"> PELICULAS </label> <select id="movie-select" name="movie" class="cinema-card__select w-full primary-font mb-10 pl-10 text-xs" value=""> <option value="" defaultValue disabled class="cinema-card__option bg-white"> PELÍCULAS </option> ${moviesList
        .map(
          movie =>
            `<option value="${movie.url}" class="cinema-card__option bg-white"> ${movie.title} </option>`
        )
        .join(
          ''
        )} </select> <label htmlFor="theater-select" class="font-0"> CINES </label> <select id="theater-select" name="theater" class="cinema-card__select w-full primary-font mb-10 pl-10 text-xs" value=""> <option value="" defaultValue disabled class="cinema-card__option bg-white"> CINES </option> ${cinemasList.map(
        cinema =>
          `<option value="${cinema.url}" class="cinema-card__option bg-white"> ${cinema.nombre} </option>`
      )} </select> <button type="submit" class="cinema-card__button bg-white inline-block uppercase font-bold primary-font border-0 text-md rounded-sm"> Buscar </button> </form> </div></div>`
    }
  
    const loadFeature = () => {
      const feature = document.getElementById('section-columns-lazy')
      sections.forEach((section, ind) => {
        const newDiv = document.createElement('div')
        feature.append(newDiv)
        fetch(  
          `/pf/api/v3/content/fetch/story-feed-by-section?query=%7B%22includedFields%22%3A%22websites.${arcSite}%2Cpromo_items.basic.type%2Cpromo_items.basic.url%2Cpromo_items.basic.resized_urls%2Cpromo_items.basic_video.promo_items.basic.url%2Cpromo_items.basic_video.promo_items.basic.resized_urls%2Cpromo_items.basic_gallery.promo_items.basic.url%2Cpromo_items.basic_gallery.promo_items.basic.resized_urls%2Cpromo_items.youtube_id.content%2Cheadlines.basic%2Ccredits.by._id%2C%20credits.by.name%2Ccredits.by.url%2Ccredits.by.type%2Ctaxonomy.sections._id%2Ctaxonomy.sections.name%22%2C%22presets%22%3A%22mobile%3A314x157%22%2C%22section%22%3A%22%2F${section}%22%2C%22stories_qty%22%3A4%7D&filter=%7Bcontent_elements%7Bcredits%7Bby%7Bname%2Curl%7D%7D%2Cheadlines%7Bbasic%7D%2Cpromo_items%7Bbasic%7Bresized_urls%7Bmobile%7D%7D%2Cbasic_gallery%7Bpromo_items%7Bbasic%7Bresized_urls%7Bmobile%7D%7D%7D%7D%2Cbasic_video%7Bpromo_items%7Bbasic%7Bresized_urls%7Bmobile%7D%7D%7D%7D%2Cyoutube_id%7Bcontent%7D%7D%2Ctaxonomy%7Bprimary_section%7Bname%2Cpath%7D%7D%2Cwebsites%7B${arcSite}%7Bwebsite_url%7D%7D%7D%2Csection_id%2Csection_name%7D&d=${deployment}&_website=${arcSite}`
        )
          .then(res => res.json())
          .then(content => {
            const { sN, sU, cE } = formatContent({ section, content }) || {}
  
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
                            : ''
                        }<img class="sec-col__image w-full object-center object-cover" src="${i}" alt="${t}"/></a>`
                      : ''
                  }<article role="listitem" class="sec-col__story flex flex-col pb-10 mr-20 ml-20 mb-20 text-gray-300 border-b-1 border-dashed border-gray"><a href="${u}"><h3 class="sec-col__link mb-15 text-gray-300 line-h-sm font-bold overflow-hidden">${t}</h3></a><a class="sec-col__author text-gray-200" href="${a||"/autores/"}">${n||""}</a></article>`
              )
              .join('')}</div></div>`
          })
          .catch(err => {
            throw new Error(err)
          })
        if (ind === 4) {
          const adsDiv = document.createElement('div')
          adsDiv.innerHTML = adsHtml || ''
          feature.append(adsDiv)
        }
        if (ind === 5) {
          const cinemaDiv = document.createElement('div')
          feature.append(cinemaDiv)
          fetch(
            `/pf/api/v3/content/fetch/cinema-billboard?query=%7B%22format%22%3A%22single%22%7D&d=${deployment}&_website=${arcSite}`
          )
            .then(res => res.json())
            .then(res => {
              cinemaDiv.innerHTML = getCinemaFeature(res)
              setTimeout(() => {
                const BASE_PATH = '/cartelera'
                const cinemaForm = document.getElementById('cinema-form')
                document.getElementById('movie-select').value = ''
                document.getElementById('theater-select').value = ''
                cinemaForm.addEventListener('submit', event => {
                  const movieSelected = document.getElementById('movie-select')
                    .value
                  const cinemaSelected = document.getElementById('theater-select')
                    .value
                  const moviePath = movieSelected || 'peliculas'
                  const cinemaPath = cinemaSelected || 'cines'
                  const fullPath =
                    !movieSelected && !cinemaSelected
                      ? ''
                      : `${moviePath}/${cinemaPath}`
                  window.location.href = `${BASE_PATH}/${fullPath}/`
                  event.preventDefault()
                })
              }, 0)
            })
            .catch(err => {
              throw new Error(err)
            })
        }
      })
    }
  
    if ('IntersectionObserver' in window) {
      const { IntersectionObserver } = window
      const options = {
        rootMargin: '0px 0px 500px 0px',
      }
      const callback = (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            loadFeature()
            observer.unobserve(entry.target)
          }
        })
      }
      const observer = new IntersectionObserver(callback, options)
      observer.observe(document.querySelector('#section-columns-lazy'))
    } else {
      loadFeature()
    }
  })
}) */

// eslint-disable-next-line import/prefer-default-export
export const sectionBlockAsyncScrip = (
  sections,
  htmlAds,
  contextPath,
  arcSite,
  deployment
) =>
  `"use strict";var _slicedToArray=function(){return function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var i=[],o=!0,r=!1,a=void 0;try{for(var n,c=e[Symbol.iterator]();!(o=(n=c.next()).done)&&(i.push(n.value),!t||i.length!==t);o=!0);}catch(e){r=!0,a=e}finally{try{!o&&c.return&&c.return()}finally{if(r)throw a}}return i}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),_extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var o in i)Object.prototype.hasOwnProperty.call(i,o)&&(e[o]=i[o])}return e};document.addEventListener("DOMContentLoaded",function(){requestIdle(function(){var e=sectionsToReplace,t=adsHtmlToReplace,i=contextPathToReplace,o=arcSiteToReplace,r=deploymentToReplace,a=function(){return function(){if(!i)return"/pf";if(!o)return i;var e=o+".pe";return"depor"===o&&(e=o+".com"),"elcomerciomag"===o&&(e="elcomercio.pe"),"peru21g21"===o&&(e="peru21.pe"),"https://cdna."+e}()+"/resources/dist/"+o+"/images/default-md.png?d=2"},n=function(e){var t="";switch(e){case"basic_video":t="icon-video";break;case"basic_gallery":t="icon-img";break;default:return""}return t},c=function(e){var t=e.basicVideoUrl,i=e.basicGalleryUrl;return t?"basic_video":i?"basic_gallery":"basic"},s=function(){var i=document.getElementById("section-columns-lazy");e.forEach(function(e,s){var l,d=document.createElement("div");if(i.append(d),fetch("/pf/api/v3/content/fetch/story-feed-by-section?query=%7B%22includedFields%22%3A%22websites."+o+".website_url%2Cpromo_items.basic.type%2Cpromo_items.basic.url%2Cpromo_items.basic.resized_urls%2Cpromo_items.basic_video.promo_items.basic.url%2Cpromo_items.basic_video.promo_items.basic.resized_urls%2Cpromo_items.basic_gallery.promo_items.basic.url%2Cpromo_items.basic_gallery.promo_items.basic.resized_urls%2Cpromo_items.youtube_id.content%2Cheadlines.basic%2Ccredits.by._id%2C%20credits.by.name%2Ccredits.by.url%2Ccredits.by.type%2Ctaxonomy.sections._id%2Ctaxonomy.sections.name%22%2C%22presets%22%3A%22mobile%3A314x157%22%2C%22section%22%3A%22%2F"+e+"%22%2C%22stories_qty%22%3A4%7D&filter=%7Bcontent_elements%7Bcredits%7Bby%7Bname%2Curl%7D%7D%2Cheadlines%7Bbasic%7D%2Cpromo_items%7Bbasic%7Bresized_urls%7Bmobile%7D%7D%2Cbasic_gallery%7Bpromo_items%7Bbasic%7Bresized_urls%7Bmobile%7D%7D%7D%7D%2Cbasic_video%7Bpromo_items%7Bbasic%7Bresized_urls%7Bmobile%7D%7D%7D%7D%2Cyoutube_id%7Bcontent%7D%7D%2Ctaxonomy%7Bprimary_section%7Bname%2Cpath%7D%7D%2Cwebsites%7B"+o+"%7Bwebsite_url%7D%7D%7D%2Csection_id%2Csection_name%7D&d="+r+"&_website="+o).then(function(e){return e.json()}).then(function(t){var i=function(e){var t=e.section,i=t?"/"+t:"",r=e.content||{},n=r.content_elements,s=void 0===n?[]:n,l=r.section_name,d=_slicedToArray(s||[],1)[0],m=(d=void 0===d?{}:d).taxonomy,u=(m=void 0===m?{}:m).primary_section,b=(u=void 0===u?{}:u).path,p=u.name;return{sN:l||p||"",sU:(i||b||"")+"/",cE:s.map(function(e,t){var i=e.headlines,r=(i=void 0===i?{}:i).basic,n=e.websites,s=(n=void 0===n?{}:n)[o],l=(s=void 0===s?{}:s).website_url,d=e.credits,m=(d=void 0===d?{}:d).by,u=_slicedToArray(m=void 0===m?[]:m,1)[0],b=(u=void 0===u?{}:u).name,p=u.url,_=e.promo_items,v=(_=void 0===_?{}:_).basic,f=(v=void 0===v?{}:v).resized_urls,h=(f=void 0===f?{}:f).mobile,y=_.basic_video,g=(y=void 0===y?{}:y).promo_items,w=(g=void 0===g?{}:g).basic,x=(w=void 0===w?{}:w).resized_urls,C=(x=void 0===x?{}:x).mobile,B=_.basic_gallery,D=(B=void 0===B?{}:B).promo_items,E=(D=void 0===D?{}:D).basic,I=(E=void 0===E?{}:E).resized_urls,A=(I=void 0===I?{}:I).mobile;return _extends({t:r,u:l,n:b,a:p},0===t?{i:C||A||h||a()}:{},{m:c({basicVideoUrl:C,basicGalleryUrl:A})})})}}({section:e,content:t})||{},r=i.sN,s=i.sU,l=i.cE;d.innerHTML='<div class="sec-col bg-white flex flex-col"> <div class="sec-col__header bg-info flex items-center w-auto pr-20 pl-20 mb-5"><a href="'+s+'" class="flex items-center full-height"><h4 class="sec-col__title uppercase font-bold">'+r+'</h4></a></div> <div role="list" class="sec-col__list bg-white h-full">'+l.map(function(e,t){var i=e.t,o=e.u,r=e.n,a=e.a,c=e.i,s=e.m;return(0===t?'<a href="'+o+'" class="position-relative mb-10 overflow-hidden block">'+(n(s)?'<i class="'+n(s)+' sec-col__icon m-icon position-absolute text-center mx-auto rounded text-gray-100"></i>':"")+'<img class="sec-col__image w-full object-center object-cover" src="'+c+'" alt="'+i+'"/></a>':"")+'<article role="listitem" class="sec-col__story flex flex-col pb-10 mr-20 ml-20 mb-20 text-gray-300 border-b-1 border-dashed border-gray"><a href="'+o+'"><h3 class="sec-col__link mb-15 text-gray-300 line-h-sm font-bold overflow-hidden">'+i+'</h3></a><a class="sec-col__author text-gray-200" href="'+(a||"/autores/")+'">'+(r||"")+"</a></article>"}).join("")+"</div></div>"}).catch(function(e){throw new Error(e)}),4===s){var m=document.createElement("div");m.innerHTML=t||"",i.append(m)}5===s&&(l=document.createElement("div"),i.append(l),fetch("/pf/api/v3/content/fetch/cinema-billboard?query=%7B%22format%22%3A%22single%22%7D&d="+r+"&_website="+o).then(function(e){return e.json()}).then(function(e){var t,i,o,r,n,c,s,d,m,u,b;l.innerHTML=(i=(t=e).billboardData,o=(i=void 0===i?{}:i).moviesList,r=void 0===o?[]:o,n=i.cinemasList,c=void 0===n?[]:n,s=t.premiereData,d=(s=void 0===s?{}:s).alt,m=s.img,u=s.title,'<div class="cinema-card bg-white"> <article class="position-relative"> <h3 class="cinema-card__category uppercase primary-font mb-0 pb-15 text-xl line-h-none"> <a class="cinema-card__link text-gray-300" href="/cartelera"> Cartelera </a> </h3> <figure class="cinema-card__figure overflow-hidden"> <a href="/cartelera/'+(b=s.url)+'/"> <img src="'+(m||a())+'" alt="'+d+'" class="w-full h-full object-cover" /> </a> </figure> <div class="cinema-card__detail w-full position-absolute bottom-0 pt-15 pb-15 pl-20 pr-20"> <p class="cinema-card__premiere text-xl line-h-xs font-bold"> Estreno </p> <h2 class="cinema-card__p-title overflow-hidden title-xs text-white"> <a class="cinema-card__p-link font-bold text-white line-h-xs" href="/cartelera/'+b+'/"> '+u+' </a> </h2> </div> </article> <div class="cinema-card__movies-list p-10"> <h4 class="cinema-card__title uppercase primary-font font-bold pt-5 pb-15 pl-10 pr-10 text-md line-h-none"> Vamos al cine </h4> <form id="cinema-form" action="/cartelera/search" method="post" class="text-right mb-10"> <label htmlFor="movie-select" class="font-0"> PELICULAS </label> <select id="movie-select" name="movie" class="cinema-card__select w-full primary-font mb-10 pl-10 text-xs" value=""> <option value="" defaultValue disabled class="cinema-card__option bg-white"> PELÍCULAS </option> '+r.map(function(e){return'<option value="'+e.url+'" class="cinema-card__option bg-white"> '+e.title+" </option>"}).join("")+' </select> <label htmlFor="theater-select" class="font-0"> CINES </label> <select id="theater-select" name="theater" class="cinema-card__select w-full primary-font mb-10 pl-10 text-xs" value=""> <option value="" defaultValue disabled class="cinema-card__option bg-white"> CINES </option> '+c.map(function(e){return'<option value="'+e.url+'" class="cinema-card__option bg-white"> '+e.nombre+" </option>"})+' </select> <button type="submit" class="cinema-card__button bg-white inline-block uppercase font-bold primary-font border-0 text-md rounded-sm"> Buscar </button> </form> </div></div>'),setTimeout(function(){var e=document.getElementById("cinema-form");document.getElementById("movie-select").value="",document.getElementById("theater-select").value="",e.addEventListener("submit",function(e){var t=document.getElementById("movie-select").value,i=document.getElementById("theater-select").value,o=t||i?(t||"peliculas")+"/"+(i||"cines"):"";window.location.href="/cartelera/"+o+"/",e.preventDefault()})},0)}).catch(function(e){throw new Error(e)}))})};if("IntersectionObserver"in window){new(0,window.IntersectionObserver)(function(e,t){e.forEach(function(e){e.isIntersecting&&(s(),t.unobserve(e.target))})},{rootMargin:"0px 0px 500px 0px"}).observe(document.querySelector("#section-columns-lazy"))}else s()})});`
    .replace(
      'sectionsToReplace',
      JSON.stringify(sections.map((sect) => (sect || '').replace(/\//, '')))
    )
    .replace('adsHtmlToReplace', `'${htmlAds}'`)
    .replace('contextPathToReplace', `"${contextPath}"`)
    .replace('arcSiteToReplace', `"${arcSite}"`)
    .replace('deploymentToReplace', `"${deployment}"`)
