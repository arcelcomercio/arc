/*
const minutoObserver = (entries, observer) => {
  entries.forEach(entry => {
    const { isIntersecting, target } = entry
    if (isIntersecting) {

      const URL_STORY = document.querySelector("meta[property='og:url']").getAttribute("content")
      const title = document.querySelector("meta[property='og:title']").getAttribute("content") 
      const site = document.querySelector('meta[name="twitter:site"]')

      target.innerHTML =
        '<div data-social="icon-compartir" class="icon-compartir"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 488 488"><path d="M483 216l-215-178c-4-3-10-4-14-2-5 2-8 7-8 12v94c-105 4-176 41-214 110-32 60-32 130-32 177 0 4 0 7 0 11 0 6 4 12 10 13 1 0 2 0 3 0 5 0 9-2 12-7 73-129 133-135 220-135v93c0 5 3 10 8 12s10 2 14-2l215-178c3-3 5-6 5-10S486 218 483 216zM273 376v-78c0-4-1-7-4-9-2-2-6-4-9-4-54 0-96 2-137 20-35 16-65 44-95 88 1-40 6-87 28-127 34-64 101-95 204-96 7 0 13-6 13-13v-78l181 149L273 376z" fill="#555"/></svg><ul class="story-content__list-more hidden"><li class=" story-content__item f f-center">      <a itemprop="url" title="Compartir en facebook" data-social="share-social" class="share-btn f f-center" href="http://www.facebook.com/sharer.php?u=' +
        URL_STORY +
        '"><svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 10 21">        <title>Compartir en facebook</title>        <path d="M2.6 21V11.1H0V7.6H2.6V4.6C2.6 2.2 4.1 0 7.5 0 8.9 0 10 0.1 10 0.1L9.9 3.5C9.9 3.5 8.8 3.4 7.7 3.4 6.4 3.4 6.2 4 6.2 5V7.6H10L9.8 11.1H6.2V21H2.6Z" />      </svg></a></li><li class=" story-content__item f f-center"><a itemprop="url" title="Compartir en twitter" data-social="share-social" class="share-btn f f-center" href="https://twitter.com/intent/tweet?text=' +
        encodeURIComponent(title) +
        '&amp;url=' +
        URL_STORY +
        '&amp;via=' +
        site +
        '"><svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 14 12">  <title>Compartir en twitter</title>   <path d="M13.5 2C13 2.2 12.5 2.3 12 2.4 12.5 2.1 12.9 1.5 13.1 0.9 12.6 1.2 12 1.4 11.4 1.6 11.2 1.3 10.9 1.1 10.6 0.9 10.2 0.8 9.9 0.7 9.5 0.7 8 0.7 6.8 1.9 6.8 3.4 6.8 3.6 6.9 3.8 6.9 4 4.7 3.9 2.7 2.8 1.4 1.2 1.2 1.6 1 2.1 1 2.6 1 3.5 1.5 4.3 2.2 4.8 1.8 4.8 1.4 4.6 1 4.4V4.5C1 5.8 1.9 6.8 3.2 7.1 2.9 7.1 2.7 7.2 2.5 7.2 2.3 7.2 2.1 7.2 2 7.1 2.3 8.2 3.3 9 4.5 9 3.5 9.7 2.4 10.1 1.1 10.1 0.9 10.1 0.7 10.1 0.5 10.1 1.7 10.8 3.1 11.3 4.6 11.3 9.5 11.3 12.2 7.2 12.2 3.7 12.2 3.6 12.2 3.5 12.2 3.4 12.7 3 13.1 2.5 13.5 2Z" />      </svg></a></li><li class=" story-content__item f f-center"><a itemprop="url" title="Compartir en linkedin" data-social="share-social" class="share-btn f f-center" href="http://www.linkedin.com/shareArticle?url=' +
        URL_STORY +
        '"> <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 24 24">         <title>Compartir en LinkedIn</title>        <path d="M5 7.2C6.2 7.2 7.2 6.2 7.2 5 7.2 3.8 6.2 2.8 5 2.8 3.8 2.8 2.8 3.8 2.8 5 2.8 6.2 3.8 7.2 5 7.2Z" />        <path d="M9.2 8.9V21H13V15C13 13.4 13.3 11.9 15.3 11.9 17.2 11.9 17.2 13.7 17.2 15.1V21H21V14.3C21 11.1 20.3 8.6 16.5 8.6 14.6 8.6 13.4 9.6 12.9 10.5H12.9V8.9H9.2V8.9ZM3.1 8.9H6.9V21H3.1V8.9Z" />      </svg></a></li></ul></div>'

      var more = target.querySelectorAll('div[data-social=icon-compartir]')
      var shareB = target.querySelectorAll('a[data-social=share-social')
      more.forEach(function(button) {
        button.addEventListener('click', function(e) {
          e.preventDefault()
          var shareList = button.querySelector('.story-content__list-more')

          if (shareList.classList.contains('block')) {
            shareList.classList.remove('block')
            shareList.classList.add('hidden')
          } else {
            shareList.classList.remove('hidden')
            shareList.classList.add('block')
          }
        })
      })

      if (shareB && shareB.length > 0) {
        var windowLeft = window.screen.width / 2 - 500 / 2
        var windowTop = window.screen.height / 2 - 300 / 2
        shareB.forEach(function(button) {
          button.addEventListener('click', function(e) {
            e.preventDefault()
            window.open(
              button.getAttribute('href'),
              '',
              'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=500, height=300, top=' +
                windowTop +
                ', left=' +
                windowLeft +
                ''
            )
          })
        })
      }

      observer.unobserve(target)
    }
  })
}

requestIdle(() => {
  if ('IntersectionObserver' in window) {
    const options = {
      rootMargin: '0px',
    }
    const btnCompartir = Array.from(document.querySelectorAll('.more-compartir'))
    const observer = new IntersectionObserver(minutoObserver, options)
    btnCompartir.forEach(btn => {
      observer.observe(btn)
    })
  }
})
*/
const iframeScript = `
"use strict";var minutoObserver=function(t,e){t.forEach(function(t){var r=t.isIntersecting,o=t.target;if(r){console.log("dddddd=>>>",t);var i=document.querySelector("meta[property='og:url']").getAttribute("content"),n=document.querySelector("meta[property='og:title']").getAttribute("content"),a=document.querySelector('meta[name="twitter:site"]');o.innerHTML='<div data-social="icon-compartir" class="icon-compartir"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 488 488"><path d="M483 216l-215-178c-4-3-10-4-14-2-5 2-8 7-8 12v94c-105 4-176 41-214 110-32 60-32 130-32 177 0 4 0 7 0 11 0 6 4 12 10 13 1 0 2 0 3 0 5 0 9-2 12-7 73-129 133-135 220-135v93c0 5 3 10 8 12s10 2 14-2l215-178c3-3 5-6 5-10S486 218 483 216zM273 376v-78c0-4-1-7-4-9-2-2-6-4-9-4-54 0-96 2-137 20-35 16-65 44-95 88 1-40 6-87 28-127 34-64 101-95 204-96 7 0 13-6 13-13v-78l181 149L273 376z" fill="#555"/></svg><ul class="story-content__list-more hidden"><li class=" story-content__item f f-center">      <a itemprop="url" title="Compartir en facebook" data-social="share-social" class="share-btn f f-center" href="http://www.facebook.com/sharer.php?u='+i+'"><svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 10 21">        <title>Compartir en facebook</title>        <path d="M2.6 21V11.1H0V7.6H2.6V4.6C2.6 2.2 4.1 0 7.5 0 8.9 0 10 0.1 10 0.1L9.9 3.5C9.9 3.5 8.8 3.4 7.7 3.4 6.4 3.4 6.2 4 6.2 5V7.6H10L9.8 11.1H6.2V21H2.6Z" />      </svg></a></li><li class=" story-content__item f f-center"><a itemprop="url" title="Compartir en twitter" data-social="share-social" class="share-btn f f-center" href="https://twitter.com/intent/tweet?text='+encodeURIComponent(n)+"&amp;url="+i+"&amp;via="+a+'"><svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 14 12">  <title>Compartir en twitter</title>   <path d="M13.5 2C13 2.2 12.5 2.3 12 2.4 12.5 2.1 12.9 1.5 13.1 0.9 12.6 1.2 12 1.4 11.4 1.6 11.2 1.3 10.9 1.1 10.6 0.9 10.2 0.8 9.9 0.7 9.5 0.7 8 0.7 6.8 1.9 6.8 3.4 6.8 3.6 6.9 3.8 6.9 4 4.7 3.9 2.7 2.8 1.4 1.2 1.2 1.6 1 2.1 1 2.6 1 3.5 1.5 4.3 2.2 4.8 1.8 4.8 1.4 4.6 1 4.4V4.5C1 5.8 1.9 6.8 3.2 7.1 2.9 7.1 2.7 7.2 2.5 7.2 2.3 7.2 2.1 7.2 2 7.1 2.3 8.2 3.3 9 4.5 9 3.5 9.7 2.4 10.1 1.1 10.1 0.9 10.1 0.7 10.1 0.5 10.1 1.7 10.8 3.1 11.3 4.6 11.3 9.5 11.3 12.2 7.2 12.2 3.7 12.2 3.6 12.2 3.5 12.2 3.4 12.7 3 13.1 2.5 13.5 2Z" />      </svg></a></li><li class=" story-content__item f f-center"><a itemprop="url" title="Compartir en linkedin" data-social="share-social" class="share-btn f f-center" href="http://www.linkedin.com/shareArticle?url='+i+'"> <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 24 24">         <title>Compartir en LinkedIn</title>        <path d="M5 7.2C6.2 7.2 7.2 6.2 7.2 5 7.2 3.8 6.2 2.8 5 2.8 3.8 2.8 2.8 3.8 2.8 5 2.8 6.2 3.8 7.2 5 7.2Z" />        <path d="M9.2 8.9V21H13V15C13 13.4 13.3 11.9 15.3 11.9 17.2 11.9 17.2 13.7 17.2 15.1V21H21V14.3C21 11.1 20.3 8.6 16.5 8.6 14.6 8.6 13.4 9.6 12.9 10.5H12.9V8.9H9.2V8.9ZM3.1 8.9H6.9V21H3.1V8.9Z" />      </svg></a></li></ul></div>';var s=o.querySelectorAll("div[data-social=icon-compartir]"),c=o.querySelectorAll("a[data-social=share-social");if(s.forEach(function(t){t.addEventListener("click",function(e){e.preventDefault();var r=t.querySelector(".story-content__list-more");r.classList.contains("block")?(r.classList.remove("block"),r.classList.add("hidden")):(r.classList.remove("hidden"),r.classList.add("block"))})}),c&&c.length>0){var l=window.screen.width/2-250,d=window.screen.height/2-150;c.forEach(function(t){t.addEventListener("click",function(e){e.preventDefault(),window.open(t.getAttribute("href"),"","toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=500, height=300, top="+d+", left="+l)})})}e.unobserve(o)}})};requestIdle(function(){if("IntersectionObserver"in window){var t=Array.from(document.querySelectorAll(".more-compartir")),e=new IntersectionObserver(minutoObserver,{rootMargin:"0px"});t.forEach(function(t){e.observe(t)})}});
`

export default iframeScript
