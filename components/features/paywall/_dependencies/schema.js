function shape(value) {
    return {
      value: value.toString(),
      email(message) {
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.value)) {
          throw message;
        }
        return this;
      },
      filled(message) {
        if (/\s/g.test(this.value)) throw message;
        return this;
      },
      length(limit, message) {
        if (this.value.length !== limit) throw message;
        return this;
      },
      max(limit, message) {
        if (this.value.length >= limit) throw message;
        return this;
      },
      min(limit, message) {
        if (this.value.length < limit) throw message;
        return this;
      },
      required(message) {
        if (!this.value) throw message;
        return this;
      },
    };
  }
  
  
  function struct(schema) {
    return data => {
      const errors = {};
      Object.keys(data).forEach(name => {
        if (!schema[name]) {
          return;
        }
        try {
          const s = schema[name];
          s(shape(data[name]));
        } catch (err) {
          errors[name] = err;
        }
      });
      return errors;
    };
  }

  export default struct;

  
//   const SignupSchema = struct({
//     email: value =>
//       value.required('Este campo es requerido').email('Correo inválido'),
//     password: value =>
//       value
//         .required('Este campo es requerido')
//         .min(8, 'Mínimo 8 caracteres')
//         .filled('No se permiten espacios vacíos'),
//     terminos: value => value.required('Es necesario aceptar los términos'),
//   });
  
//   export const SignupValidation = values => {
//     console.time('validity');
//     const errors = SignupSchema(values);
//     console.timeEnd('validity');
//     return errors;
//   };