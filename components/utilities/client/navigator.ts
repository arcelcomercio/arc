export function isIE(): boolean {
  const ua = window.navigator.userAgent
  const msie = ua.indexOf('MSIE ')
  const trident = ua.indexOf('Trident/')
  if (msie > 0 || trident > 0) {
    return true
  }
  return false
}

export function isMobile(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    window.navigator.userAgent
  )
}
