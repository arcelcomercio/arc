/* document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById("h-basic_search-btn")
  button.addEventListener("click", () => {
    const input = document.getElementById("h-basic_search-input")
    const svgPath = document.getElementById("h-basic_search-path")
    if (input.value) {
      const newQuery = encodeURIComponent(input.value).replace(/%20/g, '+')
      window.location.href = `/buscar/${newQuery}/todas/descendiente/?query=${newQuery}`
    }
    else if (input.style.width === "150px")  {
      input.style = ""
      button.style = ""
      svgPath.style = ""
    } else {
      input.style = "width:150px;padding: 5px 8px;"
      button.style = "background-color: white;border-top-right-radius: 4px;border-bottom-right-radius: 4px;"
      svgPath.style = "fill: #575757;"
    }
  })
}) */
export const searchScript =
  'document.addEventListener("DOMContentLoaded",function(){var e=document.getElementById("h-basic_search-btn");e.addEventListener("click",function(){var t=document.getElementById("h-basic_search-input"),n=document.getElementById("h-basic_search-path");if(t.value){var d=encodeURIComponent(t.value).replace(/%20/g,"+");window.location.href="/buscar/".concat(d,"/todas/descendiente/?query=").concat(d)}else"150px"===t.style.width?(t.style="",e.style="",n.style=""):(t.style="width:150px;padding: 5px 8px;",e.style="background-color: white;border-top-right-radius: 4px;border-bottom-right-radius: 4px;",n.style="fill: #575757;")})});'

/* document.addEventListener('DOMContentLoaded', () => {
  if ('IntersectionObserver' in window) {
    const headerPointer = document.getElementById('h-basic-pointer')
    const header = document.getElementById('h-basic')
    const sectionOneObserver = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          header.classList.add('scrolled')
          headerPointer.classList.add('scrolled')
        } else {
          header.classList.remove('scrolled')
          headerPointer.classList.remove('scrolled')
        }
      })
    })
    sectionOneObserver.observe(headerPointer)
  } else {
    const header = document.getElementById('h-basic')
    window.addEventListener('scroll', () => {
      const { body = {}, documentElement = {} } = document
      const { scrollTop: scrollBody = 0 } = body
      const { scrollTop: scrollElement = 0 } = documentElement
      const scroll = scrollBody || scrollElement
  
      const headerTop = 10
      if (scroll > headerTop && !header.classList.contains('scrolled')) {
        header.classList.add('scrolled')
      } else if (scroll <= headerTop && header.classList.contains('scrolled')) {
        header.classList.remove('scrolled')
      }
    })
  }
})   */
export const stickyScript =
  ';document.addEventListener("DOMContentLoaded",function(){if("IntersectionObserver"in window){var e=document.getElementById("h-basic-pointer"),s=document.getElementById("h-basic");new IntersectionObserver(function(o){o.forEach(function(o){o.isIntersecting?(s.classList.remove("scrolled"),e.classList.remove("scrolled")):(s.classList.add("scrolled"),e.classList.add("scrolled"))})}).observe(e)}else{var o=document.getElementById("h-basic");window.addEventListener("scroll",function(){var e=document,s=e.body,t=void 0===s?{}:s,c=e.documentElement,n=void 0===c?{}:c,d=t.scrollTop,l=void 0===d?0:d,i=n.scrollTop,r=l||(void 0===i?0:i);r>10&&!o.classList.contains("scrolled")?o.classList.add("scrolled"):r<=10&&o.classList.contains("scrolled")&&o.classList.remove("scrolled")})}});'

export const menuScript = `;window.addEventListener('load', () => {
    const $button = document.getElementById('h-basic__btn-menu')
    $button.addEventListener('click', () => {
      const $menu = document.getElementById('menu')
      const $mcontent = document.getElementById('m-content')
      if ($menu.className.includes('active')){
        $menu.className = $menu.className.replace('active', '')
        $mcontent.className = $mcontent.className.replace('active', '')
      }
      else {
        $menu.className = $menu.className.concat(' active')
        $mcontent.className = $mcontent.className.concat(' active')
      }
    })
  })
  `
