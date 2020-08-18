import ENV from 'fusion:environment'

const titleCase = string => {
  const wordsArray = string.toLowerCase().split(/_/)
  const upperCased = wordsArray.map(word => {
    return word.charAt(0).toUpperCase() + word.substr(1)
  })
  return upperCased.join('_')
}

const Taggeo = (cat, acc) => {
  const TRIGGER = 'tag_signwall'
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || []
    const dataPush = {
      event: TRIGGER,
      eventCategory: titleCase(cat),
      eventAction: acc,
    }
    window.dataLayer.push(dataPush)
    if (ENV.ENVIRONMENT !== 'elcomercio') {
      // Only sandbox ;)
      window.console.log(
        `%c 🔔 Taggeo Detectado - Signwall:`,
        'color:  darkorange; font-size: 12px'
      )
      window.console.table(dataPush)
    }
  }
}

export default Taggeo
