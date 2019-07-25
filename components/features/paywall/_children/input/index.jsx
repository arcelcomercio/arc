import React, { useState, useEffect, useRef } from 'react'
import vMask from './vanilla-masker'
import Divider from '../divider'
import * as S from './styled'

const InputFormik = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  placeholder,
  label,
  transform = 'none',
  prefix,
  sufix,
  type = 'text',
  mask,
  ...props
}) => {
  const $el = useRef()
  const { value, onBlur, ...rest } = field
  const [hasText, setHasText] = useState(!!value)

  if (mask) {
    useEffect(() => {
      window.vMask = vMask
      vMask($el.current).maskPattern(mask)
      return () => {}
    })
  }

  const focus = () => {
    if (!hasText) {
      setHasText('__focus')
    }
  }

  const blur = e => {
    onBlur(e)
    const { value: _value } = e.target
    setHasText(!!_value)
  }

  const _value = value && type === 'number' ? parseInt(value, 10) : value

  const hasError = touched[field.name] && errors[field.name]

  return (
    <S.FormGroup>
      <S.Label
        hasError={hasError}
        focus={hasText || !!placeholder}
        prefix={prefix}>
        {label}
      </S.Label>
      <S.Wrap hasError={hasError}>
        {prefix ? [prefix, <Divider key="divider" />] : false}
        <S.Input
          ref={$el}
          transform={transform}
          type={type}
          defaultValue={_value}
          onFocus={focus}
          onBlur={blur}
          mask={mask}
          placeholder={placeholder}
          {...rest}
          {...props}
        />
        {sufix && sufix}
      </S.Wrap>
      <S.Error>{hasError && errors[field.name]}</S.Error>
    </S.FormGroup>
  )
}
export default InputFormik
