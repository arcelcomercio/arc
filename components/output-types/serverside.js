export const getScriptAdPushup = arcSite => {
  let pushup = ''
  let idPushup = '42614'
  if (arcSite === 'elbocon') {
    idPushup = '42614'
  } else if (arcSite === 'trome') {
    idPushup = '43065'
  } else if (arcSite === 'ojo') {
    idPushup = '42879'
  }
  pushup = `setTimeout(function(){var e,t;window,e=document,(t=e.createElement("script")).src="//cdn.adpushup.com/${idPushup}/adpushup.js",t.crossOrigin="anonymous",t.type="text/javascript",t.async=!0,(e.getElementsByTagName("head")[0]||e.getElementsByTagName("body")[0]).appendChild(t)},5e3);`
  return pushup
}

export const getEnabledServerside = arcSite => {
  let epushud = false
  if (
    arcSite === 'trome' ||
    arcSite === 'elbocon' ||
    arcSite === 'ojo'
  ) {
    epushud = true
  }
  return epushud
}
