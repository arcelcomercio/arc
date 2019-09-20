import React from 'react'
import { Formik, Field } from 'formik'
import SelectFormik from '../../../_children/select'
import InputFormik from '../../../_children/input'
import Button from '../../../_children/button'
import Error from '../../../_children/error'
import * as S from './styled'
import { FormSchema, Masks } from './schema'

const { trim } = Masks.Pipes

export default props => {
  const { initialValues, onSubmit, error } = props

  return (
    <Formik
      initialValues={initialValues}
      validate={values => new FormSchema(values)}
      onSubmit={onSubmit}>
      {({ isSubmitting, values }) => (
        <S.StyledForm>
          <S.Message>
            {error && <Error mb="20px" message={error} />}
            <S.Description>
              Por favor envíanos tus datos para brindarte información sobre
              nuestras suscripciones corporativas.
            </S.Description>
          </S.Message>
          <S.Content>
            <S.ContentRow>
              <S.WrapField>
                <Field
                  name="correo"
                  label="Correo Electrónico"
                  component={InputFormik}
                />
              </S.WrapField>
              <S.WrapField>
                <Field
                  transform="capitalize"
                  name="nombre"
                  label="Nombres"
                  {...Masks.Piped.PERSON_NAME}
                  component={InputFormik}
                />
              </S.WrapField>
              <S.WrapField>
                <Field
                  transform="capitalize"
                  name="apellido"
                  label="Apellidos"
                  {...Masks.Piped.PERSON_NAME}
                  component={InputFormik}
                />
              </S.WrapField>
              <S.WrapField>
                <Field
                  transform="capitalize"
                  name="organizacion"
                  label="Organización"
                  {...Masks.Piped.PERSON_NAME}
                  component={InputFormik}
                />
              </S.WrapField>
            </S.ContentRow>

            <S.ContentRow>
              <S.WrapField>
                <Field
                  component={SelectFormik}
                  name="tipo_consulta"
                  label="Tipo de subscripción"
                  touched={values.type_subscription}>
                  <option value="">Tipo de consulta de suscripción</option>
                  <option value="1">Quiero una suscripción</option>
                  <option value="2">Tengo una suscripción</option>
                  <option value="3">Otros</option>
                </Field>
              </S.WrapField>
              <S.WrapField>
                <Field
                  name="telefono"
                  inputMode="numeric"
                  pipe={trim()}
                  mask={Masks.PHONE}
                  label="Número de Celular"
                  component={InputFormik}
                />
              </S.WrapField>
              <S.WrapField>
                <Field
                  multiline
                  name="descripcion"
                  label="Descripción"
                  mask={new Array(500).fill(/./)}
                  component={InputFormik}
                />
              </S.WrapField>
              <Button type="submit" disabled={isSubmitting}>
                Enviar
              </Button>
            </S.ContentRow>
          </S.Content>
        </S.StyledForm>
      )}
    </Formik>
  )
}
