import React, { useEffect, useState } from 'react'
import { useFusionContext } from 'fusion:context'
import { Formik, Form, Field } from 'formik'
import * as Sentry from '@sentry/browser'
import Markdown from '../../../../../_children/markdown'

import * as S from './styled'
import { createSchema, Masks } from './schema'
import InputFormik from '../../../../../_children/input'
import Icon from '../../../../../_children/icon'
import Modal from '../../../../../_children/modal'
import { interpolateUrl } from '../../../../../_dependencies/domains'
import { useStrings } from '../../../../../_children/contexts'

const Content = ({ onSubmit }) => {
  const msgs = useStrings()
  const [attemptToken, setAttemptToken] = useState()
  const {
    siteProperties: {
      paywall: { urls },
    },
  } = useFusionContext()
  let resetForm = React.useRef()

  useEffect(() => {
    const url = interpolateUrl(urls.originSubscriptionOnlineToken)
    window.Identity.extendSession()
      .then(resExt => {
        const CheckDNI = fetch(url, {
          method: 'POST',
          headers: new Headers({
            'Content-Type': 'application/json',
            'user-token': resExt.accessToken,
          }),
        })
          .then(res => {
            if (res.ok) {
              res.json().then(({ token }) => {
                setAttemptToken(token)
              })
            } else {
              const msg = `Status de la peticion a "${url}" no es 200 sino ${
                res.status
              }`
              const err = new Error(msg)
              Sentry.captureException(err)
            }
          })
          .catch(err => {
            Sentry.captureException(err)
          })

        return CheckDNI
      })
      .catch(errExt => {
        Sentry.captureException(errExt)
      })

    return () => resetForm && resetForm()
  }, [])

  return (
    <S.Panel>
      <S.Content>
        <S.Title>
          <Markdown source={msgs.idCheckingDescription} />
        </S.Title>
        <S.Wrapbenefit>
          <S.SpanIcon>
            <Icon type="check" /> <Markdown source={msgs.featureDescription1} />
          </S.SpanIcon>
          <S.Free>{msgs.freeAmount}</S.Free>
        </S.Wrapbenefit>
        <S.Foot>
          <S.FootContent>
            <S.SpanFoot title>{msgs.initialOffer}</S.SpanFoot>
            <S.SpanFoot>{msgs.regularOffer}</S.SpanFoot>
          </S.FootContent>
          {/* <S.FootContent>
            <S.SpanFoot>Precio Regular: S/ 29 al mes</S.SpanFoot>
          </S.FootContent> */}
        </S.Foot>
      </S.Content>
      <S.Divider />
      <S.WrapDocument>
        <strong>{msgs.insertDocument}</strong>
        <Formik
          validate={values => createSchema(values, msgs)}
          initialValues={{ documentType: 'DNI', documentNumber: null }}
          onSubmit={({ documentType, documentNumber }, ...args) => {
            onSubmit({ documentType, documentNumber, attemptToken }, ...args)
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
                  label={msgs.documentNumberLabel}
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

export default function CheckSuscription({ onClose, onSubmit, ...props }) {
  return (
    <Modal showClose onClose={onClose} {...props}>
      <Content onSubmit={onSubmit} />
    </Modal>
  )
}
