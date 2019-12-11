/* eslint-disable no-undef */
import React, { useEffect } from 'react'
import { Formik, Field } from 'formik'
import SelectFormik from '../../../_children/select'
import InputFormik from '../../../_children/input'
import Button from '../../../_children/button'
import Error from '../../../_children/error'
import * as S from './styled'
import { createSchema, Masks } from './schema'
import { useStrings } from '../../../_children/contexts'

const { trim } = Masks.Pipes

const Captcha = props => {
  const {
    dataSitekey,
    field: { onChange, onBlur, name, value },
    form,
    meta,
    ...restProps
  } = props

  const captchaResponse = React.useRef(value)
  useEffect(() => {
    window.__gcaptchaResponseCallback = response => {
      onChange(response)
      captchaResponse.current = response
    }
    window.__gcaptchaExpiredCallback = response => {
      onChange(response)
      captchaResponse.current = response
    }
    window.__gcaptchaErrorCallback = response => {
      onChange(response)
      captchaResponse.current = response
    }
  }, [])

  return (
    <div
      className="g-recaptcha"
      data-sitekey={dataSitekey || '6LfEGMcUAAAAAEBWDI6qyRGEc0_KG0XTNBNeeCjv'}
      data-callback="__gcaptchaResponseCallback"
      data-expired-callback="__gcaptchaExpiredCallback"
      data-error-callback="__gcaptchaErrorCallback"
      {...restProps}></div>
  )
}

export default props => {
  const { initialValues, onSubmit, error } = props
  const msgs = useStrings()
  return (
    <Formik
      initialValues={initialValues}
      validate={values => {
        const validations = createSchema(values, msgs)
        const captchaResponse = grecaptcha && grecaptcha.getResponse()
        if (!captchaResponse) validations.captcha = 'Captcha inválido'
        return validations
      }}
      onSubmit={(values, ...args) => {
        const captchaResponse = grecaptcha && grecaptcha.getResponse()
        onSubmit({ ...values, captcha: captchaResponse }, ...args)
      }}>
      {({ isSubmitting, values }) => (
        <S.StyledForm>
          <S.Message>
            {error && <Error mb="20px" message={error} />}
            <S.Description>{msgs.corporateSubscriptionsTitle}</S.Description>
          </S.Message>
          <S.Content>
            <S.ContentRow>
              <S.WrapField>
                <Field
                  name="correo"
                  label={msgs.emailLabel}
                  component={InputFormik}
                />
              </S.WrapField>
              <S.WrapField>
                <Field
                  transform="capitalize"
                  name="nombre"
                  label={msgs.namesLabel}
                  {...Masks.Piped.PERSON_NAME}
                  component={InputFormik}
                />
              </S.WrapField>
              <S.WrapField>
                <Field
                  transform="capitalize"
                  name="apellido"
                  label={msgs.lastNameLabel}
                  {...Masks.Piped.PERSON_NAME}
                  component={InputFormik}
                />
              </S.WrapField>
              <S.WrapField>
                <Field
                  transform="capitalize"
                  name="organizacion"
                  label={msgs.orgLabel}
                  {...Masks.Piped.PERSON_NAME}
                  component={InputFormik}
                />
              </S.WrapField>
              <Field name="captcha" component={Captcha} />
            </S.ContentRow>

            <S.ContentRow>
              <S.WrapField>
                <Field
                  component={SelectFormik}
                  name="tipo_consulta"
                  label={msgs.subscriptionTypeLabel}
                  touched={values.type_subscription}>
                  <option value="">{msgs.subscriptionInquiryType}</option>
                  <option value="1">{msgs.subscriptionType1}</option>
                  <option value="2">{msgs.subscriptionType2}</option>
                  <option value="3">{msgs.subscriptionType3}</option>
                </Field>
              </S.WrapField>
              <S.WrapField>
                <Field
                  name="telefono"
                  inputMode="numeric"
                  pipe={trim()}
                  mask={Masks.PHONE}
                  label={msgs.cellPhoneLabel}
                  component={InputFormik}
                />
              </S.WrapField>
              <S.WrapField>
                <Field
                  multiline
                  name="descripcion"
                  label={msgs.descriptionLabel}
                  mask={new Array(500).fill(/./)}
                  component={InputFormik}
                />
              </S.WrapField>
              <Button type="submit" disabled={isSubmitting}>
                {msgs.sendButton}
              </Button>
            </S.ContentRow>
          </S.Content>
        </S.StyledForm>
      )}
    </Formik>
  )
}
