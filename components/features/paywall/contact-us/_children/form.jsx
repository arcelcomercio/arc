import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import InputFormik from '../../_children/input'
import Button from '../../_children/button'
import Error from '../../_children/error'
import { WrapField, ContentRow } from '../_dependencies/styled'
import { FormSchema, Masks, MESSAGE } from '../_dependencies/schema'

export default props => {
  const { initialValues, submitForm, error } = props
  console.log('window', window.location.host)
  return (
    <Formik
      initialValues={initialValues}
      validate={values => new FormSchema(values)}
      onSubmit={submitForm}>
      {({ isSubmitting }) => (
        <Form className="paywall-contact-us__form">
          <div className="paywall-contact-us__message">
            {error && <Error mb="20px" message={error} />}
            <div className="paywall-contact-us__description">
              Por favor envíanos tus datos para brindarte información sobre
              nuestras suscripciones corporativas.
            </div>
          </div>
          <div className="paywall-contact-us__content">
            <div className="paywall-contact-us__content-row">
              <WrapField>
                <Field
                  name="email"
                  label="Correo Electrónico"
                  component={InputFormik}
                />
              </WrapField>
              <WrapField>
                <Field
                  transform="capitalize"
                  name="name"
                  label="Nombres"
                  mask={Masks.PERSON_NAME}
                  component={InputFormik}
                />
              </WrapField>
              <WrapField>
                <Field
                  transform="capitalize"
                  name="lastname"
                  label="Apellidos"
                  mask={Masks.PERSON_NAME}
                  component={InputFormik}
                />
              </WrapField>
              <WrapField>
                <Field
                  transform="capitalize"
                  name="company_name"
                  label="Organización"
                  mask={Masks.PERSON_NAME}
                  component={InputFormik}
                />
              </WrapField>
            </div>

            <div className="paywall-contact-us__content-row">
              <WrapField>
                <Field
                  className="paywall-contact-us__field"
                  component="select"
                  name="type_subscription"
                  label="Tipo de subscripción">
                  <option value="0">Tipo de consulta de suscripción</option>
                  <option value="1">tipo 1</option>
                  <option value="2">tipo 2</option>
                  <option value="3">tipo 3</option>
                </Field>
              </WrapField>
              <WrapField>
                <Field
                  transform="capitalize"
                  name="subject"
                  label="Asunto"
                  component={InputFormik}
                />
              </WrapField>
              <WrapField>
                <Field
                  className="paywall-contact-us__field"
                  name="description"
                  label="Descripción"
                  component={InputFormik}
                />
              </WrapField>
              <Button
                type="submit"
                disabled={isSubmitting}>
                Enviar
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  )
}
