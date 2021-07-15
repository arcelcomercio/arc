// new `Date().toGMTString()` has been deprecated
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toGMTString
// use `toUTCString()` instead

import { ArcSite } from 'types/fusion'
import { AnyObject } from 'types/utils'

type SameSiteValue = 'lax' | 'strict' | 'none'

const isClientSide = typeof window !== 'undefined'

export const getCookie = (name: string): string | null => {
  const cookieValue =
    isClientSide && document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`)
  return cookieValue ? cookieValue[2] : null
}

export const setCookie = (
  name: string,
  value: string,
  days = 1,
  sameSite: SameSiteValue = 'lax'
): void => {
  if (isClientSide) {
    const expireDate = new Date()
    expireDate.setTime(expireDate.getTime() + days * 24 * 60 * 60 * 1000)
    const expires = `expires=${expireDate.toUTCString()}`
    document.cookie = `${name}=${
      typeof value === 'string' ? value : JSON.stringify(value)
    }; path=/; secure; sameSite=${sameSite}; ${expires}`
  }
}

export const deleteCookie = (name: string): ReturnType<typeof setCookie> => {
  setCookie(name, '', -1)
}

/**
 * @deprecated Use `setCookie` instead. Be aware that `setCookie` has different params.
 */
export const setCookieDomain = (
  name: string,
  value: string,
  days: number
): ReturnType<typeof setCookie> => {
  setCookie(name, value, days, 'lax')
}

/**
 * @deprecated Use `setCookie` instead. Be aware that `setCookie` has different params.
 */
export const setCookieSession = (name: string, value: AnyObject): void => {
  document.cookie = `${name}=${JSON.stringify(value)}; expires=0; path=/`
}

/**
 * @deprecated Use `deleteCookie` instead.
 */
export const deleteCookieDomain = (name: string, domain: ArcSite): void => {
  const date = new Date()
  date.setTime(date.getTime() + 24 * 60 * 60 * 1000 * -1)
  document.cookie = `${name}=;path=/;domain=.${domain}.pe; expires=${date.toUTCString()}`
}
