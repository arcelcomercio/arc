export const setSurveyCookie = (surveyId, days) => {
  const date = new Date()
  date.setTime(date.getTime() + 24 * 60 * 60 * 1000 * days)
  document.cookie = `idpoll${surveyId}=1;path=/;expires=${date.toGMTString()}`
}

export const getCookie = cookieName => {
  const cookieValue = document.cookie.match(`(^|;) ?${cookieName}=([^;]*)(;|$)`)
  return cookieValue ? cookieValue[2] : null
}
