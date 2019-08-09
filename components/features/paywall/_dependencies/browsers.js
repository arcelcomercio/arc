// eslint-disable-next-line import/prefer-default-export
export function getBrowser() {
  const { userAgent } = window.navigator
  const isExplorer = userAgent.indexOf('MSIE') > -1
  const isFirefox = userAgent.indexOf('Firefox') > -1
  const isOpera = userAgent.toLowerCase().indexOf('op') > -1
  const isChrome = userAgent.indexOf('Chrome') > -1 && !isOpera
  const isSafari = userAgent.indexOf('Safari') > -1 && !isChrome && !isOpera
  return { isChrome, isSafari, isExplorer, isFirefox, isOpera }
}
