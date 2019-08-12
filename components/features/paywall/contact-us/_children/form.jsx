import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import InputFormik from '../../_children/input'
import Button from '../../_children/button'
import { WrapField, ContentRow } from '../_dependencies/styled'
import { FormSchema, Masks, MESSAGE } from '../_dependencies/schema'

export default props => {
  const {showThanks} = props
  const initialValues = {
    email: '',
    name: '',
    lastname: '',
    company_name: '',
    type_subscription: 0,
    subject: '',
    description: '',
  }

  let error = ''

  const submitForm = (values, { setSubmitting }) => {
    console.log('values', values)
    const fetchApi = () => {
      //code
      return true
    }
    if (fetchApi()) {
      showThanks(true)
    } else {
      error = MESSAGE.API_ERROR
    }
    setSubmitting(false)
  }

  return (
    <Formik
      initialValues={initialValues}
      validate={values => new FormSchema(values)}
      onSubmit={submitForm}>
      {({ isSubmitting }) => (
        <Form className="paywall-contact-us__form">
          <div className="paywall-contact-us__message">
            <div className="paywall-contact-us__error">{error}erorr</div>
            <div className="paywall-contact-us__description">
              Por favor envíanos tus datos para brindarte información sobre
              nuestras suscripciones corporativas.
            </div>
          </div>
          <div className="paywall-contact-us__content">
            <div className="paywall-contact-us__content-row">
              <Field
                className="paywall-contact-us__field"
                name="email"
                label="Correo Electrónico"
                placeholder="Correo Electrónico"
              />
              <ErrorMessage name="email" component="div" />
              <Field
                className="paywall-contact-us__field"
                transform="capitalize"
                name="name"
                label="Nombres"
                placeholder="Nombres"
                mask={Masks.PERSON_NAME}
              />
              <ErrorMessage name="name" component="div" />
              <Field
                className="paywall-contact-us__field"
                transform="capitalize"
                name="lastname"
                label="Apellidos"
                placeholder="Apellidos"
                mask={Masks.PERSON_NAME}
              />
              <Field
                className="paywall-contact-us__field"
                transform="capitalize"
                name="company_name"
                label="Organización"
                placeholder="Organización"
                mask={Masks.PERSON_NAME}
              />
            </div>

            <div className="paywall-contact-us__content-row">
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
              <Field
                className="paywall-contact-us__field"
                transform="capitalize"
                name="subject"
                label="Asunto"
                placeholder="Asunto"
                mask={Masks.PERSON_NAME}
              />
              <Field
                className="paywall-contact-us__field"
                component="textarea"
                name="description"
                label="Descripción"
                placeholder="Descripción"
              />
              <button className="paywall-contact-us__button" type="submit" disabled={isSubmitting}>
                Enviar
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  )
}
