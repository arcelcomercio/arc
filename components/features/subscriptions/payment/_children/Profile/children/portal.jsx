import { memo, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

const Portal = ({ id, children }) => {
  let defaultRef = null

  if (typeof window !== 'undefined')
    defaultRef = document.getElementById(id) || document.createElement('div')

  const el = useRef(defaultRef)
  const [dynamic] = useState(el.current && !el.current.parentElement)

  useEffect(() => {
    if (dynamic) {
      el.current.id = id
      document.body.appendChild(el.current)
    }
    return () => {
      if (dynamic && el.current.parentElement) {
        el.current.parentElement.removeChild(el.current)
      }
    }
  }, [id])

  return children && el.current && createPortal(children, el.current)
}

export default memo(Portal)
