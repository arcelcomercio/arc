import React from 'react'

const classes = {
  shareitem: 'internal-survey__result-share-item',
}

const SurveyInternalChildItemShare = ({ socialnetwork, url }) => {
  return (
    <li className={classes.shareitem}>
      <a href={url}>
        <i>{socialnetwork}</i>
      </a>
    </li>
  )
}

export default SurveyInternalChildItemShare
