import React from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import InputFormik from '../input'
import * as S from './styled'

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .required('Required'),
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastname: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  phone: Yup.string(),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  documentId: Yup.string().required('Required'),
})

const Select = () => (
  <S.Select>
    <option>DNI</option>
    <option>CEX</option>
    <option>CDI</option>
  </S.Select>
)

const UserProfile = ({ title = '' }) => (
  <Formik
    initialValues={{ name: 'jared', firstname: 'first' }}
    validationSchema={SignupSchema}
    onSubmit={(values, actions) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2))
        actions.setSubmitting(false)
      }, 1000)
    }}
    render={() => (
      <Form className="__field">
        {title}
        <S.Wrap>
          <Field name="name" placeholder="Nombre" component={InputFormik} />
          <Field
            name="firstname"
            placeholder="Apellido Paterno"
            component={InputFormik}
          />
          <Field
            name="lastname"
            placeholder="Apellido Materno"
            component={InputFormik}
          />
          <Field
            name="documentId"
            placeholder="Tipo de documento"
            prefix={<Select key="select" />}
            component={InputFormik}
          />
          <Field name="phone" placeholder="Teléfono" component={InputFormik} />
          <Field
            name="email"
            placeholder="Correo Electrónico"
            component={InputFormik}
          />
        </S.Wrap>
        <S.Button type="submit">CONTINUAR</S.Button>
      </Form>
    )}
  />
)

export default UserProfile
