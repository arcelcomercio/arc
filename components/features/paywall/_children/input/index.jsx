import React from 'react'
import Divider from '../divider'
import * as S from './styled'

const InputFormik = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  placeholder,
  label,
  transform = 'none',
  prefix,
  suffix,
  mask,
  type = 'text',
  ...props
}) => {
  const { value, name } = field
  const Input = mask ? S.InputMask : S.Input
  const hasError = touched[name] && errors[name]
  return (
    <S.FormGroup>
      <S.Label
        hasError={hasError}
        focus={!!value || !!placeholder}
        prefix={prefix}>
        {label}
      </S.Label>
      <S.Wrap hasError={hasError}>
        <S.Prefix>
          {prefix ? [prefix, <Divider key="divider" />] : false}
        </S.Prefix>
        <S.WrapInput>
          <Input
            transform={transform}
            type={type}
            placeholder={placeholder}
            mask={mask}
            {...field}
            {...props}
          />
        </S.WrapInput>
        <S.Prefix>{suffix && suffix}</S.Prefix>
      </S.Wrap>
      <S.Error>{hasError && errors[name]}</S.Error>
    </S.FormGroup>
  )
}
export default InputFormik
