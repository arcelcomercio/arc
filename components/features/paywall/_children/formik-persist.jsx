/* eslint-disable import/prefer-default-export */
/* eslint-disable react/sort-comp */
/* eslint-disable react/destructuring-assignment */
import * as React from 'react'
import { connect } from 'formik'
import debounce from 'lodash.debounce'
import isEqual from 'react-fast-compare'

class PersistImpl extends React.Component {
  static defaultProps = {
    debounce: 300,
  }

  saveForm = debounce(({ isSubmitting, ...data }) => {
    if (this.props.isSessionStorage) {
      window.sessionStorage.setItem(this.props.name, JSON.stringify(data))
    } else {
      window.localStorage.setItem(this.props.name, JSON.stringify(data))
    }
  }, this.props.debounce)

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.formik, this.props.formik)) {
      this.saveForm(this.props.formik)
    }
  }

  componentDidMount() {
    const maybeState = this.props.isSessionStorage
      ? window.sessionStorage.getItem(this.props.name)
      : window.localStorage.getItem(this.props.name)
    if (maybeState && maybeState !== null) {
      this.props.formik.setFormikState(JSON.parse(maybeState))
    }
  }

  render() {
    return null
  }
}

export const Persist = connect(PersistImpl)
