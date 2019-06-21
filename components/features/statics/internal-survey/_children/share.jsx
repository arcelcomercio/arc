import React from 'react'
import { popUpWindow } from '../../../../utilities/helpers'

const classes = {
  shareitem: 'i-survey-share mr-20',
}

const openLink = (event, link = '') => {
  event.preventDefault()
  popUpWindow(link, '', 600, 400)
}

const InternalSurveyChildShare = ({ socialnetwork, url }) => {
  return (
    <li className={classes.shareitem}>
      <a href="/" onClick={eve => openLink(eve, url)}>
        <i>{socialnetwork}</i>
      </a>
    </li>
  )
}

export default InternalSurveyChildShare
