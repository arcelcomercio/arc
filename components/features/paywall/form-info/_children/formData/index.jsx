

import React,{Component} from 'react'
import Consumer from 'fusion:consumer'

@Consumer
class Formulario extends Component{
  render(){
    return(
      <h2>componente formulario</h2>
    )
  }
}

export default Formulario








// import React from 'react'
// import { Formik, Form, Field } from 'formik'
// import * as S from './styled'

// import InputFormik from '../../../_children/input'
// import Button from '../../../_children/button'
// import Error from '../../../_children/error'
// import { FormSchema, Masks } from './schema'


// const FormStyled = S.Form(Form) 

// const FormContact = ({ title = '', error, onSubmit, onReset }) => {
//     return(
//       <Formik
//         initialValues={{
//           email:'my-email@my-enterprise.com',
//           firstName:'',
//           lastName:'',
//           orgName:'',
//           suscriptionQueryType:'opt1',
//           subject:'',
//           description:''
//         }}
//         validate={values => new FormSchema(values)}
//         onSubmit={(values, actions) => {
//           onSubmit(
//             {
//               ...values,
//               email: values.email
//                 .trim(),
//               firstName: values.firstName
//                 .trim()
//                 .replace(/\b([a-zñáéíóúäëïöü])/g, c => c.toUpperCase()),
//               lastName: values.lastName
//                 .trim()
//                 .replace(/\b([a-zñáéíóúäëïöü])/g, c => c.toUpperCase()),
//               orgName: values.orgName
//                 .trim()
//                 .replace(/\b([a-zñáéíóúäëïöü])/g, c => c.toUpperCase()),
//               subject: values.subject
//                 .trim()
//                 .replace(/\b([a-zñáéíóúäëïöü])/g, c => c.toUpperCase()),              
//               description: values.subject
//                 .trim()
//                 .replace(/\b([a-zñáéíóúäëïöü])/g, c => c.toUpperCase()),
//               },
//             actions
//           )
//         }}
//         onReset={onReset}
//         render={
//           ({isSubmitting})=>{
//             return(
//             <FormStyled>
//               <S.FormTitle>
//                   {title}
//               </S.FormTitle>
//               <S.ContentForm>
//                   <S.ContentLeft>
//                       <S.WrapField>
//                           <Field
//                           name="email"
//                           label="Correo Electrónico*"
//                           component={InputFormik}
//                           />
//                       </S.WrapField>                              
//                       <S.WrapField>
//                           <Field
//                           transform="capitalize"
//                           name="firstName"
//                           label="Nombres"
//                           mask={Masks.PERSON_NAME}
//                           component={InputFormik}
//                           />
//                       </S.WrapField>
//                       <S.WrapField>
//                           <Field
//                           transform="capitalize"
//                           name="lastName"
//                           label="Apellidos"
//                           mask={Masks.PERSON_NAME}
//                           component={InputFormik}
//                           />
//                       </S.WrapField>
//                       <S.WrapField>
//                           <Field
//                           transform="capitalize"
//                           name="orgName"
//                           label="Nombre de su Organización*"
//                           mask={Masks.PERSON_NAME}
//                           component={InputFormik}
//                           />
//                       </S.WrapField>
//                   </S.ContentLeft>
  
//                   <S.ContentRight>
//                       <S.WrapField>
//                           <Field
//                             component="select"
//                             name="typeQuery">
//                             <option value="opt1">opt1</option>
//                             <option value="opt2">opt2</option>
//                             <option value="opt3">opt3</option>
//                           </Field>
//                       </S.WrapField>
  
//                       <S.WrapField>
//                           <Field
//                           transform="capitalize"
//                           name="subject"
//                           label="Asunto*"
//                           mask={Masks.PERSON_NAME}
//                           component={InputFormik}
//                           />
//                       </S.WrapField>
//                       <S.WrapField>
//                           <Field
//                           transform="capitalize"
//                           name="description"
//                           label="Descripción*"
//                           mask={Masks.PERSON_NAME}
//                           component={InputFormik}
//                           />
//                       </S.WrapField>                                        
//                       {error && <Error mb="20px" message={error} />}
//                       <Button disabled={isSubmitting} maxWidth="300px" type="submit">
//                           ENVIAR
//                       </Button>
//                   </S.ContentRight>
//               </S.ContentForm>
//             </FormStyled>
//             )
//           }
//         }

//       />
//     )
// }

// export default FormContact


