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
  window.dataLayer = window.dataLayer || []

  window.dataLayer.push({
    event: TRIGGER,
    eventCategory: titleCase(cat),
    eventAction: acc,
  })

  if (ENV.ENVIRONMENT !== 'elcomercio') {
    // Only sandbox ;)
    window.console.log({
      event: TRIGGER,
      eventCategory: titleCase(cat),
      eventAction: acc,
    })
  }
}

export default Taggeo
