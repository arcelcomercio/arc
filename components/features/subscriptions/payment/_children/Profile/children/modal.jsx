import * as React from 'react'

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
  React.useEffect(() => {
    if (open) {
      window.document.body.classList.add(MODAL)
    } else {
      window.document.body.classList.remove(MODAL)
    }

    return () => {
      window.document.body.classList.remove(MODAL)
    }
  }, [open])

  React.useEffect(() => {
    function close() {
      onClose()
    }

    const _onClose = ({ key }) => {
      if (allowEsc && key === 'Escape') {
        close()
      }
    }
    window.addEventListener('keydown', _onClose)
    return () => {
      window.removeEventListener('keydown', _onClose)
    }
  }, [])

  return (
    <Portal id="modal">
      <div className={`modal ${open && 'open-modal'}`} {...props}>
        <div className="modal-background" />
        <div className="modal-content" scrollable={scrollable}>
          {children}
        </div>
      </div>
    </Portal>
  )
}

export default Modal
