/*
const minutoObserver = (entries, observer) => {
  entries.forEach(entry => {
    const { isIntersecting, target } = entry
    if (isIntersecting) {
      const URL_STORY = document.querySelector('meta[name=og:url]')
      const title = document.querySelector('meta[name=og:title]')
      const site = document.querySelector('meta[name=twitter:site]')

      target.innerHTML =
        '<a data-social="icon-compartir" class="icon-compartir"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 488 488"><path d="M483 216l-215-178c-4-3-10-4-14-2-5 2-8 7-8 12v94c-105 4-176 41-214 110-32 60-32 130-32 177 0 4 0 7 0 11 0 6 4 12 10 13 1 0 2 0 3 0 5 0 9-2 12-7 73-129 133-135 220-135v93c0 5 3 10 8 12s10 2 14-2l215-178c3-3 5-6 5-10S486 218 483 216zM273 376v-78c0-4-1-7-4-9-2-2-6-4-9-4-54 0-96 2-137 20-35 16-65 44-95 88 1-40 6-87 28-127 34-64 101-95 204-96 7 0 13-6 13-13v-78l181 149L273 376z" fill="#555"/></svg></a><ul class="story-content__list-more hidden"><li class=" story-content__item flex justify-center"><a itemprop="url" title="Compartir en facebook" data-social="share-social" class="story-content__more-link flex items-center" href="http://www.facebook.com/sharer.php?u=' +
        URL_STORY +
        '"><i class="icon-facebook-circle title-md" aria-hidden="true"></i></a></li><li class=" story-content__item flex justify-center"><a itemprop="url" title="Compartir en twitter" data-social="share-social" class="story-content__more-link flex items-center" href="https://twitter.com/intent/tweet?text=' +
        title +
        '&amp;url=' +
        URL_STORY +
        '&amp;via=' +
        site +
        '"><i class="icon-twitter-circle title-md" aria-hidden="true"></i></a></li><li class=" story-content__item flex justify-center"><a itemprop="url" title="Compartir en linkedin" data-social="share-social" class="story-content__more-link flex items-center" href="http://www.linkedin.com/shareArticle?url=' +
        URL_STORY +
        '"><i class="icon-linkedin-circle title-md" aria-hidden="true"></i></a></li></ul>'


        (
          function() {
              var more = target.querySelectorAll('div[data-social=icon-compartir]')
              
              var shareB = target.querySelectorAll(
                'a[data-social=share-social'
              )
              more.forEach(function(button) {
                button.addEventListener('click', function(e) {
                  e.preventDefault()
                  var shareList = button.querySelector(
                    '.story-content__list-more'
                  )

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
          }
        )()

      observer.unobserve(target)
    }
  })
}

requestIdle(() => {
  if ('IntersectionObserver' in window) {
    const options = {
      rootMargin: '0px',
    }
    const iframes = Array.from(document.querySelectorAll('.more-compartir'))
    const observer = new IntersectionObserver(minutoObserver, options)
    iframes.forEach(iframe => {
      observer.observe(iframe)
    })
  }
})
*/
const iframeScript = `"use strict";var minutoObserver=function(e,t){e.forEach(function(e){var i=e.isIntersecting,r=e.target;if(i){var o=document.querySelector('meta[property="og:url"]').content,n=document.querySelector('meta[property="og:title"]').content,c=document.querySelector('meta[name="twitter:site"]').content;r.innerHTML='<div data-social="icon-compartir" class="icon-compartir"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 488 488"><path d="M483 216l-215-178c-4-3-10-4-14-2-5 2-8 7-8 12v94c-105 4-176 41-214 110-32 60-32 130-32 177 0 4 0 7 0 11 0 6 4 12 10 13 1 0 2 0 3 0 5 0 9-2 12-7 73-129 133-135 220-135v93c0 5 3 10 8 12s10 2 14-2l215-178c3-3 5-6 5-10S486 218 483 216zM273 376v-78c0-4-1-7-4-9-2-2-6-4-9-4-54 0-96 2-137 20-35 16-65 44-95 88 1-40 6-87 28-127 34-64 101-95 204-96 7 0 13-6 13-13v-78l181 149L273 376z" fill="#555"/></svg><ul class="story-content__list-more hidden"><li class=" story-content__item flex justify-center"><a itemprop="url" title="Compartir en facebook" data-social="share-social" class="story-content__more-link flex items-center" href="http://www.facebook.com/sharer.php?u='+o+'"><i class="icon-facebook-circle title-md" aria-hidden="true"></i></a></li><li class=" story-content__item flex justify-center"><a itemprop="url" title="Compartir en twitter" data-social="share-social" class="story-content__more-link flex items-center" href="https://twitter.com/intent/tweet?text='+encodeURIComponent(n)+"&amp;url="+o+"&amp;via="+c+'"><i class="icon-twitter-circle title-md" aria-hidden="true"></i></a></li><li class=" story-content__item flex justify-center"><a itemprop="url" title="Compartir en linkedin" data-social="share-social" class="story-content__more-link flex items-center" href="http://www.linkedin.com/shareArticle?url='+o+'"><i class="icon-linkedin-circle title-md" aria-hidden="true"></i></a></li></ul></div>',function(){var e=r.querySelectorAll("div[data-social=icon-compartir]"),t=r.querySelectorAll("a[data-social=share-social");if(e.forEach(function(e){e.addEventListener("click",function(t){t.preventDefault();var i=e.querySelector(".story-content__list-more");i.classList.contains("block")?(i.classList.remove("block"),i.classList.add("hidden")):(i.classList.remove("hidden"),i.classList.add("block"))})}),t&&t.length>0){var i=window.screen.width/2-250,o=window.screen.height/2-150;t.forEach(function(e){e.addEventListener("click",function(t){t.preventDefault(),window.open(e.getAttribute("href"),"","toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=500, height=300, top="+o+", left="+i)})})}}(),t.unobserve(r)}})};requestIdle(function(){if("IntersectionObserver"in window){var e=Array.from(document.querySelectorAll(".more-compartir")),t=new IntersectionObserver(minutoObserver,{rootMargin:"0px"});e.forEach(function(e){t.observe(e)})}});
`

export default iframeScript
