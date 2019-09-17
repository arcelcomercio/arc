/* eslint-disable prefer-destructuring */
/* eslint-disable import/prefer-default-export */
/* eslint-disable react/sort-comp */
/* eslint-disable react/destructuring-assignment */
import * as React from 'react'
import { connect } from 'formik'
import debounce from 'lodash.debounce'
import omit from 'lodash.omit'
import isEqual from 'react-fast-compare'

class PersistImpl extends React.Component {
  static defaultProps = {
    debounce: 300,
  }

  saveForm = debounce(({ isSubmitting, ...data }) => {
    const dataToSave = this.omitIgnoredFields(data)
    if (this.props.isSessionStorage) {
      window.sessionStorage.setItem(this.props.name, JSON.stringify(dataToSave))
    } else {
      window.localStorage.setItem(this.props.name, JSON.stringify(dataToSave))
    }
  }, this.props.debounce)

  omitIgnoredFields = data => {
    const { ignoreFields } = this.props
    const { values, touched, errors } = data
    return ignoreFields
      ? {
          ...data,
          values: omit(values, ignoreFields),
          touched: omit(touched, ignoreFields),
          errors: omit(errors, ignoreFields),
        }
      : data
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.formik, this.props.formik)) {
      this.saveForm(this.props.formik)
    }
  }

  componentDidMount() {
    const { ignoreFields } = this.props
    const maybeState = this.props.isSessionStorage
      ? window.sessionStorage.getItem(this.props.name)
      : window.localStorage.getItem(this.props.name)
    if (maybeState && maybeState !== null) {
      const formik = this.props.formik
      const filteredState = this.omitIgnoredFields(
        JSON.parse(maybeState),
        ignoreFields
      )
      const data = {
        ...filteredState,
        values: Object.assign({}, formik.values, filteredState.values),
        touched: Object.assign({}, formik.touched, filteredState.touched),
        errors: Object.assign({}, formik.errors, filteredState.errors),
      }
      this.props.formik.setFormikState(data)
    }
  }

  render() {
    return null
  }
}

export const Persist = connect(PersistImpl)
