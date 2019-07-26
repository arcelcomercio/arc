import React from 'react'
import * as S from './styled'

const Checkbox = ({
  field: { name, value, onChange, onBlur },
  form: { touched, errors },
  radio,
  label,
  checked,
  className,
  ...props
}) => {
  const hasError = touched[name] && errors[name]
  return (
    <S.Label className={className}>
      <input
        style={{ display: 'none' }}
        name={name}
        value={value}
        type={radio ? 'radio' : 'checkbox'}
        checked={checked}
        onChange={onChange}
        onBlur={onBlur}
        {...props}
      />
      <S.StyledCheckbox hasError={hasError} checked={checked}>
        <S.Svg width="18" height="18" viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12" />
        </S.Svg>
      </S.StyledCheckbox>
      {label}
    </S.Label>
  )
}

export default Checkbox
