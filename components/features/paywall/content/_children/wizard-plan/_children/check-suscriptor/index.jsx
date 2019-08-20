import React from 'react'
import { Formik, Form, Field } from 'formik'
import * as S from './styled'
import { FormSchema, Masks } from './schema'
import InputFormik from '../../../../../_children/input'
import Icon from '../../../../../_children/icon'
import Modal from '../../../../../_children/modal'

export default function CheckSuscription({ onClose, ...props }) {
  let resetForm = React.useRef()
  return (
    <Modal
      onClose={() => {
        resetForm && resetForm()
        onClose()
      }}
      {...props}>
      <S.Panel>
        <S.Content>
          <S.Title>
            VALIDANDO TU SUSCRIPCIÓN AL DIARIO IMPRESO, APROVECHA EL DESCUENTO
            QUE TENEMOS PARA TI:
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
              window.location.href = `/paywall/${documentType}/${documentNumber}?_website=gestion&outputType=paywall`
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

                  <S.Continue disabled={isSubmitting} type="submit">
                    CONTINUAR
                  </S.Continue>
                </Form>
              )
            }}
          />
        </S.WrapDocument>
      </S.Panel>
    </Modal>
  )
}
