import React, { useEffect } from 'react'

function Beforeunload({ children, onBeforeunload = () => {} }) {
  if (typeof onBeforeunload !== 'function') {
    throw new TypeError(
      `Expected "onBeforeunload" to be a function, not ${typeof handler}.`
    )
  }

  useEffect(() => {
    const handleBeforeUnload = event => {
      let returnValue
      if (typeof onBeforeunload === 'function') {
        returnValue = onBeforeunload(event)
      }
      if (typeof returnValue === 'string') {
        event.returnValue = returnValue
        return returnValue
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])
  return children
}

export default Beforeunload
