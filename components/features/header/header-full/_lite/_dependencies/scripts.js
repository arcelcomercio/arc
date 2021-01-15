/* document.addEventListener("DOMContentLoaded", () => {
  const $header = document.body.querySelector('div[data-story-header="true"]');
  if ("IntersectionObserver" in window) {
    const navPointer = document.getElementById("nav-pointer");
    const sectionOneObserver = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          $header.classList.add("active");
          navPointer.classList.add("scrolled");
        } else {
          $header.classList.remove("active");
          navPointer.classList.remove("scrolled");
        }
      });
    });
    sectionOneObserver.observe(navPointer);
  } else {
    window.addEventListener("scroll", () => {
      const { body = {}, documentElement = {} } = document;
      const { scrollTop: scrollBody = 0 } = body;
      const { scrollTop: scrollElement = 0 } = documentElement;
      const scroll = scrollBody || scrollElement;

      const headerTop = 10;
      if (scroll > headerTop && !$header.classList.contains("active")) {
        $header.classList.add("active");
      } else if (scroll <= headerTop && $header.classList.contains("active")) {
        $header.classList.remove("active");
      }
    });
  }
}); */
export const scrolled = `"use strict";document.addEventListener("DOMContentLoaded",function(){var e=document.body.querySelector('div[data-story-header="true"]');if("IntersectionObserver"in window){var t=document.getElementById("nav-pointer");new IntersectionObserver(function(s){s.forEach(function(s){s.isIntersecting?(e.classList.remove("active"),t.classList.remove("scrolled")):(e.classList.add("active"),t.classList.add("scrolled"))})}).observe(t)}else window.addEventListener("scroll",function(){var t=document,s=t.body,o=void 0===s?{}:s,i=t.documentElement,n=void 0===i?{}:i,c=o.scrollTop,d=void 0===c?0:c,a=n.scrollTop,r=d||(void 0===a?0:a);r>10&&!e.classList.contains("active")?e.classList.add("active"):r<=10&&e.classList.contains("active")&&e.classList.remove("active")})});`

/* window.addEventListener("scroll", () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scale = Math.round((winScroll / height) * 100) / 100;
  const loader = document.querySelector(".nav__loader-bar")
  if(loader) {
    loader.style.transform = `scaleX(${scale})`
  }
}) */
export const scrollProgresBar =
  'window.addEventListener("scroll",function(){var e=document.body.scrollTop||document.documentElement.scrollTop,o=document.documentElement.scrollHeight-document.documentElement.clientHeight,t=Math.round(e/o*100)/100,n=document.querySelector(".nav__loader-bar");n&&(n.style.transform="scaleX(".concat(t,")"))});'

/* document.addEventListener("DOMContentLoaded", () => {
  const btnMenu = document.querySelector(".header-full__btn-menu")
  const megaMenu = document.querySelector(".header-full__megamenu")
  if (btnMenu && megaMenu) {
    btnMenu.addEventListener("click", () => {
      megaMenu.classList.toggle("active")
    })
  }
}); */
export const menuScript =
  '"use strict";document.addEventListener("DOMContentLoaded",function(){var e=document.querySelector(".header-full__btn-menu"),t=document.querySelector(".header-full__megamenu");e&&t&&e.addEventListener("click",function(){t.classList.toggle("active")})});'

/* document.addEventListener("DOMContentLoaded", function () {
  const headerSearchBtn = document.querySelector(".header-full__is");
  const formContainer = document.querySelector(
    ".navbar-nm__box-search.hf-search"
  );
  if (headerSearchBtn && formContainer) {
    headerSearchBtn.addEventListener("click", () => {
      formContainer.classList.toggle("active");
    });
  }
  const searchInput = document.body.querySelector(
    ".navbar-nm__input-search.hf-search"
  );
  const searchForm = document.body.querySelector(
    ".navbar-nm__box-search.hf-search"
  );
  if (searchInput && searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (searchInput.value) {
        const newQuery = encodeURIComponent(searchInput.value).replace(
          /%20/g,
          "+"
        );
        window.location.href = `/buscar/${newQuery}/todas/descendiente/?query=${newQuery}`;
      }
    });
  }
}); */
export const searchScript =
  '"use strict";document.addEventListener("DOMContentLoaded",function(){var e=document.querySelector(".header-full__is"),n=document.querySelector(".navbar-nm__box-search.hf-search");e&&n&&e.addEventListener("click",function(){n.classList.toggle("active")});var t=document.body.querySelector(".navbar-nm__input-search.hf-search"),c=document.body.querySelector(".navbar-nm__box-search.hf-search");t&&c&&c.addEventListener("submit",function(e){if(e.preventDefault(),t.value){var n=encodeURIComponent(t.value).replace(/%20/g,"+");window.location.href="/buscar/".concat(n,"/todas/descendiente/?query=").concat(n)}})});'
/*
window.addEventListener('load', () => {requestIdle(() => {
  var more = target.querySelectorAll('div[id=edicionId]')
  more.forEach(function(button) {
    button.addEventListener('click', function(e) {
      e.preventDefault()
      var shareList = button.querySelector('.header-full__e-content')

      if (shareList.classList.contains('block')) {
        shareList.classList.remove('block')
        shareList.classList.add('hidden')
      } else {
        shareList.classList.remove('hidden')
        shareList.classList.add('block')
      }
    })
  })

})})
*/
export const edicionMenu = `
window.addEventListener("load",()=>{requestIdle(()=>{document.getElementById("edicionId").addEventListener("click",function(e){e.preventDefault();var d=document.querySelector(".header-full__e-content");d.classList.contains("block")?(d.classList.remove("block"),d.classList.add("hidden")):(d.classList.remove("hidden"),d.classList.add("block"))})})});
`
