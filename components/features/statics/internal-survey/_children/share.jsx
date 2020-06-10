import React from 'react'

const classes = {
  shareitem: 'i-survey-share mr-20',
}

const popUpWindow = (url, title, w, h) => {
  const left = window.screen.width / 2 - w / 2
  const top = window.screen.height / 2 - h / 2
  return window.open(
    url,
    title,
    `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${top}, left=${left}`
  )
}

const openLink = (event, link = '') => {
  event.preventDefault()
  popUpWindow(link, '', 600, 400)
}

const InternalSurveyChildShare = ({ socialnetwork, url }) => {
  return (
    <li className={classes.shareitem}>
      <a itemProp="url" href="/" onClick={eve => openLink(eve, url)}>
        <i>{socialnetwork}</i>
      </a>
    </li>
  )
}

export default InternalSurveyChildShare
