/* setTimeout(() => {
  const getAssetsPath = (arcSite, contextPath) => {
    if (!contextPath) return '/pf'
    if (!arcSite) return contextPath

    let site = `${arcSite}.pe`
    if (arcSite === 'depor') site = `${arcSite}.com`
    if (arcSite === 'elcomerciomag') site = 'elcomercio.pe'
    if (arcSite === 'peru21g21') site = 'peru21.pe'

    return `https://cdna.${site}`
  }

  const arcSite = '<<arcSite>>'
  const contextPath = '<<contextPath>>'
  const MAX_PROGRESS = 350
  const MIN_PROGRESS = 180
  const SITE_OJO = 'ojo'
  const SITE_ELCOMERCIO = 'elcomercio'

  const setAttributeProgress = (progress, value) => {
    progress.setAttribute('style', `transform: rotate(${value}deg)`)
    progress.setAttribute('size', value)
  }

  const setTimeoutLoadPage = (linker, html = '') => {
    const timeLoad = SITE_OJO === arcSite ? 5000 : 250
    setTimeout(() => {
      const link = linker.getAttribute('href')
      if (
        link !== '' &&
        window.innerHeight + window.scrollY + 10 >= html.scrollHeight
      ) {
        window.location = link
      }
    }, timeLoad)
  }

  const setUpdateLoaderPage = (progress, concurrentProgress) => {
    let preview = 0
    const { scrollHeight } = document.documentElement
    const { innerHeight, scrollY, screen } = window
    let direction = 'down'
    if (innerHeight + scrollY + 50 <= scrollHeight) {
      setAttributeProgress(progress, concurrentProgress - 10)
      direction = 'up'
    }

    if (
      MAX_PROGRESS >= concurrentProgress &&
      concurrentProgress >= MIN_PROGRESS
    ) {
      let newerProgress = concurrentProgress
      if (direction === 'up') {
        const less = concurrentProgress - 10
        if (less >= MIN_PROGRESS) {
          newerProgress = less
        }
      } else {
        newerProgress = concurrentProgress + 10
      }
      setAttributeProgress(progress, newerProgress)
    }

    if (screen.width < 630) {
      const storyHeader = document.querySelector('.story-header__list')
      if (storyHeader) storyHeader.classList.add('hidden')
      if (
        arcSite !== 'elcomercio' &&
        arcSite !== 'depor' &&
        arcSite !== 'elbocon'
      ) {
        const navSidebar = document.querySelector('.nav-sidebar')
        const nav = document.querySelector('.nav')
        const navWrapper = document.querySelector('.nav__wrapper')

        if (window.scrollY < preview) {
          nav.classList.remove('active')
          navWrapper.classList.add('section-menu--active')
          navSidebar.classList.add('section-menu--active')
        } else {
          if (window.scrollY < 50) nav.classList.remove('active')
          else nav.classList.add('active')

          navWrapper.classList.remove('section-menu--active')
        }
      }
      preview = scrollY
    }
  }

  const setTitleHead = () => {
    const titleNew = document.querySelector('.story-header__news-title')
      .textContent
    document.querySelector('.nav__story-title').textContent = titleNew
  }

  const setInitiateHeights = ([e] = []) => {
    const progressBar = e
    const {
      clientHeight,
      scrollHeight,
      offsetHeight,
      scrollTop,
    } = document.documentElement
    const {
      clientHeight: bodyClientHeight,
      scrollTop: bodyScrollTop,
    } = document.body
    const [loader] = document.getElementsByClassName('nav__loader')
    const height = Math.max(clientHeight, scrollHeight, offsetHeight)
    const h = window.innerHeight || clientHeight || bodyClientHeight
    const scrolled = Math.max(bodyScrollTop, scrollTop)

    if (height > 0 && progressBar) {
      const scale = Math.round((scrolled / (height - h)) * 100) / 100
      if (SITE_ELCOMERCIO !== arcSite) {
        progressBar.style.transform = `scaleX(${scale})`
      }

      if (loader) loader.style.display = scale > 0.02 ? 'block' : 'none'
    }
  }

  const setInitialLoaderPage = () => {
    setTimeout(() => {
      const storyLoader = document.querySelector(`.story-continue__story-load`)
      const progress = storyLoader.querySelector(`.story-continue__progress`)
      storyLoader.setAttribute('data-state', 'outviewport')

      const navLogo = document.querySelector('.nav__logo')
      if (window.screen.width > 1023 && navLogo) {
        if (arcSite !== 'gestion') {
          navLogo.src =
            arcSite === 'publimetro'
              ? `${getAssetsPath(
                  arcSite,
                  contextPath
                )}/resources/dist/publimetro/images/green-logo.png?d=1`
              : `${getAssetsPath(
                  arcSite,
                  contextPath
                )}/resources/dist/${arcSite}/images/logo.png?d=1`
        }
      }

      setAttributeProgress(progress, MIN_PROGRESS)
    }, 0)
  }

  const setScrollLoaderPage = () => {
    const storyLoader = document.querySelector(`.story-continue__story-load`)
    const progress = storyLoader.querySelector(`.story-continue__progress`)
    const linker = storyLoader.querySelector(`.story-continue__story-load-link`)
    const signwall = document.querySelector('#signwall-app')
    const html = document.documentElement
    const concurrentProgress = parseInt(progress.getAttribute('size'), 10)
    const { innerHeight, scrollY } = window

    if (!signwall) {
      if (innerHeight + scrollY + 10 >= html.scrollHeight) {
        const totalProgress = (MAX_PROGRESS - concurrentProgress) / 10 + 1
        for (let i = 0; i < totalProgress; i++) {
          const newerProgress = concurrentProgress + 10 * i + 10
          setAttributeProgress(progress, newerProgress)
          if (newerProgress >= MAX_PROGRESS) {
            setTimeoutLoadPage(linker, html)
          }
        }
      } else {
        setUpdateLoaderPage(progress, concurrentProgress)
      }
      setTitleHead()
      setInitiateHeights(document.getElementsByClassName('nav__loader-bar'))
    }
  }

  window.addEventListener('scroll', setScrollLoaderPage)
  window.addEventListener('DOMContentLoaded', setInitialLoaderPage)
}, 0) */

// eslint-disable-next-line import/prefer-default-export
export const storyContinueScript = (arcSite, contextPath) =>
  '"use strict";function _slicedToArray(e,t){return _arrayWithHoles(e)||_iterableToArrayLimit(e,t)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function _iterableToArrayLimit(e,t){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)){var r=[],o=!0,n=!1,i=void 0;try{for(var c,a=e[Symbol.iterator]();!(o=(c=a.next()).done)&&(r.push(c.value),!t||r.length!==t);o=!0);}catch(e){n=!0,i=e}finally{try{o||null==a.return||a.return()}finally{if(n)throw i}}return r}}function _arrayWithHoles(e){if(Array.isArray(e))return e}setTimeout(function(){var e=function(e,t){if(!t)return"/pf";if(!e)return t;var r="".concat(e,".pe");return"depor"===e&&(r="".concat(e,".com")),"elcomerciomag"===e&&(r="elcomercio.pe"),"peru21g21"===e&&(r="peru21.pe"),"https://cdna.".concat(r)},t="<<arcSite>>",r=function(e,t){e.setAttribute("style","transform: rotate(".concat(t,"deg)")),e.setAttribute("size",t)},o=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";setTimeout(function(){var r=e.getAttribute("href");""!==r&&window.innerHeight+window.scrollY+10>=t.scrollHeight&&(window.location=r)},250)};window.addEventListener("scroll",function(){var e,t=document.querySelector(".story-continue__story-load"),n=t.querySelector(".story-continue__progress"),i=t.querySelector(".story-continue__story-load-link"),c=document.querySelector("#signwall-app"),a=document.documentElement,s=parseInt(n.getAttribute("size"),10),l=window,u=l.innerHeight,d=l.scrollY;if(!c){if(u+d+10>=a.scrollHeight)for(var m=(350-s)/10+1,y=0;y<m;y++){var v=s+10*y+10;r(n,v),v>=350&&o(i,a)}else!function(e,t){var o=0,n=document.documentElement.scrollHeight,i=window,c=i.innerHeight,a=i.scrollY,s=i.screen,l="down";if(c+a+50<=n&&(r(e,t-10),l="up"),350>=t&&t>=180){var u=t;if("up"===l){var d=t-10;d>=180&&(u=d)}else u=t+10;r(e,u)}if(s.width<630){var m=document.querySelector(".story-header__list");m&&m.classList.add("hidden");var y=document.querySelector(".nav-sidebar"),v=document.querySelector(".nav"),f=document.querySelector(".nav__wrapper");window.scrollY<o?(v.classList.remove("active"),f.classList.add("section-menu--active"),y.classList.add("section-menu--active")):(window.scrollY<50?v.classList.remove("active"):v.classList.add("active"),f.classList.remove("section-menu--active")),o=a}}(n,s);e=document.querySelector(".story-header__news-title").textContent,document.querySelector(".nav__story-title").textContent=e,function(){var e=_slicedToArray(arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],1)[0],t=document.documentElement,r=t.clientHeight,o=t.scrollHeight,n=t.offsetHeight,i=t.scrollTop,c=document.body,a=c.clientHeight,s=c.scrollTop,l=_slicedToArray(document.getElementsByClassName("nav__loader"),1)[0],u=Math.max(r,o,n),d=window.innerHeight||r||a,m=Math.max(s,i);if(u>0&&e){var y=Math.round(m/(u-d)*100)/100;e.style.transform="scaleX(".concat(y,")"),l&&(l.style.display=y>.02?"block":"none")}}(document.getElementsByClassName("nav__loader-bar"))}}),window.addEventListener("DOMContentLoaded",function(){setTimeout(function(){var o=document.querySelector(".story-continue__story-load"),n=o.querySelector(".story-continue__progress");o.setAttribute("data-state","outviewport");var i=document.querySelector(".nav__logo");window.screen.width>1023&&i&&(i.src="".concat(e(t,"<<contextPath>>"),"/resources/dist/").concat(t,"/images/logo.png?d=1")),r(n,180)},0)})},0);'
    .replace('<<arcSite>>', arcSite)
    .replace('<<contextPath>>', contextPath)

/* document.addEventListener('DOMContentLoaded', () => {
  const URLS_STORAGE = '_recents_articles_'
  const saveUrlSessionStorage = url => {
    let isUrlSaved = false
    if (typeof Storage !== 'undefined') {
      let arrUrls = [url]
      const existArrUrls = window.sessionStorage.getItem(URLS_STORAGE)
      if (existArrUrls) {
        arrUrls = JSON.parse(existArrUrls)
        if (arrUrls.indexOf(url) === -1) {
          arrUrls.push(url)
          isUrlSaved = true
        }
      }
      window.sessionStorage.setItem(URLS_STORAGE, JSON.stringify(arrUrls))
    }
    return isUrlSaved
  }

  const getNextArticle = (recentStoryContinue, siteUrl = '') => {
    let title = ''
    let websiteUrl = ''
    for (let i = 0; i < recentStoryContinue.length; i++) {
      title = recentStoryContinue[i].basic || ''
      websiteUrl = recentStoryContinue[i].websiteUrl || ''
      if (
        recentStoryContinue.length - 1 === i &&
        typeof window !== 'undefined'
      ) {
        window.sessionStorage.removeItem(URLS_STORAGE)
      }
      if (saveUrlSessionStorage(`${siteUrl}${websiteUrl}`)) {
        break
      }
    }
    return { title, websiteUrl }
  }

  const { title, websiteUrl } = getNextArticle(
    '<<recentStoryContinue>>',
    '<<siteUrl>>'
  )

  const isMobile = /iPad|iPhone|iPod|android|webOS|Windows Phone/i.test(
    typeof window !== 'undefined' ? window.navigator.userAgent : ''
  )

  const storyLoadAmp = arcSite =>
    arcSite === 'elcomercio' && isMobile
      ? '?ref=nota&ft=autoload&outputType=amp'
      : '?ref=nota&ft=autoload'

  document.querySelector(
    '.story-continue__story-load-link'
  ).href = `${websiteUrl}${storyLoadAmp('<<arcSite>>')}`
  document.querySelector('.story-continue__story-load-title').innerHTML = title
}) */

export const sessionStorageScript = (recentStoryContinue, siteUrl, arcSite) =>
  '"use strict";document.addEventListener("DOMContentLoaded",function(){var e=function(e){var t=!1;if("undefined"!=typeof Storage){var n=[e],o=window.sessionStorage.getItem("_recents_articles_");o&&-1===(n=JSON.parse(o)).indexOf(e)&&(n.push(e),t=!0),window.sessionStorage.setItem("_recents_articles_",JSON.stringify(n))}return t},t=function(t){for(var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",o="",i="",r=0;r<t.length&&(o=t[r].basic||"",i=t[r].websiteUrl||"",t.length-1===r&&"undefined"!=typeof window&&window.sessionStorage.removeItem("_recents_articles_"),!e("".concat(n).concat(i)));r++);return{title:o,websiteUrl:i}}("<<recentStoryContinue>>","<<siteUrl>>"),n=t.title,o=t.websiteUrl,i=/iPad|iPhone|iPod|android|webOS|Windows Phone/i.test("undefined"!=typeof window?window.navigator.userAgent:"");document.querySelector(".story-continue__story-load-link").href="".concat(o).concat("elcomercio"==="<<arcSite>>"&&i?"?ref=nota&ft=autoload&outputType=amp":"?ref=nota&ft=autoload"),document.querySelector(".story-continue__story-load-title").innerHTML=n});'
    .replace('"<<recentStoryContinue>>"', JSON.stringify(recentStoryContinue))
    .replace('<<siteUrl>>', siteUrl)
    .replace('<<arcSite>>', arcSite)
