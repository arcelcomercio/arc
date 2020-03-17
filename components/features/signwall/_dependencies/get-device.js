const getDevice = window => {
  const W = window
  const UserAg = W && (W.navigator.userAgent || W.navigator.vendor || W.opera)
  const UAlowerCase = UserAg.toLowerCase()
  const testFia = UserAg.indexOf('FBAN') > -1 || UserAg.indexOf('FBAV') > -1

  const testTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(
    UAlowerCase
  )
  const testMobil = /(mobi|ipod|phone|blackberry|opera mini|fennec|minimo|symbian|psp|nintendo ds|archos|skyfire|puffin|blazer|bolt|gobrowser|iris|maemo|semc|teashark|uzard)/.test(
    UAlowerCase
  )

  if (testFia && testMobil) {
    if (UserAg.match(/iPad/i)) {
      return 'tablet'
    }
    return 'movil'
  }
  if (testFia && testTablet) {
    return 'tablet'
  }
  if (testTablet) {
    return 'tablet'
  }
  if (testMobil) {
    return 'movil'
  }
  return 'desktop'
}

export default getDevice
