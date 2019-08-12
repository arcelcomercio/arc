import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import InputFormik from '../../_children/input'
import Button from '../../_children/button'
import { WrapField, ContentRow } from '../_dependencies/styled'
import { FormSchema, Masks, MESSAGE } from '../_dependencies/schema'

export default props => {
  
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
      props.nextStep()
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
          <div>{error}</div>
          <div className="paywall-contact-us__content-row">
            <WrapField>
              <Field
                name="email"
                label="Correo Electrónico*"
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
                <option value="0">Tipo de consulta de subscripción</option>
                <option value="1">type 1</option>
                <option value="2">type 2</option>
                <option value="3">type 3</option>
              </Field>
            </WrapField>
            <WrapField>
              <Field
                transform="capitalize"
                name="subject"
                label="Asunto"
                mask={Masks.PERSON_NAME}
                component={InputFormik}
              />
            </WrapField>
            <WrapField>
              <Field
                className="paywall-contact-us__field"
                component="textarea"
                name="description"
                label="Descripción"
                placeholder="Descripción"
              />
            </WrapField>
            <Button type="submit" disabled={isSubmitting}>
              Enviar
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}
