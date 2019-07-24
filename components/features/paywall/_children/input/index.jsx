import React, { useState, useEffect, useRef } from 'react'
import vMask from 'vanilla-masker'
import Divider from '../divider'
import * as S from './styled'

const InputFormik = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  placeholder,
  transform = 'none',
  prefix,
  type = 'text',
  ...props
}) => {
  const $el = useRef()
  const { value, onBlur, ...rest } = field
  const [hasText, setHasText] = useState(!!value)

  useEffect(() => {
    vMask($el.current, '99/9999')
    console.log({ $el })
    return () => {}
  })

  const focus = () => {
    if (!hasText) {
      setHasText('__focus')
    }
  }

  const blur = e => {
    onBlur(e)
    const { value } = e.target
    setHasText(!!value)
  }

  const _value = value && type === 'number' ? parseInt(value, 10) : value

  const hasError = touched[field.name] && errors[field.name]
  if (hasError) placeholder = errors[field.name]
  return (
    <S.FormGroup>
      <S.Label hasError={hasError} focus={hasText} prefix={prefix}>
        {placeholder}
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
          {...rest}
          {...props}
        />
      </S.Wrap>
    </S.FormGroup>
  )
}
export default InputFormik
