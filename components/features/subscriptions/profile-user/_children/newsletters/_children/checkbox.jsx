import React from 'react'

const Checkbox = ({ checked, disabled, name, site, image, ...props }) => (
  <div className="sign-profile_checkbox-container">
    <div
      className="sign-profile_checkbox-image"
      style={{
        backgroundImage: `url(${image})`,
      }}
    />
    <div
      className={`sign-profile_checkbox-cover ${
        checked ? 'active' : 'inactive'
      }`}
    />
    <input
      type="checkbox"
      className="sign-profile_checkbox-check"
      checked={checked}
      disabled={disabled}
      {...props}
    />
    <div
      className={`sign-profile_checkbox-box ${
        checked ? 'active' : 'inactive'
      }`}>
      <svg className="sign-profile_checkbox-icon" viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </div>
  </div>
)

export default Checkbox
