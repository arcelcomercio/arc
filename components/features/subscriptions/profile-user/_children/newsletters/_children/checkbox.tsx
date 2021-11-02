import * as React from 'react'
import { ArcSite } from 'types/fusion'

interface CheckboxProps {
  checked: boolean
  disabled: boolean
  name: string
  arcSite: ArcSite
  image: string
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  disabled,
  name,
  arcSite,
  image,
  ...props
}) => (
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
