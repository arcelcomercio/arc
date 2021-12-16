import * as React from 'react'

import { SITE_TROME } from '../../../../utilities/constants/sitenames'
import Portal from '../../../subscriptions/_children/modal/portal'

const HIDE_SCROLL = 'overflow-hidden'
const HIDE_SCROLL_IOS = 'overflow-hidden-ios'
const VIEWPORT_DEFAULT = 'width=device-width, initial-scale=1'
const VIEWPORT_CUSTOM = `${VIEWPORT_DEFAULT}, user-scalable=0, shrink-to-fit=no`

/**
 *
 * @param {Object} props
 * @param {string} props.bgColor
 * @param {'top'|'right'|'bottom'|'left'|'middle'} props.position
 * @param {string} props.size
 * @param {string} [props.margin]
 * @param {string} [props.padding]
 * @param {boolean} [props.noOverflow]
 * @param {React.ReactNode} [props.children]
 * @param {string} [props.arcSite]
 * @returns
 */
const Modal = ({
  bgColor,
  position,
  size,
  margin,
  padding,
  noOverflow,
  children,
  arcSite,
}) => {
  const changeView = (rule) => {
    const view = window.document.querySelector('meta[name=viewport]')
    if (view) view.remove()
    const meta = window.document.createElement('meta')
    meta.name = 'viewport'
    meta.content = rule
    window.document.getElementsByTagName('head')[0].appendChild(meta)
  }

  const isTrome = arcSite === SITE_TROME

  const isSafari = () => {
    if (typeof window !== 'undefined') {
      return (
        window.navigator.vendor &&
        window.navigator.vendor.indexOf('Apple') > -1 &&
        window.navigator.userAgent &&
        window.navigator.userAgent.indexOf('CriOS') === -1 &&
        window.navigator.userAgent.indexOf('FxiOS') === -1
      )
    }
    return null
  }

  const handleScroll = (e) => {
    e.preventDefault()
  }

  React.useEffect(() => {
    if (isSafari()) {
      document.querySelector('html').classList.add(HIDE_SCROLL_IOS)
      document.querySelector('body').classList.add(HIDE_SCROLL_IOS)
      changeView(VIEWPORT_CUSTOM)
    }
    document.body.addEventListener('touchmove', handleScroll, {
      passive: false,
    })
    document.querySelector('html').classList.add(HIDE_SCROLL)
    document.querySelector('body').classList.add(HIDE_SCROLL)
    return () => {
      if (isSafari()) {
        document.querySelector('html').classList.remove(HIDE_SCROLL_IOS)
        document.querySelector('body').classList.remove(HIDE_SCROLL_IOS)
        changeView(VIEWPORT_DEFAULT)
      }
      document.querySelector('html').classList.remove(HIDE_SCROLL)
      document.querySelector('body').classList.remove(HIDE_SCROLL)
      document.body.removeEventListener('touchmove', handleScroll)
    }
  }, [])

  const turnOffFormScroll = () => {
    if (typeof window !== 'undefined') {
      window.document.body.removeEventListener('touchmove', handleScroll)
    }
  }

  const turnOnFormScroll = () => {
    if (typeof window !== 'undefined') {
      window.document.body.removeEventListener('touchmove', handleScroll)
    }
  }

  const style = {
    ...(margin && { margin }),
    ...(padding && { padding }),
    ...(noOverflow && { overflowY: 'initial' }),
  }

  return (
    <Portal id="sign-modal">
      <div className={`signwall-modal open ${bgColor || ''}`}>
        <div
          className={`body-modal position-${position} size-${size} ${
            isTrome ? 'bottom-trome' : ''
          }`}
          style={style}
          onTouchStart={turnOffFormScroll}
          onTouchEnd={turnOnFormScroll}
          /* style={{
            borderRadius: '26px',
            boxShadow: '11px 12px 24px #000',
          }} */
        >
          {children}
        </div>
      </div>
    </Portal>
  )
}

export { Modal }
