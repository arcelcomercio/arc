export default () => {
  const menu = document.getElementById('menu')

  const toggleAction = () => {
    const navSidebar = document.getElementById('nav-sidebar')
    navSidebar.classList.toggle('open')
    menu.classList.toggle('open')
  }
  menu.ontouchstart = toggleAction()

  const body = document.body
  const navbar = document.getElementById('header')
  const sticky = navbar.offsetTop

  const myFunction = () => {
    window.pageYOffset >= sticky
      ? navbar.classList.add('sticky')
      : navbar.classList.remove('sticky')
    window.pageYOffset >= sticky
      ? body.classList.add('sticky')
      : body.classList.remove('sticky')
  }
  //sticky menu
  window.onscroll = function() {
    myFunction()
  }
}
