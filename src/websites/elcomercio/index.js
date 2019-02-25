import './scss/main.scss'
import './favicon.ico'
import './images/logo.png'
import './images/footer-logo.png'

const scrollEvent = () => {
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    document.getElementsByClassName('nav__logo').className = 'block'
  }
}

window.addEventListener('scroll', scrollEvent())
