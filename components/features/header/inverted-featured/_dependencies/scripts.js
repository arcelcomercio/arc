/*
window.addEventListener('load', () => {requestIdle(() => {
  const $btnMenu = document.getElementById('btn-menu')
  const $btnCloseMenu = document.getElementById('btn-close-menu')

  const $header = document.body.querySelector('.header-full')
  const $menuBtnBox = $header.querySelector('.header-full__box-btnmenu')
  const $menuIcon = $header.querySelector('.header-full__icon-menu')
  const $menuWrapper = $header.querySelector('.header-full__wrapper-menu')
  const $megaMenu = $header.querySelector('.header-full__megamenu')
  const $sidebarWrapper = $header.querySelector('.nav-sidebar__wrapper')
  
  ;[$btnMenu,$btnCloseMenu].forEach( menuButton => {
    menuButton.addEventListener('click', () => {
      if($menuIcon.className.indexOf('icon-hamburguer') > 0) {
        $menuBtnBox.className = $menuBtnBox.className.concat(' bg-white')
        $menuIcon.className = $menuIcon.className.replace('icon-hamburguer', 'icon-close active')
        $menuWrapper.className = $menuWrapper.className.concat(' active')
        $megaMenu.className = $megaMenu.className.concat(' active')
        $sidebarWrapper.className = $sidebarWrapper.className.concat(' active')
      } else {
        $menuBtnBox.className = $menuBtnBox.className.replace(' bg-white', '')
        $menuIcon.className = $menuIcon.className.replace('icon-close active', 'icon-hamburguer')
        $menuWrapper.className = $menuWrapper.className.replace(' active', '')
        $megaMenu.className = $megaMenu.className.replace(' active', '')
        $sidebarWrapper.className = $sidebarWrapper.className.replace(' active', '')
      }
    })
  })
})})
*/

export const toggleMenu_ = `window.addEventListener("load",function(){requestIdle(function(){
  var e=document.getElementById("btn-menu"),
  a=document.getElementById("btn-close-menu"),
  c=document.body.querySelector(".header-full"),
  l=c.querySelector(".header-full__box-btnmenu"),
  s=c.querySelector(".header-full__icon-menu"),
  t=c.querySelector(".header-full__wrapper-menu"),
  r=c.querySelector(".header-full__megamenu"),
  n=c.querySelector(".nav-sidebar__wrapper");
  [e,a].forEach(function(e){e.addEventListener("click",function(){
    s.className.indexOf("icon-hamburguer")>0
    ?(l.className=l.className.concat(" bg-white"),
    s.className=s.className.replace("icon-hamburguer","icon-close active"),
    t.className=t.className.concat(" active"),
    r.className=r.className.concat(" active"),
    n.className=n.className.concat(" active"))
    :(l.className=l.className.replace(" bg-white",""),
    s.className=s.className.replace("icon-close active","icon-hamburguer"),
    t.className=t.className.replace(" active",""),
    r.className=r.className.replace(" active",""),
    n.className=n.className.replace(" active","")
    )})})})});`

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
      s.className=s.className.replace("icon-hamburguer","icon-close active")
      )
      :(n.className=n.className.concat(" hidden"),
      s.className=s.className.replace("icon-close active","icon-hamburguer")
      )
    })})
  })});`
