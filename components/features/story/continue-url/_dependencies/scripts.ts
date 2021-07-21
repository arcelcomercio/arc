/* window.addEventListener('load', () => {requestIdle(() => {
  let requestStory;
  const URL = 'URL_STORAGE'
  const loadNextUrlStorage = () => {
    requestStory = setTimeout(() => {
      window.location.href = URL +  '?ref=bicentenario-nota&ft=autoload'
    }, 250)
    
  }

  const stContinueFunc = () => {
    const progressBar = document.querySelector('.st-continue__progress')
      if(progressBar.className.indexOf('loading') <= 0)
        progressBar.className = progressBar.className.concat(' loading')

      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.body.scrollHeight - 5
      )
        loadNextUrlStorage()
  }

  if ('IntersectionObserver' in window) {
    const sectionOneObserve = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        const $close = document.querySelector('.st-continue__close')
        if (entry.isIntersecting) {
          window.addEventListener('scroll', stContinueFunc)
          $close.addEventListener('click', () => {
            clearTimeout(requestStory)
            const progressBar = document.querySelector('.st-continue__progress')
            if(progressBar.className.indexOf('loading') > 0)
              progressBar.className = progressBar.className.replace(' loading', '')
          })
          sectionOneObserve.unobserve(entry.target)
        }
      })
    })
    sectionOneObserve.observe(document.querySelector('.st-continue'))
  } else {
    window.addEventListener('scroll', stContinueFunc)
  }
})}) */

// ////////////////////////////////////////////////////////////////////////////

export const storyContinueUrlScript = (url: string): string =>
  `"use strict";window.addEventListener("load",()=>{requestIdle(()=>{let e;const n=()=>{const n=document.querySelector(".st-continue__progress");(n.className.indexOf("loading")<=0||-1==n.className.indexOf("loading"))&&(n.className=n.className.concat(" loading")),window.innerHeight+document.documentElement.scrollTop>=document.body.scrollHeight-5&&(e=setTimeout(()=>{window.location.href="URL_STORAGE?ref=bicentenario-nota&ft=autoload"},250))};if("IntersectionObserver"in window){const t=new IntersectionObserver(function(o){o.forEach(o=>{const s=document.querySelector(".st-continue__close");o.isIntersecting&&(window.addEventListener("scroll",n),s.addEventListener("click",()=>{clearTimeout(e);const n=document.querySelector(".st-continue__progress");n.className.indexOf("loading")>0&&(n.className=n.className.replace(" loading",""))}),t.unobserve(o.target))})});t.observe(document.querySelector(".st-continue"))}else window.addEventListener("scroll",n)})});`.replace(
    'URL_STORAGE',
    url
  )

export const styleStoryContinue = (): string =>
  '.st-continue{content-visibility:auto;contain-intrinsic-size:100px}.st-continue__progress-box{align-items:center;background-color:#f5f5f5;height:30px}.st-continue__progress{background-color:#cddde5;height:100%;transform-origin:left;width:100%}.st-continue__progress.loading{animation:loading  2s ease-in-out infinite alternate}.st-continue__subtitle{color:#333;font:700 11px/18px Roboto, fallback-local, sans-serif;padding:0 15px}.st-continue__close{fill:#fff;background-color:#333;border-radius:50%;right:15px}.st-continue__title{color:#333;font:400 20px/26px Georgia, fallback-local, serif;padding:10px 15px 60px}@keyframes loading{0%{transform:scaleX(0)}to{transform:scaleX(100%)}}'
