import * as React from 'react'
import customFields from './_dependencies/custom-fields'

const SeparatedColumns = ({ children, customFields: { reverseDesktop } }) => (
  <section
    className={`flex flex-col lg:justify-between ${
      reverseDesktop ? 'lg:flex-row-reverse' : ''
    }`}>
    {children}
  </section>
)

SeparatedColumns.propTypes = {
  customFields,
}

SeparatedColumns.label = 'Columnas separadas'
export default SeparatedColumns
