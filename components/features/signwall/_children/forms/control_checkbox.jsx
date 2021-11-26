/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'

export const CheckBox = ({
  defaultBorder,
  checked,
  value,
  name,
  onChange,
  valid,
  error,
  children,
  arcSite,
}) => (
  <label className="signwall-inside_forms-checkbox">
    <input
      type="checkbox"
      name={name}
      checked={checked}
      value={value}
      onChange={onChange}
      required={valid}
      error={error}
    />

    {children}

    <span className={error && 'error'}>{error}</span>
    
    <span className={(error ? 'error checkmark' : defaultBorder||(`checkmark ${arcSite}`))} />
    
  </label>
)
