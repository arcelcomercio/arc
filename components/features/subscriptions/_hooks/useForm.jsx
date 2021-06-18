import * as React from 'react'

const VALUE = 'value'
const ERROR = 'error'

const REQUIRED_FIELD_ERROR = 'Este campo es requerido'
const EMPTY_FIELD_ERROR = 'No se permiten espacios'
const MIN_2_CARACTS_FIELD_ERROR = 'Se requiere mínimo 2 caracteres'
const MIN_6_CARACTS_FIELD_ERROR = 'Se requiere mínimo 6 caracteres'
const TEXT_INVALID_ERROR = 'Este valor no está permitido'

/**
 * Determines a value if it's an object
 *
 * @param {object} value
 */
function isObject(value) {
  return value !== null && typeof value === 'object'
}

function getPropValues(stateSchema, prop) {
  if (!isObject(stateSchema) || !prop) {
    throw new Error('Invalid Parameter passed.')
  }

  return Object.keys(stateSchema).reduce((accumulator, curr) => {
    accumulator[curr] = stateSchema[curr][prop]
    return accumulator
  }, {})
}

/**
 *
 * @param {string} value
 * @param {boolean} isRequired
 */
function isRequiredField(value, isRequired) {
  return !value && isRequired ? REQUIRED_FIELD_ERROR : ''
}

function notSpaces(value) {
  return value.indexOf(' ') >= 0 ? EMPTY_FIELD_ERROR : ''
}

function min2Caracts(value) {
  return value.length < 2 ? MIN_2_CARACTS_FIELD_ERROR : ''
}

function min6Caracts(value) {
  return value.length >= 1 && value.length < 6 ? MIN_6_CARACTS_FIELD_ERROR : ''
}

function invalidText(value) {
  const lowerValue = value.toLowerCase()
  return lowerValue.match(/undefined/) || lowerValue === 'null'
    ? TEXT_INVALID_ERROR
    : ''
}

/**
 * Custom hooks to validate your Form...
 *
 * @param {object} stateSchema model you stateSchema.
 * @param {object} stateValidatorSchema model your validation.
 * @param {function} submitFormCallback function to be execute during form submission.
 */
function useForm(
  stateSchema = {},
  stateValidatorSchema = {},
  submitFormCallback
) {
  const [state, setStateSchema] = React.useState(stateSchema)
  const [values, setValues] = React.useState(getPropValues(state, VALUE))
  const [errors, setErrors] = React.useState(getPropValues(state, ERROR))
  const [disable, setDisable] = React.useState(true)
  const [isDirty, setIsDirty] = React.useState(false)

  // Get a local copy of stateSchema
  React.useEffect(() => {
    setStateSchema(stateSchema)
    setDisable(true) // Disable button in initial render.
  }, []) // eslint-disable-line

  // Used to disable submit button if there's a value in errors
  // or the required field in state has no value.
  // Wrapped in useCallback to cached the function to avoid intensive memory leaked
  // in every re-render in component
  const validateErrorState = React.useCallback(
    () => Object.values(errors).some((error) => error),
    [errors]
  )

  // For every changed in our state this will be fired
  // To be able to disable the button
  React.useEffect(() => {
    if (isDirty) {
      setDisable(validateErrorState())
    }
  }, [errors, isDirty]) // eslint-disable-line

  // Event handler for handling changes in input.
  const handleOnChange = React.useCallback(
    (event) => {
      setIsDirty(true)
      const { value, name } = event.target
      const validatorState = stateValidatorSchema

      // Making sure that stateValidatorSchema name is same in
      // stateSchema
      if (!validatorState[name]) return

      const fieldValid = validatorState[name]

      let errorObj = ''

      errorObj = isRequiredField(value, fieldValid.required)

      if (fieldValid.nospaces && errorObj === '') {
        errorObj = notSpaces(value)
      }

      if (fieldValid.min2caracts && errorObj === '') {
        errorObj = min2Caracts(value)
      }

      if (fieldValid.min6caracts && errorObj === '') {
        errorObj = min6Caracts(value)
      }

      if (fieldValid.invalidtext && errorObj === '') {
        errorObj = invalidText(value)
      }

      // Prevent running this function if the value is required field
      if (errorObj === '' && isObject(fieldValid.validator)) {
        const fieldValidator = fieldValid.validator
        const { func, error } = fieldValidator

        // Test the function callback if the value is meet the criteria
        const testFunc = func
        if (!testFunc(value, values)) {
          errorObj = error
        }
      }

      setValues((prevState) => ({ ...prevState, [name]: value }))
      setErrors((prevState) => ({ ...prevState, [name]: errorObj }))
    },
    [stateValidatorSchema, values]
  )

  const handleOnSubmit = React.useCallback(
    (event) => {
      event.preventDefault()

      // Making sure that there's no error in the state
      // before calling the submit callback function
      if (!validateErrorState()) {
        submitFormCallback(values)
      }
    },
    [validateErrorState, submitFormCallback, values]
  )

  return {
    handleOnChange,
    handleOnSubmit,
    values,
    errors,
    disable,
    setValues,
    setErrors,
  }
}

export default useForm
