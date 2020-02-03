// eslint-disable-next-line max-classes-per-file
import React, { Component } from 'react'
import { createPortal } from 'react-dom'
import { WrapperModal, DialogModal } from './styles'

class BodyEnd extends Component {
  constructor(props) {
    super(props)
    this.el = document.createElement('div')
    this.el.id = 'signwall-app'
  }

  componentDidMount() {
    document.body.appendChild(this.el)
  }

  componentWillUnmount() {
    document.body.removeChild(this.el)
  }

  render() {
    const { children } = this.props
    return createPortal(children, this.el)
  }
}

class Modal extends Component {
  changeView = rule => {
    const view = document.querySelector('meta[name=viewport]')
    if (view) view.remove()
    const meta = document.createElement('meta')
    meta.name = 'viewport'
    meta.content = rule
    document.getElementsByTagName('head')[0].appendChild(meta)
  }

  isSafari = () => {
    return (
      window.navigator.vendor &&
      window.navigator.vendor.indexOf('Apple') > -1 &&
      window.navigator.userAgent &&
      window.navigator.userAgent.indexOf('CriOS') === -1 &&
      window.navigator.userAgent.indexOf('FxiOS') === -1
    )
  }

  handleScroll = (e) => {
    e.preventDefault();
  }

  componentDidMount = () => {
    if (this.isSafari()) {
      document.querySelector('html').classList.add('overflow-hidden-ios')
      document.querySelector('body').classList.add('overflow-hidden-ios')
      this.changeView(
        'width=device-width, initial-scale=1, user-scalable=0, shrink-to-fit=no'
      )
    }
    document.body.addEventListener('touchmove', this.handleScroll, { passive: false})
    document.querySelector('html').classList.add('overflow-hidden')
    document.querySelector('body').classList.add('overflow-hidden')
  }

  componentWillUnmount = () => {
    if (this.isSafari()) {
      document.querySelector('html').classList.remove('overflow-hidden-ios')
      document.querySelector('body').classList.remove('overflow-hidden-ios')
      this.changeView('width=device-width, initial-scale=1')
    }
    document.querySelector('html').classList.remove('overflow-hidden')
    document.querySelector('body').classList.remove('overflow-hidden')
    document.body.removeEventListener(this.handleScroll);
  }

  render() {
    const { bgColor, position, size, name, color, id, children } = this.props
    return (
      // eslint-disable-next-line react/jsx-filename-extension
      <BodyEnd>
        <WrapperModal className="open" bgColor={bgColor}>
          <DialogModal
            className={`position-${position} size-${size}`}
            heading={name}
            noborderRa
            size={size}
            style={{ backgroundColor: color }}
            id={id}
            name={name}>
            {children}
          </DialogModal>
        </WrapperModal>
      </BodyEnd>
    )
  }
}

export { Modal }
