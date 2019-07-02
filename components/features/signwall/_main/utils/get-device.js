const getDevice = window => {
  const b = window && window.navigator.userAgent.toLowerCase()

  const testTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(
    b
  )
  const testMobil = /(mobi|ipod|phone|blackberry|opera mini|fennec|minimo|symbian|psp|nintendo ds|archos|skyfire|puffin|blazer|bolt|gobrowser|iris|maemo|semc|teashark|uzard)/.test(
    b
  )
  if (testTablet) {
    return 'tablet'
  }
  if (testMobil) {
    return 'movil'
  }
  return 'desktop'
}

export default getDevice
