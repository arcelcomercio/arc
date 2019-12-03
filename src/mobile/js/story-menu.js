export default () => {
  const menu = document.getElementById('menu')
  const body = document.body
  const navbar = document.getElementById('header')
  const sticky = navbar.offsetTop

  const toggleAction = () => {
    const navSidebar = document.getElementById('nav-sidebar')
    navSidebar.classList.toggle('open')
    menu.classList.toggle('open')
  }
  menu.ontouchstart = toggleAction()

  const myFunction = () => {
    if (window.pageYOffset >= sticky) {
      navbar.classList.add('sticky')
      body.classList.add('sticky')
    } else {
      navbar.classList.remove('sticky')
      body.classList.remove('sticky')
    }
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight
    const scrolled = (winScroll / height) * 100

    document.getElementById('loader-bar').style.transform = `scaleX('${parseInt(
      scrolled,
      0
    ) / 100}')`
  }

  window.onscroll = function() {
    myFunction()
  }
}
