import * as React from 'react'

import { socialMediaUrlShareList } from '../../../../utilities/social-media'

const classes = {
  container: 'trivias-result',
  line: 'trivias-result__line',
  title: 'trivias-result__title',
  points: 'trivias-result__points',
  message: 'trivias-result__message',
  restart: 'trivias-result__restart',
  shareBox: 'trivias-result__share-box',
  shareTitle: '',
  share: 'trivias-result__share',
}

const windowW = 600
const windowH = 400

/**
 * @param {object} props
 * @param {string} props.title
 * @param {string} props.messageNull
 * @param {string} props.messagePoor
 * @param {string} props.messageGood
 * @param {string} props.messagePerfect
 * @param {string[]} props.points
 * @param {function} props.restart
 * @param {string} props.siteUrl
 * @param {string} props.requestUri
 * @param {string} props.twitter
 */
const TriviasMainResult = ({
  title,
  messageNull,
  messagePoor,
  messageGood,
  messagePerfect,
  points,
  restart,
  siteUrl,
  requestUri,
  twitter,
}) => {
  const maxPoints = points.length
  const currentPoints = points.filter((value) => value === 'yes').length

  const percentage = currentPoints / maxPoints

  let messageToShow
  if (percentage < 0.1) {
    messageToShow = messageNull
  } else if (percentage < 0.5) {
    messageToShow = messagePoor
  } else if (percentage < 0.99) {
    messageToShow = messageGood
  } else if (percentage === 1) {
    messageToShow = messagePerfect
  }

  const shareLinks = socialMediaUrlShareList(
    siteUrl,
    requestUri,
    title,
    twitter
  )

  const handleShare = (e, link) => {
    e.preventDefault()
    const wLeft = window.screen.width / 2 - windowW / 2
    const wTop = window.screen.height / 2 - windowH / 2
    window.open(
      link,
      '',
      `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${windowW}, height=${windowH}, top=${wTop}, left=${wLeft}`
    )
  }

  return (
    <div
      className={classes.container}
      style={{ minHeight: '600px', display: 'flex', flexDirection: 'column' }}>
      <svg
        height="2"
        width="15%"
        aria-disabled
        className={classes.line}
        style={{ margin: '50px auto 0' }}>
        <line x2="100%" style={{ strokeWidth: 2 }} />
      </svg>
      <h1
        className={classes.title}
        style={{
          padding: '20px 25px 25px',
        }}>
        {title}
      </h1>
      <span
        className={classes.points}
        style={{
          minHeight: '166px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '0 auto',
        }}>{`${currentPoints}/${maxPoints}`}</span>
      <p className={classes.message} style={{ padding: '25px' }}>
        {messageToShow}
      </p>
      <svg
        height="2"
        width="15%"
        aria-disabled
        className={classes.line}
        style={{ margin: '0 auto' }}>
        <line x2="100%" style={{ strokeWidth: 2 }} />
      </svg>
      <button
        type="button"
        onClick={restart}
        className={classes.restart}
        style={{ margin: '25px auto' }}>
        Empezar de nuevo
      </button>
      <div style={{ margin: '0 auto 35px' }} className={classes.shareBox}>
        <p className={classes.shareTitle} style={{ paddingBottom: '12px' }}>
          Comparte la trivia
        </p>
        <div className={classes.share}>
          <button
            type="button"
            onClick={(e) => handleShare(e, shareLinks.facebook)}>
            <svg width="22.34" height="22.205" viewBox="0 0 22.34 22.205">
              <path
                d="M22.9,11.733A11.17,11.17,0,1,0,9.987,22.768V14.962H7.15V11.733H9.987V9.272c0-2.8,1.667-4.346,4.219-4.346a17.191,17.191,0,0,1,2.5.218V7.892H15.3a1.614,1.614,0,0,0-1.82,1.744v2.1h3.1l-.5,3.229h-2.6v7.806A11.174,11.174,0,0,0,22.9,11.733Z"
                transform="translate(-0.563 -0.563)"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={(e) => handleShare(e, shareLinks.twitter)}>
            <svg width="27.34" height="22.205" viewBox="0 0 27.34 22.205">
              <path
                d="M24.53,8.915c.017.243.017.486.017.729A15.833,15.833,0,0,1,8.6,25.586,15.835,15.835,0,0,1,0,23.071a11.592,11.592,0,0,0,1.353.069A11.222,11.222,0,0,0,8.31,20.746,5.613,5.613,0,0,1,3.071,16.86a7.066,7.066,0,0,0,1.058.087A5.926,5.926,0,0,0,5.6,16.756a5.6,5.6,0,0,1-4.493-5.5v-.069a5.643,5.643,0,0,0,2.533.711A5.612,5.612,0,0,1,1.908,4.4a15.927,15.927,0,0,0,11.554,5.864,6.325,6.325,0,0,1-.139-1.284,5.609,5.609,0,0,1,9.7-3.834A11.032,11.032,0,0,0,26.577,3.8a5.588,5.588,0,0,1-2.463,3.088,11.233,11.233,0,0,0,3.227-.867,12.045,12.045,0,0,1-2.81,2.9Z"
                transform="translate(0 -3.381)"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={(e) => handleShare(e, shareLinks.whatsapp)}>
            <svg width="22.205" height="22.205" viewBox="0 0 22.205 22.205">
              <path
                d="M13.554,2.25a10.859,10.859,0,0,0-10.9,10.817,10.7,10.7,0,0,0,1.564,5.585l-1.967,5.8,6.035-1.917a10.919,10.919,0,0,0,16.17-9.471A10.859,10.859,0,0,0,13.554,2.25Zm5.421,14.925a2.816,2.816,0,0,1-1.928,1.243c-.511.027-.526.4-3.313-.815a11.374,11.374,0,0,1-4.6-4.345,5.346,5.346,0,0,1-1.028-2.9A3.089,3.089,0,0,1,9.17,8.094a1.068,1.068,0,0,1,.755-.318c.219,0,.362-.007.524,0s.406-.034.617.527.716,1.941.78,2.081a.505.505,0,0,1,.005.484,1.893,1.893,0,0,1-.3.45c-.145.156-.306.349-.436.468s-.3.276-.144.559a8.342,8.342,0,0,0,1.476,1.97,7.606,7.606,0,0,0,2.186,1.453c.273.149.436.132.606-.046s.726-.78.922-1.049.38-.217.632-.115,1.594.821,1.867.969.456.224.521.342A2.289,2.289,0,0,1,18.975,17.175Z"
                transform="translate(-2.25 -2.25)"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default TriviasMainResult
