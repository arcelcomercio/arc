export const getPushud = arcSite => {
  let pushud = ''
  let idPushud = '41308'
  if (arcSite === 'peru21') {
    idPushud = '41308'
  } else if (arcSite === 'depor') {
    idPushud = '41272'
  } else if (arcSite === 'elbocon') {
    idPushud = '41441'
  } else if (arcSite === 'diariocorreo') {
    idPushud = '41440'
  } else if (arcSite === 'gestion') {
    idPushud = '41438'
  } else if (arcSite === 'trome') {
    idPushud = '41443'
  } else if (arcSite === 'elcomerciomag') {
    idPushud = '41445'
  } else if (arcSite === 'ojo') {
    idPushud = '41442'
  }
  pushud = `(function(w, d) { var s = d.createElement("script"); s.src = "//delivery.adrecover.com/${idPushud}/adRecover.js"; s.type = "text/javascript"; s.async = true; (d.getElementsByTagName("head")[0] || d.getElementsByTagName("body")[0]).appendChild(s); })(window, document);`
  return pushud
}

export const getEnablePushud = arcSite => {
  let epushud = false
  if (
    arcSite === 'peru21' ||
    arcSite === 'depor' ||
    arcSite === 'elbocon' ||
    arcSite === 'diariocorreo' ||
    arcSite === 'gestion' ||
    arcSite === 'trome' ||
    arcSite === 'elcomerciomag' ||
    arcSite === 'ojo'
  ) {
    epushud = true
  }
  return epushud
}
