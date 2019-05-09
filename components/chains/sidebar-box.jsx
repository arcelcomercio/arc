import React from 'react'

const SidebarBox = ({ children = [] }) => (
  <sidebar className="col-1">{children}</sidebar>
)

SidebarBox.label = 'Barra lateral'

export default SidebarBox
