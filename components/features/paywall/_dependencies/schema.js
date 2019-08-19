const cardPatterns = {
  VISA: /^(4)(\d{12}|\d{15})$|^(606374\d{10}$)/,
  MASTERCARD: /^(5[1-5]\d{14}$)|^(2(?:2(?:2[1-9]|[3-9]\d)|[3-6]\d\d|7(?:[01]\d|20))\d{12}$)/,
  AMEX: /^3[47][0-9]{13}$/,
  DINERS: /(^[35](?:0[0-5]|[268][0-9])[0-9]{11}$)|(^30[0-5]{11}$)|(^3095(\d{10})$)|(^36{12}$)|(^3[89](\d{12})$)/,
  NARANJA: /^(589562)\d{10}$/,
  SHOPPING: /(^603488(\d{10})$)|(^2799(\d{9})$)/,
  CABAL: /(^604(([23][0-9][0-9])|(400))(\d{10})$)|(^589657(\d{10})$)/,
  ARGENCARD: /^(501105|532362)(\d{10}$)/,
  CENCOSUD: /^603493(\d{10})$/,
  HIPERCARD: /^(384100|384140|384160|606282)(\d{10}|\d{13})$/,
  CODENSA: /^590712(\d{10})$/,
  ELO: /(^(636368|438935|504175|451416|636297|650901|650485|650541|650700|650720|650720|650720|655021|650405)\d{10})$|(^(5090|5067|4576|4011)\d{12})$|(^(50904|50905|50906)\d{11})$/,
}

const cvvPatterns = {
  VISA: /^\d{3}$/,
  MASTERCARD: /^\d{3}$/,
  AMEX: /^\d{3,4}$/,
  DINERS: /^\d{3}$/,
}

const Pipes = {
  combine: (...pipes) => val =>
    pipes.reduce((prevVal, pipe) => pipe(prevVal), val),
  capitalize: () => val =>
    val.replace(/(^|\s)([a-zñáéíóúäëïöü])/g, c => c.toUpperCase()),
  trim: () => val => val.trim(),
  trimLeft: () => val => val.trimLeft(),
  trimRight: () => val => val.trimRight(),
  dedup: char => val => val.replace(new RegExp(`([${char}])+`, 'g'), '$1'),
  replace: (...args) => val => val.replace(...args),
  ignoreChars: chars => val => {
    if (val) {
      if (chars instanceof RegExp) {
        return val.replace(chars, '')
      }
      if (Array.isArray(chars)) {
        return val.replace(new RegExp(`[${chars.join('')}]`, 'g'), '')
      }
      if (typeof chars === 'string') {
        return val.replace(new RegExp(`[${chars}]`, 'g'), '')
      }
    }
    return val
  },
}

const regx = new RegExp(`[ a-zA-ZÑñáéíóúÁÉÍÓÚäëïöüÄËÏÖÜ'-]`)
// prettier-ignore
export const Masks = {
  PERSON_NAME: new Array(49).fill(regx),
  DNI: new Array(8).fill(/\d/),
  CEX: new Array(15).fill(/[a-zA-Z0-9-]/),
  CDI: new Array(15).fill(/[a-zA-Z0-9-]/),
  PHONE: [/\d/,/\d/,/\d/," ",/\d/,/\d/,/\d/, " ", /\d/, /\d/,/\d/, " ", /\d/, /\d/,/\d/],
  CREDIT_CARD_NUMBER: [ /\d/,/\d/,/\d/,/\d/," ",/\d/,/\d/,/\d/,/\d/," ",/\d/,/\d/,/\d/,/\d/," ",/\d/,/\d/,/\d/,/\d/],
  EXPIRY_DATE: [/\d/,/\d/,'/',/\d/,/\d/,/\d/,/\d/],
  CREDIT_CARD_CVV: [/\d/, /\d/, /\d/],
  Pipes
};

export const PipedMasks = {
  PERSON_NAME: {
    mask: Masks.PERSON_NAME,
    pipe: Pipes.combine(
      Pipes.replace(/(^|\s)[-]/, '$1'), // No espacios/guiones al inicio de palabra
      Pipes.dedup('-'), // No mas de un guión seguido
      Pipes.dedup(' '), // No mas de un espacio de separacion entre palabras
      Pipes.trimLeft(), // No espacio al inicio
      Pipes.capitalize() // Palabras capitalizadas
    ),
  },
}

Masks.Piped = PipedMasks

function shape(value) {
  return {
    value: value ? value.toString() : value,

    // Transformations
    trim() {
      this.value = this.value ? this.value.trim() : this.value
      return this
    },
    trimLeft() {
      this.value = this.value ? this.value.trimLeft() : this.value
      return this
    },
    trimRight() {
      this.value = this.value ? this.value.trimRight() : this.value
      return this
    },
    isRequired: false,
    hasValue: value !== '' && value !== null,
    replace(...args) {
      this.value = this.value ? this.value.replace(...args) : this.value
      return this
    },
    ignoreChars(chars) {
      if (this.value) {
        if (chars instanceof RegExp) {
          this.value = this.value.replace(chars, '')
        } else if (Array.isArray(chars)) {
          this.value = this.value.replace(
            new RegExp(`[${chars.join('')}]`, 'g'),
            ''
          )
        } else if (typeof chars === 'string') {
          this.value = this.value.replace(new RegExp(`[${chars}]`, 'g'), '')
        }
      }
      return this
    },
    dedup(char) {
      this.value = this.value
        ? this.value.replace(new RegExp(`([${char}])+`, 'g'), '$1')
        : this.value
      return this
    },

    // Validations
    email(message) {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.value)) {
        throw message
      }
      return this
    },
    filled(message) {
      if (/\s/g.test(this.value)) throw message
      return this
    },
    length(limit, message) {
      if (!this.value || this.value.length !== limit) throw message
      return this
    },
    max(limit, message) {
      if (!this.isRequired && !this.hasValue) return this
      if (!this.value || this.value.length > limit)
        throw message.replace(/\${max}/g, limit)
      return this
    },
    min(limit, message) {
      if (!this.isRequired && !this.hasValue) return this
      if (!this.value || this.value.length < limit)
        throw message.replace(/\${min}/g, limit)
      return this
    },
    required(message) {
      this.isRequired = true
      if (!this.value) throw message
      return this
    },
    creditCardNumber(cardType, message) {
      if (cardType) {
        const v = this.value.replace(/\D/g, '')
        const match = cardPatterns[cardType.toUpperCase()].test(v)
        if (!match) {
          throw message
        }
      }
      return this
    },
    creditCardCvv(cardType, message) {
      if (cardType) {
        const match = cvvPatterns[cardType.toUpperCase()].test(this.value)
        if (!match) {
          throw message
        }
      }
      return this
    },
    custom(regx, message) {
      if (!regx.test(this.value)) throw message
      return this
    },
  }
}

function struct(schema) {
  const build = data => {
    const errors = {}
    Object.keys(schema).forEach(name => {
      try {
        const s = schema[name]
        const restValues = Object.assign({}, data)
        const value = data[name]
        delete restValues[name]
        s(shape(value), restValues)
      } catch (err) {
        // Los errores de validacion deben lanzarse como string
        // para poder disernir si es por validacion o de implementacion
        // del validador
        if (err instanceof Error) {
          // Mostrar error por consola y en el input
          console.error(err)
          errors[name] = err.message
        } else {
          errors[name] = err
        }
      }
    })
    return errors
  }
  build.schema = schema
  return build
}

export const clearNull = values => {
  return Object.keys(values).reduce((prev, item) => {
    if (values[item] !== null) {
      prev[item] = values[item]
    }
    return prev
  }, {})
}

export default struct
