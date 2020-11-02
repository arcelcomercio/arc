import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import { NEWSLETTER_API, NEWSLETTER_COVID19_API } from 'fusion:environment'

import customFieldsExtern from './_dependencies/custom-fields'
import NewsletterChild from './_children/newsletter'
import Data from './_dependencies/data'

@Consumer
class Newsletter extends PureComponent {
  main = {
    initData: () => {
      return {
        email: '',
        tos: 0,
        submitForm: false,
        disbutton: false,
        confirmRegister: false,
        formMessage: '',
      }
    },
    suscription: data => {
      const dataRequest = params => {
        const {
          siteProperties: { newsletterBrand = '' },
        } = this.props
        const {
          customFields: { isActiveApiCovid19 },
        } = this.props
        const dataBody = {
          brand: newsletterBrand,
        }
        if (isActiveApiCovid19) dataBody.topics = ['coronavirus']

        return Object.assign(params, dataBody)
      }

      const messageApi = response => {
        let msg = ''
        if (
          response &&
          response.status !== undefined &&
          response.status === false
        ) {
          msg = response.message || ''
        }
        return msg
      }

      const successApi = response => {
        return response && response.status !== false
      }

      const {
        customFields: { isActiveApiCovid19 },
      } = this.props
      const url = isActiveApiCovid19 ? NEWSLETTER_COVID19_API : NEWSLETTER_API
      this.setState({ disbutton: true })
      fetch(url, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(dataRequest(data)),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .catch(error => error)
        .then(response => {
          let confirmRegister = false
          let formMessage = 'Error'
          if (response && response.ok) {
            response.json().then(json => {
              // confirmRegister = json.success
              // formMessage = json.message
              confirmRegister = successApi(json)
              formMessage = messageApi(json)
              this.setState({ confirmRegister, formMessage })
            })
          } else this.setState({ confirmRegister, formMessage })
        })
    },
    email: event => {
      event.preventDefault()
      this.setState({ email: event.target.value })
    },
    tos: event => {
      this.setState({ tos: event.target.checked ? 1 : 0 })
    },
    save: event => {
      if (this.validation.form()) this.main.suscription(this.state)
      event.preventDefault()
    },
    redirect: () => {
      const {
        siteProperties: { siteUrl = '' },
      } = this.props
      window.location.href = siteUrl
    },
  }

  validation = {
    isValidEmail: email => {
      const emailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
      return emailValid
    },
    isEmpty: val => {
      return val.trim() === ''
    },
    isChecked: check => {
      return check === 1
    },
    email: {
      hasError: () => {
        const { email } = this.state
        return (
          this.validation.isEmpty(email) || !this.validation.isValidEmail(email)
        )
      },
      message: () => {
        const { email } = this.state
        if (this.validation.isEmpty(email))
          return 'Este valor no debería estar vacío.'
        if (!this.validation.isValidEmail(email))
          return `El correo "${email}" no es valido.`
        return ''
      },
    },
    tos: {
      hasError: () => {
        const { tos } = this.state
        return !this.validation.isChecked(tos)
      },
      message: () => {
        const { tos } = this.state
        if (!this.validation.isChecked(tos))
          return 'Este valor debería estar marcado.'
        return ''
      },
    },
    form: () => {
      let hasError = false
      if (this.validation.email.hasError() || this.validation.tos.hasError())
        hasError = true
      this.setState({ submitForm: true })
      return !hasError
    },
  }

  constructor(props) {
    super(props)
    this.state = this.main.initData()
    // this.main.email = this.main.email.bind(this)
  }

  render() {
    const { submitForm, confirmRegister, formMessage, disbutton } = this.state
    const { arcSite, contextPath, deployment, customFields } = this.props
    const data = new Data(customFields, arcSite, contextPath)
    const params = {
      description: data.description,
      image: deployment(data.image),
      banner: data.banner,
      hasBanner: data.hasBanner,
      urlTos: data.urlTos
        ? data.urlTo
        : 'https://trome.pe/terminos-y-condiciones/',
      urlPrivacyPolicies: data.urlPrivacyPolicies
        ? data.urlPrivacyPolicies
        : 'https://trome.pe/politica-de-privacidad/',
      features: this.main,
      validation: this.validation,
      submitForm,
      disbutton,
      confirmRegister,
      formMessage,
      isActiveApiCovid19: customFields.isActiveApiCovid19,
    }
    return <NewsletterChild {...params} />
  }
}

Newsletter.propTypes = {
  customFields: customFieldsExtern,
}

Newsletter.label = 'Newsletter Custom'

export default Newsletter
