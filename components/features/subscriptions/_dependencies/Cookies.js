export const setCookie = (name, value, days) => {
  const d = new Date()
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days)
  document.cookie = `${name}=${value};path=/;expires=${d.toGMTString()}`
}

export const setCookieDomain = (name, value, days, domain) => {
  const d = new Date()
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days)
  document.cookie = `${name}=${value};expires=${d.toGMTString()};domain=.${domain}.pe;path=/`
}

export const setCookieSession = (name, value) => {
  document.cookie = `${name}=${JSON.stringify(value)}; expires=0; path=/`
}

export const getCookie = name => {
  const v = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`)
  return v ? v[2] : null
}

export const deleteCookie = name => {
  const d = new Date()
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * -1)
  document.cookie = `${name}=;path=/;expires=${d.toGMTString()}`
}

export const deleteCookieDomain = (name, domain) => {
  const d = new Date()
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * -1)
  document.cookie = `${name}=;path=/;domain=.${domain}.pe; expires=${d.toGMTString()}`
}
