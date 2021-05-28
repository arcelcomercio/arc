import * as React from 'react'

import Portal from '../../../subscriptions/_children/modal/portal'

const HIDE_SCROLL = 'overflow-hidden'
const HIDE_SCROLL_IOS = 'overflow-hidden-ios'
const VIEWPORT_DEFAULT = 'width=device-width, initial-scale=1'
const VIEWPORT_CUSTOM = `${VIEWPORT_DEFAULT}, user-scalable=0, shrink-to-fit=no`

const Modal = ({ bgColor, position, size, children }) => {
  const changeView = (rule) => {
    const view = window.document.querySelector('meta[name=viewport]')
    if (view) view.remove()
    const meta = window.document.createElement('meta')
    meta.name = 'viewport'
    meta.content = rule
    window.document.getElementsByTagName('head')[0].appendChild(meta)
  }

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

  return (
    <Portal id="sign-modal">
      <div className={`signwall-modal open ${bgColor}`}>
        <div
          className={`body-modal position-${position} size-${size}`}
          onTouchStart={turnOffFormScroll}
          onTouchEnd={turnOnFormScroll}>
          {children}
        </div>
      </div>
    </Portal>
  )
}

export { Modal }
