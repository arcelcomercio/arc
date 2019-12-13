/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { spacing, flexbox, sizing } from '@material-ui/system'

import { Formik, Field, Form } from 'formik'
import SelectFormik from '../../../_children/select'
import InputFormik from '../../../_children/input'
import Captcha from '../../../_children/captcha'
import Button from '../../../_children/button'
import Error from '../../../_children/error'
import { createSchema, Masks } from './schema'
import { useStrings } from '../../../_children/contexts'

const { trim } = Masks.Pipes

const Flex = styled.div`
  display: flex;
  ${spacing}
  ${flexbox}
  ${sizing}
`

const StyledForm = styled(Form)`
  display: flex;
  ${spacing}
  ${flexbox}
  ${sizing}
`

const Description = styled.div`
  font-family: Open Sans;
  font-size: 14px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.88;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
`

export default props => {
  const { initialValues, onSubmit, error } = props
  const msgs = useStrings()
  const validateCaptcha = React.useRef(false)
  const [captchaError, setCaptchaError] = useState('')
  return (
    <Formik
      initialValues={initialValues}
      validate={values => {
        const validations = createSchema(values, msgs)
        const captchaResponse = grecaptcha && grecaptcha.getResponse()
        if (!captchaResponse) {
          validations.captcha = msgs.checkRequired
          setCaptchaError(
            validateCaptcha.current ? validations.captcha : undefined
          )
        } else {
          setCaptchaError()
        }
        validateCaptcha.current = false
        return validations
      }}
      onSubmit={(values, ...args) => {
        const captchaResponse = grecaptcha && grecaptcha.getResponse()
        onSubmit({ ...values, captcha: captchaResponse }, ...args)
      }}>
      {({ isSubmitting, validateForm, values }) => (
        <StyledForm width="100%" alignItems="center" justifyContent="center">
          <Flex
            flexDirection="column"
            py="2em"
            px={{ xs: '2em', sm: '7em', md: '2em' }}>
            <Flex p="30px 10px" flexDirection="column">
              {error && <Error mb="4px" message={error} />}
              <Description>{msgs.corporateSubscriptionsTitle}</Description>
            </Flex>
            <Flex flexDirection={{ xs: 'column', sm: 'row' }}>
              <Flex
                flexDirection="column"
                mr={{ xs: '0px', sm: '20px' }}
                flex={1 / 2}>
                <Field
                  name="correo"
                  label={msgs.emailLabel}
                  component={InputFormik}
                />
                <Field
                  transform="capitalize"
                  name="nombre"
                  label={msgs.namesLabel}
                  {...Masks.Piped.PERSON_NAME}
                  component={InputFormik}
                />
                <Field
                  transform="capitalize"
                  name="apellido"
                  label={msgs.lastNameLabel}
                  {...Masks.Piped.PERSON_NAME}
                  component={InputFormik}
                />
                <Field
                  transform="capitalize"
                  name="organizacion"
                  label={msgs.orgLabel}
                  {...Masks.Piped.PERSON_NAME}
                  component={InputFormik}
                />
              </Flex>

              <Flex flexDirection="column" flex={1 / 2}>
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
                <Field
                  name="telefono"
                  inputMode="numeric"
                  pipe={trim()}
                  mask={Masks.PHONE}
                  label={msgs.cellPhoneLabel}
                  component={InputFormik}
                />
                <Field
                  multiline
                  name="descripcion"
                  label={msgs.descriptionLabel}
                  mask={new Array(500).fill(/./)}
                  component={InputFormik}
                />
              </Flex>
            </Flex>
            <Flex
              flexDirection={{ xs: 'column', sm: 'row' }}
              justifyContent="center"
              alignItems="center">
              <Flex flex={1} mr="20px">
                <Field
                  name="captcha"
                  onChange={() => {
                    validateCaptcha.current = true
                    validateForm()
                  }}
                  component={Captcha}
                  error={captchaError}
                />
              </Flex>
              <Flex flex={1} width="100%" mt={{ xs: '30px', sm: '0px' }}>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  onClick={() => (validateCaptcha.current = true)}>
                  {msgs.sendButton}
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </StyledForm>
      )}
    </Formik>
  )
}
