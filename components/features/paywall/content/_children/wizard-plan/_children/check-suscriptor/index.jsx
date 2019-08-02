import React from 'react'
import { Formik, Form, Field } from 'formik'
import * as S from './styled'
import Button from '../../../../../_children/button'
import InputFormik from '../../../../../_children/input'
import Icon from '../../../../../_children/icon'
import schema, { Masks } from '../../../../../_dependencies/schema'

const MESSAGE = {
  REQUIRED: 'Este campo es requerido',
  WRONG_CARD_NUMBER: 'Número tarjeta inválido',
  WRONG_CVV: 'CVV Inválido',
  WRONG_EXPIRY_DATE: 'Fecha incorrecta',
  CHECK_REQUIRED: 'Debe seleccionar el check',
}

export const FormSchema = schema({
  documentNumber: (value, { documentType }) => {
    switch (documentType) {
      default:
      case 'DNI':
        value.required(MESSAGE.REQUIRED).length(8, MESSAGE.DNI)
        break
      case 'CDI':
      case 'CEX':
        value
          .required(MESSAGE.REQUIRED)
          .custom(/^[ A-Za-z0-9-]*$/, MESSAGE.CUSTOM)
          .min(5, MESSAGE.MIN)
          .max(15, MESSAGE.MAX)
        break
    }
  },
})

export default function CheckSuscription() {
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
            <S.SpanFoot>Por los 3 primeros meses.</S.SpanFoot>
            <S.SpanFoot>Luego, S/ 19 cada mes.</S.SpanFoot>
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
          onSubmit={(values, actions) => {}}
          render={({
            setFieldValue,
            isSubmitting,
            values: { documentType },
          }) => {
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

                <Button disabled={isSubmitting} maxWidth="300px" type="submit">
                  CONTINUAR
                </Button>
              </Form>
            )
          }}
        />
      </S.WrapDocument>
    </S.Panel>
  )
}
