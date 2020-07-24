import React from 'react'

const DoubleColumn = ({ children }) => (
  <section className="flex flex-col lg:flex-row-reverse lg:justify-between">
    {children}
  </section>
)

DoubleColumn.label = 'Columna doble'
export default DoubleColumn
