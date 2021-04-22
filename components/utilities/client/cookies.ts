export const getCookie = (cookieName: string): string | null => {
  const cookieValue =
    typeof document !== 'undefined' &&
    document.cookie.match(`(^|;) ?${cookieName}=([^;]*)(;|$)`)
  return cookieValue ? cookieValue[2] : null
}
