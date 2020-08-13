/* eslint-disable react/jsx-filename-extension */
import React, { useEffect } from 'react'
import Portal from './portal'

const MODAL = 'fix-modal'

function Modal({
  children,
  scrollable,
  showClose,
  allowEsc = true,
  onClose = () => {},
  open = true,
  ...props
}) {
  function close() {
    onClose()
  }
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (open) {
        window.document.body.classList.add(MODAL)
      } else {
        window.document.body.classList.remove(MODAL)
      }

      return () => {
        window.document.body.classList.remove(MODAL)
      }
    }
    return ''
  }, [open])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const _onClose = ({ key }) => {
        if (allowEsc && key === 'Escape') {
          close()
        }
      }
      window.addEventListener('keydown', _onClose)
      return () => {
        window.removeEventListener('keydown', _onClose)
      }
    }
    return ''
  }, [])

  //   const childrens = React.Children.map(children, child =>
  //     React.cloneElement(child, { close })
  //   )

  return (
    <Portal id="modal">
      <div className={`modal ${open && 'open-modal'}`} {...props}>
        <div
          role="button"
          className="modal-background"
          //   onClick={() => allowEsc && close()}
        />
        <div className="modal-content" scrollable={scrollable}>
          {children}
        </div>
      </div>
    </Portal>
  )
}

export default Modal
