import React from 'react'
import { Formik, Field } from 'formik'
import SelectFormik from '../../../_children/select'
import InputFormik from '../../../_children/input'
import Button from '../../../_children/button'
import Error from '../../../_children/error'
import * as S from './styled'
import { createSchema, Masks } from './schema'
import { useStrings } from '../../../_children/contexts'

const { trim } = Masks.Pipes

export default props => {
  const { initialValues, onSubmit, error } = props
  const msgs = useStrings()
  return (
    <Formik
      initialValues={initialValues}
      validate={values => createSchema(values, msgs)}
      onSubmit={onSubmit}>
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
            </S.ContentRow>

            <S.ContentRow>
              <S.WrapField>
                <Field
                  component={SelectFormik}
                  name="tipo_consulta"
                  label={msgs.subscriptionTypeLabel}
                  touched={values.type_subscription}>
                  <option value="">Tipo de consulta de suscripción</option>
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
