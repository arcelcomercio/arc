import React, { useRef, useEffect } from 'react'
import * as S from './styled'

const Select = ({
  field: { value, ...attrs }, // { name, value, onChange, onBlur }
  change = () => {},
  ...props
}) => {
  const el = useRef(null)

  const _change = e => {
    change(e)
  }

  useEffect(() => {
    el.current.addEventListener('change', _change)
    return () => {
      el.current.removeEventListener('change', _change)
    }
  })

  return (
    <S.Select ref={el} defaultValue={value} {...props} {...attrs}>
      <option value="DNI">DNI</option>
      <option value="CEX">CEX</option>
      <option value="CDI">CDI</option>
    </S.Select>
  )
}

export default Select
