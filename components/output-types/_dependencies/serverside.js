export const getScriptAdPushup = arcSite => {
  let pushup = ''
  let idPushup = '42614'
  if (arcSite === 'elbocon') {
    idPushup = '42614'
  } else if (arcSite === 'trome') {
    idPushup = '43065'
  } else if (arcSite === 'ojo') {
    idPushup = '42879'
  }  else if (arcSite === 'elcomercio') {
    idPushup = '43080'
  } else if (arcSite === 'peru21') {
    idPushup = '42612'
  } else if (arcSite === 'gestion') {
    idPushup = '43082'
  } else if (arcSite === 'depor') {
    idPushup = '43081'
  }
  pushup = `setTimeout(function(){var e,t;window,e=document,(t=e.createElement("script")).src="//cdn.adpushup.com/${idPushup}/adpushup.js",t.crossOrigin="anonymous",t.type="text/javascript",t.async=!0,(e.getElementsByTagName("head")[0]||e.getElementsByTagName("body")[0]).appendChild(t)},5e3);`
  return pushup
}

export const getEnabledServerside = arcSite => {
  let epushud = false
  if (
    arcSite === 'trome' ||
    arcSite === 'elbocon' ||
    arcSite === 'ojo' || 
    arcSite === 'elcomercio' || 
    arcSite === 'peru21' || 
    arcSite === 'gestion' || 
    arcSite === 'depor'
  ) {
    epushud = true
  }
  return epushud
}
