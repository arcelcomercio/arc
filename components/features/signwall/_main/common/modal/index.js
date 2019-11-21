// eslint-disable-next-line max-classes-per-file
import React, { Component } from 'react'
import { createPortal } from 'react-dom'
import { WrapperModal, DialogModal } from './styles'

const ISSAFARI =
  window.navigator.vendor &&
  window.navigator.vendor.indexOf('Apple') > -1 &&
  window.navigator.userAgent &&
  window.navigator.userAgent.indexOf('CriOS') === -1 &&
  window.navigator.userAgent.indexOf('FxiOS') === -1

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
  componentDidMount = () => {
    if (ISSAFARI) {
      document.querySelector('html').classList.add('overflow-hidden-ios')
      document.querySelector('body').classList.add('overflow-hidden-ios')
    }
    document.querySelector('html').classList.add('overflow-hidden')
    document.querySelector('body').classList.add('overflow-hidden')
  }

  componentWillUnmount = () => {
    if (ISSAFARI) {
      document.querySelector('html').classList.remove('overflow-hidden-ios')
      document.querySelector('body').classList.remove('overflow-hidden-ios')
    }
    document.querySelector('html').classList.remove('overflow-hidden')
    document.querySelector('body').classList.remove('overflow-hidden')
  }

  render() {
    const { bg, position, size, name, color, id, children } = this.props
    return (
      // eslint-disable-next-line react/jsx-filename-extension
      <BodyEnd>
        {/* <WrapperModal className="white"> */}
        <WrapperModal className="open">
          <DialogModal
            className={`position-middle size-${size}`}
            heading={name}
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
