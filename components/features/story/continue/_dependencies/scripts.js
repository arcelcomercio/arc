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

  const arcSite = arcSiteToReplace
  const contextPath = '<<contextPath>>'
  const IS_BLOG =  isBlogToReplace
  const MAX_PROGRESS = 350
  const MIN_PROGRESS = 180
  const SITE_OJO = 'ojo'
  const SITE_ELCOMERCIO = 'elcomercio'
  const PATH_BLOG = '/blogs'

  const setAttributeProgress = (progress, value) => {
    progress.setAttribute('style', `transform: rotate(${value}deg)`)
    progress.setAttribute('size', value)
  }

  const setTimeoutLoadPage = (linker, html = '', isBlog) => {
    const timeLoad = SITE_OJO === arcSite ? 5000 : 250
    setTimeout(() => {
      const link = linker.getAttribute('href')
      if (
        link !== '' &&
        window.innerHeight + window.scrollY + 10 >= html.scrollHeight
      ) {
        const linkRedirect = isBlog ? PATH_BLOG : link
        window.location = linkRedirect
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
      ? document.querySelector('.story-header__news-title').textContent
      : ''
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
            setTimeoutLoadPage(linker, html, IS_BLOG)
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

// ////////////////////////////////////////////////////////////////////////////

export const storyContinueScript = (arcSite, contextPath, isBlog) =>
  '"use strict";function _slicedToArray(e,t){return _arrayWithHoles(e)||_iterableToArrayLimit(e,t)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function _iterableToArrayLimit(e,t){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)){var o=[],r=!0,n=!1,i=void 0;try{for(var c,a=e[Symbol.iterator]();!(r=(c=a.next()).done)&&(o.push(c.value),!t||o.length!==t);r=!0);}catch(e){n=!0,i=e}finally{try{r||null==a.return||a.return()}finally{if(n)throw i}}return o}}function _arrayWithHoles(e){if(Array.isArray(e))return e}setTimeout(function(){var e=function(e,t){if(!t)return"/pf";if(!e)return t;var o="".concat(e,".pe");return"depor"===e&&(o="".concat(e,".com")),"elcomerciomag"===e&&(o="elcomercio.pe"),"peru21g21"===e&&(o="peru21.pe"),"https://cdna.".concat(o)},t=arcSiteToReplace,o=isBlogToReplace,r=function(e,t){e.setAttribute("style","transform: rotate(".concat(t,"deg)")),e.setAttribute("size",t)},n=function(e){var o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",r=arguments.length>2?arguments[2]:void 0;setTimeout(function(){var t=e.getAttribute("href");if(""!==t&&window.innerHeight+window.scrollY+10>=o.scrollHeight){var n=r?"/blogs":t;window.location=n}},"ojo"===t?5e3:250)};window.addEventListener("scroll",function(){var e,i=document.querySelector(".story-continue__story-load"),c=i.querySelector(".story-continue__progress"),a=i.querySelector(".story-continue__story-load-link"),l=document.querySelector("#signwall-app"),s=document.documentElement,u=parseInt(c.getAttribute("size"),10),d=window,m=d.innerHeight,y=d.scrollY;if(!l){if(m+y+10>=s.scrollHeight)for(var v=(350-u)/10+1,g=0;g<v;g++){var f=u+10*g+10;r(c,f),f>=350&&n(a,s,o)}else!function(e,o){var n=0,i=document.documentElement.scrollHeight,c=window,a=c.innerHeight,l=c.scrollY,s=c.screen,u="down";if(a+l+50<=i&&(r(e,o-10),u="up"),350>=o&&o>=180){var d=o;if("up"===u){var m=o-10;m>=180&&(d=m)}else d=o+10;r(e,d)}if(s.width<630){var y=document.querySelector(".story-header__list");if(y&&y.classList.add("hidden"),"elcomercio"!==t&&"depor"!==t&&"elbocon"!==t){var v=document.querySelector(".nav-sidebar"),g=document.querySelector(".nav"),f=document.querySelector(".nav__wrapper");window.scrollY<n?(g.classList.remove("active"),f.classList.add("section-menu--active"),v.classList.add("section-menu--active")):(window.scrollY<50?g.classList.remove("active"):g.classList.add("active"),f.classList.remove("section-menu--active"))}n=l}}(c,u);e=document.querySelector(".story-header__news-title")?document.querySelector(".story-header__news-title").textContent:"",document.querySelector(".nav__story-title").textContent=e,function(){var e=_slicedToArray(arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],1)[0],o=document.documentElement,r=o.clientHeight,n=o.scrollHeight,i=o.offsetHeight,c=o.scrollTop,a=document.body,l=a.clientHeight,s=a.scrollTop,u=_slicedToArray(document.getElementsByClassName("nav__loader"),1)[0],d=Math.max(r,n,i),m=window.innerHeight||r||l,y=Math.max(s,c);if(d>0&&e){var v=Math.round(y/(d-m)*100)/100;"elcomercio"!==t&&(e.style.transform="scaleX(".concat(v,")")),u&&(u.style.display=v>.02?"block":"none")}}(document.getElementsByClassName("nav__loader-bar"))}}),window.addEventListener("DOMContentLoaded",function(){setTimeout(function(){var o=document.querySelector(".story-continue__story-load"),n=o.querySelector(".story-continue__progress");o.setAttribute("data-state","outviewport");var i=document.querySelector(".nav__logo");window.screen.width>1023&&i&&"gestion"!==t&&(i.src="publimetro"===t?"".concat(e(t,"<<contextPath>>"),"/resources/dist/publimetro/images/green-logo.png?d=1"):"".concat(e(t,"<<contextPath>>"),"/resources/dist/").concat(t,"/images/logo.png?d=1")),r(n,180)},0)})},0);'
    .replace('arcSiteToReplace', `"${arcSite}"`)
    .replace('<<contextPath>>', contextPath)
    .replace('isBlogToReplace', isBlog)

// ////////////////////////////////////////////////////////////////////////////

/* document.addEventListener('DOMContentLoaded', () => {
  const IS_BLOG = isBLog
  const URLS_STORAGE = '_recents_articles_'
  const PATH_BLOG = '/blogs'

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

  const titleRedirect = IS_BLOG ? 'Cargando a la sección de Blogs' : title
  const websiteUrlRedirect = IS_BLOG
    ? PATH_BLOG
    : `${websiteUrl}${storyLoadAmp('<<arcSite>>')}`

  document.querySelector(
    '.story-continue__story-load-link'
  ).href = websiteUrlRedirect
  document.querySelector('.story-continue__story-load-title').innerHTML = titleRedirect
}) */

// ////////////////////////////////////////////////////////////////////////////////7

export const sessionStorageScript = (
  recentStoryContinue,
  siteUrl,
  arcSite,
  isBlog
) =>
  '"use strict";document.addEventListener("DOMContentLoaded",function(){var e=isBLog,t=function(e){var t=!1;if("undefined"!=typeof Storage){var n=[e],o=window.sessionStorage.getItem("_recents_articles_");o&&-1===(n=JSON.parse(o)).indexOf(e)&&(n.push(e),t=!0),window.sessionStorage.setItem("_recents_articles_",JSON.stringify(n))}return t},n=function(e){for(var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",o="",i="",r=0;r<e.length&&(o=e[r].basic||"",i=e[r].websiteUrl||"",e.length-1===r&&"undefined"!=typeof window&&window.sessionStorage.removeItem("_recents_articles_"),!t("".concat(n).concat(i)));r++);return{title:o,websiteUrl:i}}("<<recentStoryContinue>>","<<siteUrl>>"),o=n.title,i=n.websiteUrl,r=/iPad|iPhone|iPod|android|webOS|Windows Phone/i.test("undefined"!=typeof window?window.navigator.userAgent:""),s=e?"Cargando a la sección de Blogs":o,a=e?"/blogs":"".concat(i).concat("elcomercio"==="<<arcSite>>"&&r?"?ref=nota&ft=autoload&outputType=amp":"?ref=nota&ft=autoload");document.querySelector(".story-continue__story-load-link").href=a,document.querySelector(".story-continue__story-load-title").innerHTML=s});'
    .replace('"<<recentStoryContinue>>"', JSON.stringify(recentStoryContinue))
    .replace('<<siteUrl>>', siteUrl)
    .replace('<<arcSite>>', arcSite)
    .replace('isBLog', isBlog)
