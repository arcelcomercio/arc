export default class Cookies {
  constructor() {
    this.setCookie = this.setCookie.bind(this)
    this.deleteCookie = this.deleteCookie.bind(this)
    this.getCookie = this.getCookie.bind(this)
  }

  setCookie = (name, value, days) => {
    const d = new Date()
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days)
    document.cookie = `${name}=${value};path=/;expires=${d.toGMTString()}`
  }

  setCookieDomain = (name, value, days, domain) => {
    const d = new Date()
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days)
    document.cookie = `${name}=${value};expires=${d.toGMTString()};domain=.${domain}.pe;path=/`
  }

  getCookie = name => {
    const v = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`)
    return v ? v[2] : null
  }

  deleteCookie(name) {
    this.setCookie(name, '', -1)
  }
}
