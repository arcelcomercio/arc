class Cookies {
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
  
    setCookieSession = (name, value) => {
      document.cookie = `${name}=${JSON.stringify(value)}; expires=0; path=/`
    }
  
    getCookie = name => {
      const v = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`)
      return v ? v[2] : null
    }
  
    deleteCookie = name => {
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;`
    }
  }
  
  export default new Cookies()
  