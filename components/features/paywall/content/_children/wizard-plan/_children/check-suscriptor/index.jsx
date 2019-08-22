import React, { useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik'
import * as S from './styled'
import { FormSchema, Masks } from './schema'
import InputFormik from '../../../../../_children/input'
import Icon from '../../../../../_children/icon'
import Modal from '../../../../../_children/modal'
import getDomain from '../../../../../_dependencies/domains'
import Sentry from '../../../../../_dependencies/sentry'

const Content = props => {
  const [attemptToken, setAttemptToken] = useState()
  let resetForm = React.useRef()

  useEffect(() => {
    const url = getDomain('ORIGIN_SUBSCRIPTION_ONLINE_TOKEN')
    fetch(url, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        'user-token': window.Identity.userIdentity.accessToken,
      }),
    })
      .then(res => {
        if (res.ok) {
          res.json().then(({ token }) => {
            setAttemptToken(token)
          })
        } else {
          const msg = `Estado de peticion a ${url} no es 200 sino ${res.status}`
          const err = new Error(msg)
          Sentry.captureException(err)
        }
      })
      .catch(err => {
        Sentry.captureException(err)
      })
    return () => resetForm && resetForm()
  }, [])

  return (
    <S.Panel>
      <S.Content>
        <S.Title>
          VALIDANDO TU SUSCRIPCIÓN AL DIARIO IMPRESO, APROVECHA EL DESCUENTO QUE
          TENEMOS PARA TI:
        </S.Title>
        <S.Wrapbenefit>
          <S.SpanIcon>
            <Icon type="check" /> Beneficio especial para suscriptores
          </S.SpanIcon>
          <S.Free>GRATIS</S.Free>
        </S.Wrapbenefit>
        <S.Foot>
          <S.FootContent>
            <S.SpanFoot>
              por los 3 primeros meses.
              <br />
              Luego, S/ 19 cada mes.
            </S.SpanFoot>
          </S.FootContent>
          <S.FootContent>
            <S.SpanFoot>Precio Regular: S/ 29.00 al mes</S.SpanFoot>
          </S.FootContent>
        </S.Foot>
      </S.Content>
      <S.Divider />
      <S.WrapDocument>
        <strong>Ingresa tu Documento</strong>
        <Formik
          validate={values => new FormSchema(values)}
          initialValues={{ documentType: 'DNI', documentNumber: null }}
          onSubmit={({ documentType, documentNumber }, actions) => {
            window.location.href = getDomain("VALIDATE_SUSCRIPTOR", documentType, documentNumber, attemptToken)
          }}
          render={({
            resetForm: _resetForm,
            setFieldValue,
            isSubmitting,
            values: { documentType },
          }) => {
            resetForm = _resetForm
            return (
              <Form>
                <Field
                  name="documentNumber"
                  label="Número de documento"
                  mask={Masks[documentType.toUpperCase()]}
                  type="text"
                  prefix={
                    <Field
                      name="documentType"
                      key="select"
                      component={({
                        field: { onChange, ...restField },
                        ...restProps
                      }) => (
                        <S.Select
                          onChange={(...args) => {
                            setFieldValue('documentNumber', '')
                            onChange(...args)
                          }}
                          {...restField}
                          {...restProps}>
                          <option value="DNI">DNI</option>
                          <option value="CEX">CEX</option>
                          <option value="CDI">CDI</option>
                        </S.Select>
                      )}
                    />
                  }
                  component={InputFormik}
                />

                <S.Continue
                  disabled={isSubmitting || !attemptToken}
                  type="submit">
                  CONTINUAR
                </S.Continue>
              </Form>
            )
          }}
        />
      </S.WrapDocument>
    </S.Panel>
  )
}

export default function CheckSuscription({ onClose, ...props }) {
  return (
    <Modal showClose onClose={onClose} {...props}>
      <Content />
    </Modal>
  )
}
