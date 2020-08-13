const getDevice = window => {
  if (typeof window !== 'undefined') {
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
    if (UAlowerCase.indexOf('macintosh') > -1 && 'ontouchend' in document) {
      return 'tablet'
    }
    return 'desktop'
  }
  return ''
}

export default getDevice
