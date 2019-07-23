import React from 'react'
import * as S from './styled'

const Checkbox = ({
  field: { name, value },
  radio,
  label,
  checked,
  className,
  ...props
}) => {
  return (
    <S.Label>
      <input
        style={{ display: 'none' }}
        name={name}
        value={value}
        type={radio ? 'radio' : 'checkbox'}
        checked={checked}
        {...props}
      />
      <S.StyledCheckbox checked={checked}>
        <S.Svg width="18" height="18" viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12" />
        </S.Svg>
      </S.StyledCheckbox>
      {label}
    </S.Label>
  )
}

export default Checkbox
