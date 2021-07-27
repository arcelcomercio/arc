// new `Date().toGMTString()` has been deprecated
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toGMTString
// use `toUTCString()` instead

import { Domain } from 'types/utils'

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
  days?: number,
  domain?: Domain,
  sameSite: SameSiteValue = 'lax'
): void => {
  if (isClientSide) {
    let expires = ''

    if (days) {
      const expireDate = new Date()
      expireDate.setTime(expireDate.getTime() + days * 24 * 60 * 60 * 1000)
      expires = `;expires=${expireDate.toUTCString()}`
    }

    const domainValue = domain ? `;domain=${domain}` : ''

    document.cookie = `${name}=${
      typeof value === 'string' ? value : JSON.stringify(value)
    };path=/;secure;sameSite=${sameSite}${domainValue}${expires}`
  }
}

export const deleteCookie = (
  name: string,
  domain?: Domain
): ReturnType<typeof setCookie> => {
  setCookie(name, '', -1, domain)
}
