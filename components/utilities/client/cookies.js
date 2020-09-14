// eslint-disable-next-line import/prefer-default-export
export const getCookie = cookieName => {
  const cookieValue =
    typeof document !== 'undefined' &&
    document.cookie.match(`(^|;) ?${cookieName}=([^;]*)(;|$)`)
  return cookieValue ? cookieValue[2] : null
}
