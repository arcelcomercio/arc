import * as React from 'react'
import { createPortal } from 'react-dom'

interface PortalProps {
  id: string
  children: React.ReactNode
}

const Portal: React.FC<PortalProps> = ({ id, children }) => {
  const el = React.useRef<HTMLElement | null>(null)
  const [linkedElement, setLinkedElement] = React.useState(false)

  React.useEffect(() => {
    el.current = document.getElementById(id) || document.createElement('div')
    const dynamicElement = el.current && !el.current.parentElement

    if (dynamicElement) {
      el.current.id = id
      document.body.appendChild(el.current)
    }

    if (!linkedElement) setLinkedElement(true)

    return () => {
      if (dynamicElement) {
        el.current?.parentElement?.removeChild(el.current)
      }
    }
  }, [id])

  return children && el.current ? createPortal(children, el.current) : null
}

export default React.memo(Portal)
