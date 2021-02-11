import React from 'react'

export default ({ children }) =>
  typeof window !== 'undefined' && <>{children}</>
