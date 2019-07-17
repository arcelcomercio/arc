import React from 'react'
import * as S from './styled'

const RadioButton = ({
  field: { name, value, onChange, onBlur },
  valueCheck,
  label,
  className,
  ...props
}) => {
  return (
    <S.Label>
      <input
        style={{ display: 'none' }}
        name={name}
        type="radio"
        value={valueCheck}
        checked={valueCheck === value}
        onChange={onChange}
        onBlur={onBlur}
        {...props}
      />
      <S.StyledCheckbox checked={valueCheck === value}>
        <S.Svg viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12" />
        </S.Svg>
      </S.StyledCheckbox>
      {label}
    </S.Label>
  )
}

export default RadioButton
