/*
window.addEventListener('load', () => {requestIdle(() => {
  const $btnMenu = document.getElementById('btn-menu')
  const $btnCloseMenu = document.getElementById('btn-close-menu')
  const $header = document.body.querySelector('.header-inverted-featured')
  const $buttonMenu = $header.querySelector('.header-inverted-featured__btn-menu')
  const $navSidebar = document.body.querySelector(".nav-sidebar")
  ;[$btnMenu,$btnCloseMenu].forEach( menuButton => {
    menuButton.addEventListener('click', () => {
      if($menuIcon.className.indexOf('icon-hamburguer') > 0) {
        $menuBtnBox.className = $menuBtnBox.className.concat(' bg-white')
      }else{

      }
    })
  })
})})
*/

export const toggleMenu = `window.addEventListener("load",function(){requestIdle(function(){
  var e=document.getElementById("btn-menu"),
  a=document.getElementById("btn-close-menu"),
  c=document.body.querySelector(".header-inverted-featured"),
  b=c.querySelector(".header-inverted-featured__btn-menu"),
  s=c.querySelector(".header-inverted-featured__icon-menu"),
  n=document.body.querySelector(".nav-sidebar")
    ;[e,a].forEach(function(e){e.addEventListener("click",function(){
      s.className.indexOf("icon-hamburguer")>0
      ?(n.className=n.className.replace(" hidden", ""),
      s.className=s.className.replace("icon-hamburguer","icon-close active"),
      b.className=b.className.concat(" header-inverted-featured__btn-menu-close")
      )
      :(n.className=n.className.concat(" hidden"),
      s.className=s.className.replace("icon-close active","icon-hamburguer"),
      b.className=b.className.replace(" header-inverted-featured__btn-menu-close", "")
      )
    })})
  })});`

/* 
  header-search-icon

  window.addEventListener('load', () => {requestIdle(() => {
  const $searchForm = document.getElementById('header-search-form')
  $searchForm.addEventListener('submit', e => {
    e.preventDefault()
    const value = e.target[0].value
    if(value){
      const newQuery = encodeURIComponent(value).replace(/%20/g, '+')
      window.location.href = `/buscar/${newQuery}/todas/descendiente/?query=${newQuery}`
    }
  })
})})
  */

export const searchScript = `window.addEventListener("load",function(){
    document.getElementById("header-search-form").addEventListener("submit",function(e){
      e.preventDefault();
      var t=e.target[0].value;
      if(t){
        var n=encodeURIComponent(t).replace(/%20/g,"+");
        window.location.href="/buscar/".concat(n,"/todas/descendiente/?query=").concat(n);
      }
    })
  });
  `
/*

*/

export const btnSearch = `window.addEventListener("load",function(){requestIdle(function(){
  var e=document.getElementById("header-search-button"),
  a=document.getElementById("header-search-input"),
  b=document.body.querySelector(".header-inverted-featured__btn-search"),
  s=document.body.querySelector(".header-inverted-featured__search")
    ;e.addEventListener("click",function(){
      if(b.className.indexOf("active")>0){
        var t=a.value;
        var n=encodeURIComponent(t).replace(/%20/g,"+");
        (t.length > 0)
        ?(
          window.location.href="/buscar/".concat(n,"/todas/descendiente/?query=").concat(n)
        )
        :(b.className=b.className.replace(" active", ""),
          s.className=s.className.replace(" active", "")
        )
      } else {
        b.className=b.className.concat(" active");
        s.className=s.className.concat(" active")
      }
    })
  })
})`

export const searchScriptMobile = `window.addEventListener("load",function(){
  document.getElementById("header-search-form-mobile").addEventListener("submit",function(e){
    e.preventDefault();
    var t=e.target[0].value;
    if(t){
      var n=encodeURIComponent(t).replace(/%20/g,"+");
      window.location.href="/buscar/".concat(n,"/todas/descendiente/?query=").concat(n);
    }
  })
});
`

export const btnSearchMobile = `window.addEventListener("load",function(){requestIdle(function(){
  var e=document.getElementById("header-search-icon-mobile"),
  a=document.getElementById("header-search-input-mobile")
    ;e.addEventListener("click",function(){
      var t=a.value;
      if(t){
        var n=encodeURIComponent(t).replace(/%20/g,"+");
        window.location.href="/buscar/".concat(n,"/todas/descendiente/?query=").concat(n);
      }
    })
  })
})`
