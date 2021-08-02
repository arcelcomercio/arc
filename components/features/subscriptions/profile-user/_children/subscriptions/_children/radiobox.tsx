import * as React from 'react'

interface RadioboxCommonProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
  checked: boolean
  disabled?: boolean
}
interface RadioboxProps extends RadioboxCommonProps {
  image: string
}

interface RadioboxSimpleProps extends RadioboxCommonProps {
  name: string
}

const Radiobox = ({
  className,
  checked,
  disabled,
  image,
  ...props
}: RadioboxProps): JSX.Element => (
  <div className="sign-profile_radiobox-container">
    <div
      className="sign-profile_radiobox-image"
      style={{
        backgroundImage: `url(${image})`,
      }}
    />
    <input
      {...props}
      className="sign-profile_radiobox-check"
      type="checkbox"
      checked={checked}
      disabled={disabled}
    />
    <div
      className={`sign-profile_radiobox-box  ${
        checked ? 'active' : 'inactive'
      }`}>
      <svg className="sign-profile_radiobox-icon" viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </div>
  </div>
)

const RadioboxSimple = ({
  className,
  checked,
  disabled,
  name,
  ...props
}: RadioboxSimpleProps): JSX.Element => (
  <div className="sign-profile_radiobox-container full">
    <span>{name}</span>
    <input
      type="checkbox"
      className="sign-profile_radiobox-check"
      checked={checked}
      disabled={disabled}
      {...props}
    />
    <div
      className={`sign-profile_radiobox-box full ${
        checked ? 'active' : 'inactive'
      }`}>
      <svg className="sign-profile_radiobox-icon" viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </div>
  </div>
)

export { Radiobox, RadioboxSimple }
