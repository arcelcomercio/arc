/* eslint-disable react/destructuring-assignment */
/*
eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
import React, { Component } from 'react'
// import getProperties from 'fusion:properties'
import Consumer from 'fusion:consumer'

import Services from './api'

const services = new Services()

const styleResult = {
  color: 'blue',
  padding: '20px',
  width: '500px',
  height: '200px',
}
const buttonStyle ={
  color: 'white',
  background: '#2196F3'
}
const titleStyle ={
  marginTop: '50px'
}

@Consumer
class AddToCart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      emailUser: 'chicha@morada.com',
      passUser: '123qwe123qwe',
      campaign: 'campaignsandbox',
      sku: '',
      priceCode: '',
      email: 'jduenas@rmgperustaff.com',
      phone: '935511223',
      billingAddress: {
        country: 'PE',
        line1: 'Calle Belisario Suarez 142',
        line2: 'altura cuadra 20 Angamos Este',
        locality: 'Lima',
        postal: '01',
        region: 'LI',
      },
      step1: '',
      step2: '',
      step3: '',
      step4: '',
      step5: '',
      step6: '',
      step7: '',
      step8: '',
      step9: '',
      orderNumber: '',
      paymentMethodID: '',
      parameter3: '',
      creditCardToken: {
        name: 'jorge duenas',
        identificationNumber: '44000001',
        paymentMethod: 'VISA',
        number: '4437030140190994',
        expirationDate: '2021/10',
      },
      token: '',
    }
    this.loginUser = this.loginUser.bind(this)
    this.getCampaign = this.getCampaign.bind(this)
    this.createOrder = this.createOrder.bind(this)
    this.addToCart = this.addToCart.bind(this)
    this.onChange = this.onChange.bind(this)
    this.getListPayments = this.getListPayments.bind(this)
    this.initPayment = this.initPayment.bind(this)
  }

  // eslint-disable-next-line react/sort-comp
  loginUser() {
    const {
      siteProperties: { signwall: { ORIGIN_API } = {} },
    } = this.props

    window.Identity.apiOrigin = ORIGIN_API

    window.Identity.login(this.state.emailUser, this.state.passUser)
      .then(res => {
        this.setState({
          step1: JSON.stringify(res, null, '\t'),
        })
      })
      .catch(console.error)
  }

  getCampaign() {
    const {
      siteProperties: { signwall: { ORIGIN_API } = {} },
    } = this.props

    services
      .apiGetCampaign(ORIGIN_API, this.state.campaign)
      .then(res => {
        this.setState({
          step2: JSON.stringify(res, null, '\t'),
        })
      })
      .catch(console.error)
  }

  // eslint-disable-next-line class-methods-use-this
  // eslint-disable-next-line react/sort-comp
  addToCart() {
    const {
      siteProperties: { signwall: { ORIGIN_API } = {} },
    } = this.props

    window.Sales.apiOrigin = ORIGIN_API

    window.Sales.addItemToCart(this.state.sku, this.state.priceCode, 1)
      .then(res => {
        this.setState({
          step3: JSON.stringify(res, null, '\t'),
        })
      })
      .catch(console.error)
  }

  createOrder() {
    const {
      siteProperties: { signwall: { ORIGIN_API } = {} },
    } = this.props

    window.Sales.apiOrigin = ORIGIN_API

    const { email, phone, billingAddress } = this.state
    window.Sales.createOrder(email, phone, billingAddress)
      .then(res => {
        this.setState({
          step4: JSON.stringify(res, null, '\t'),
        })
      })
      .catch(console.error)
  }

  // eslint-disable-next-line class-methods-use-this
  getListPayments() {
    const {
      siteProperties: { signwall: { ORIGIN_API } = {} },
    } = this.props

    window.Sales.apiOrigin = ORIGIN_API

    window.Sales.getPaymentOptions()
      .then(res => {
        this.setState({
          step5: JSON.stringify(res, null, '\t'),
        })
      })
      .catch(console.error)
  }

  // eslint-disable-next-line class-methods-use-this
  initPayment() {
    const {
      siteProperties: { signwall: { ORIGIN_API } = {} },
    } = this.props

    window.Sales.apiOrigin = ORIGIN_API

    const { orderNumber, paymentMethodID } = this.state
    window.Sales.initializePayment(orderNumber, parseInt(paymentMethodID, 10))
      .then(res => {
        this.setState({
          step6: JSON.stringify(res, null, '\t'),
        })
      })
      .catch(console.error)
  }

  // eslint-disable-next-line class-methods-use-this
  generateCardToken() {
    const { parameter3, creditCardToken } = this.state
    const responsePayU = services.apiGenerateCardToken(
      parameter3,
      creditCardToken
    )
    console.log(responsePayU)
  }

  // eslint-disable-next-line class-methods-use-this
  paymanetRegister() {
    const local = ''
    services
      .apiPaymentRegister(local)
      .then(console.log)
      .catch(console.error)
  }

  // eslint-disable-next-line class-methods-use-this
  finalizePayment() {
    const {
      siteProperties: { signwall: { ORIGIN_API } = {} },
    } = this.props

    window.Sales.apiOrigin = ORIGIN_API

    const { orderNumber, paymentMethodID, token } = this.state
    window.Sales.finalizePayment(
      orderNumber,
      parseInt(paymentMethodID, 10),
      token
    )
      .then(res => {
        this.setState({
          step9: JSON.stringify(res, null, '\t'),
        })
      })
      .catch(console.error)
  }

  // eslint-disable-next-line react/sort-comp
  onChange(e) {
    const field = e.target
    if (
      ['country', 'line1', 'line2', 'locality', 'postal', 'region'].indexOf(
        field.name
      ) >= 0
    ) {
      // eslint-disable-next-line react/destructuring-assignment
      // eslint-disable-next-line react/no-access-state-in-setstate
      const billingAddress = { ...this.state.billingAddress }
      billingAddress[field.name] = field.value
      this.setState({ billingAddress })
    } else {
      this.setState({ [e.target.name]: e.target.value })
    }
  }

  render() {
    const {
      emailUser,
      passUser,
      campaign,
      email,
      phone,
      billingAddress,
      step1,
      step2,
      step3,
      step4,
      step5,
      step6,
      step7,
      step8,
      step9,
      creditCardToken,
    } = this.state
    return (
      <>
        <div className="container">
          <h1 className="font--primary" style={titleStyle}>
            {' '}
            STEP 1{' '}
          </h1>
          <div className="container-tertiary">
            <label htmlFor="emailUser" className="font--primary">
              Email
              <input
                onChange={this.onChange}
                name="emailUser"
                className="input"
                value={emailUser}
              />
            </label>
          </div>
          <div className="container-tertiary">
            <label htmlFor="passUser" className="font--primary">
              Pass
              <input
                type="password"
                onChange={this.onChange}
                name="passUser"
                className="input"
                value={passUser}
              />
            </label>
          </div>
          <div className="container-tertiary">
            <button
              style={buttonStyle}
              type="button"
              className="btn btn--secondary font--primary"
              onClick={() => {
                this.loginUser()
              }}>
              login
            </button>
          </div>
          <textarea
            name="step1"
            style={styleResult}
            value={step1}
            onChange={this.onChange}
            hidden={step1 === ''}
          />
        </div>

        <div className="container">
          <h1 className="font--primary" style={titleStyle}>
            {' '}
            STEP 2{' '}
          </h1>
          <div className="container-tertiary">
            <label htmlFor="campaign" className="font--primary">
              Name Campaign
              <input
                id="campaign"
                onChange={this.onChange}
                name="campaign"
                className="input"
                value={campaign}
              />
            </label>
          </div>
          <div className="container-tertiary">
            <button
              style={buttonStyle}
              type="button"
              className="btn btn--secondary font--primary"
              onClick={() => {
                this.getCampaign()
              }}>
              Get Product Campaign
            </button>
          </div>
          <textarea
            name="step2"
            style={styleResult}
            value={step2}
            onChange={this.onChange}
            hidden={step2 === ''}
          />
        </div>

        <div className="container">
          <h1 className="font--primary" style={titleStyle}>
            {' '}
            STEP 3{' '}
          </h1>
          <div className="container-tertiary">
            <label htmlFor="sku" className="font--primary">
              sku
              <input onChange={this.onChange} name="sku" className="input" />
            </label>
          </div>
          <div className="container-tertiary">
            <label htmlFor="priceCode" className="font--primary">
              priceCode
              <input
                onChange={this.onChange}
                name="priceCode"
                className="input"
              />
            </label>
          </div>
          <div className="container-tertiary">
            <button
              style={buttonStyle}
              type="button"
              className="btn btn--secondary font--primary"
              onClick={() => {
                this.addToCart()
              }}>
              Add to Cart
            </button>
          </div>
          <textarea
            name="step3"
            style={styleResult}
            value={step3}
            onChange={this.onChange}
            hidden={step3 === ''}
          />
        </div>

        <div className="container">
          <h1 className="font--primary" style={titleStyle}>
            STEP 4
          </h1>
          <div className="container-tertiary">
            <label htmlFor="email" className="font--primary">
              Email
              <input
                onChange={this.onChange}
                name="email"
                className="input"
                value={email}
              />
            </label>
          </div>
          <div className="container-tertiary">
            <label htmlFor="phone" className="font--primary">
              Phone
              <input
                onChange={this.onChange}
                name="phone"
                className="input"
                value={phone}
              />
            </label>
          </div>
          <div className="container-tertiary">
            <label htmlFor="line1" className="font--primary">
              Line1
              <input
                onChange={this.onChange}
                name="line1"
                className="input"
                value={billingAddress.line1}
              />
            </label>
          </div>
          <div className="container-tertiary">
            <label htmlFor="line2" className="font--primary">
              Line2
              <input
                onChange={this.onChange}
                name="line2"
                className="input"
                value={billingAddress.line2}
              />
            </label>
          </div>
          <div className="container-tertiary">
            <label htmlFor="city" className="font--primary">
              Locality
              <input
                onChange={this.onChange}
                name="city"
                className="input"
                value={billingAddress.locality}
              />
            </label>
          </div>
          <div className="container-tertiary">
            <label htmlFor="region" className="font--primary">
              Region
              <input
                onChange={this.onChange}
                name="departament"
                className="input"
                value={billingAddress.region}
              />
            </label>
          </div>
          <div className="container-tertiary">
            <label htmlFor="country" className="font--primary">
              Country
              <input
                onChange={this.onChange}
                name="country"
                className="input"
                value={billingAddress.country}
              />
            </label>
          </div>
          <div className="containesr-tertiary">
            <label htmlFor="postal" className="font--primary">
              Code Postal
              <input
                onChange={this.onChange}
                name="postal"
                className="input"
                value={billingAddress.postal}
              />
            </label>
          </div>
          <div className="container-tertiary">
            <button
              style={buttonStyle}
              type="button"
              className="btn btn--secondary font--primary"
              onClick={() => {
                this.createOrder()
              }}>
              Create Order
            </button>
          </div>
          <textarea
            name="step4"
            style={styleResult}
            value={step4}
            onChange={this.onChange}
            hidden={step4 === ''}
          />
        </div>

        <div className="container">
          <h1 className="font--primary" style={titleStyle}>
            STEP 5
          </h1>
          <div className="container-tertiary">
            <button
              style={buttonStyle}
              type="button"
              className="btn btn--secondary font--primary"
              onClick={() => {
                this.getListPayments()
              }}>
              Get List Payments
            </button>
          </div>
          <textarea
            name="step5"
            style={styleResult}
            value={step5}
            onChange={this.onChange}
            hidden={step5 === ''}
          />
        </div>

        <div className="container">
          <h1 className="font--primary" style={titleStyle}>
            STEP 6
          </h1>

          <div className="container-tertiary">
            <label htmlFor="orderNumber" className="font--primary">
              orderNumber
              <input
                onChange={this.onChange}
                name="orderNumber"
                className="input"
              />
            </label>
          </div>
          <div className="container-tertiary">
            <label htmlFor="paymentMethodID" className="font--primary">
              paymentMethodID
              <input
                onChange={this.onChange}
                name="paymentMethodID"
                className="input"
              />
            </label>
          </div>

          <div className="container-tertiary">
            <button
              style={buttonStyle}
              type="button"
              className="btn btn--secondary font--primary"
              onClick={() => {
                this.initPayment()
              }}>
              Initialize Payment
            </button>
          </div>
          <textarea
            name="step6"
            style={styleResult}
            value={step6}
            onChange={this.onChange}
            hidden={step6 === ''}
          />
        </div>

        <div className="container">
          <h1 className="font--primary" style={titleStyle}>
            STEP 7
          </h1>

          <div className="container-tertiary">
            <label htmlFor="parameter3" className="font--primary">
              Parameter 3
              <input
                onChange={this.onChange}
                name="parameter3"
                className="input"
              />
            </label>
          </div>
          <div className="container-tertiary">
            <label htmlFor="name" className="font--primary">
              name
              <input
                onChange={this.onChange}
                name="name"
                className="input"
                value={creditCardToken.name}
              />
            </label>
          </div>
          <div className="container-tertiary">
            <label htmlFor="identificationNumber" className="font--primary">
              identificationNumber
              <input
                onChange={this.onChange}
                name="identificationNumber"
                className="input"
                value={creditCardToken.identificationNumber}
              />
            </label>
          </div>
          <div className="container-tertiary">
            <label htmlFor="paymentMethod" className="font--primary">
              paymentMethod
              <input
                onChange={this.onChange}
                name="paymentMethod"
                className="input"
                value={creditCardToken.paymentMethod}
              />
            </label>
          </div>
          <div className="container-tertiary">
            <label htmlFor="number" className="font--primary">
              number
              <input
                onChange={this.onChange}
                name="number"
                className="input"
                value={creditCardToken.number}
              />
            </label>
          </div>
          <div className="container-tertiary">
            <label htmlFor="expirationDate" className="font--primary">
              expirationDate
              <input
                onChange={this.onChange}
                name="expirationDate"
                className="input"
                value={creditCardToken.expirationDate}
              />
            </label>
          </div>

          <div className="container-tertiary">
            <button
              style={buttonStyle}
              type="button"
              className="btn btn--secondary font--primary"
              onClick={() => {
                this.generateCardToken()
              }}>
              Generate Card Token
            </button>
          </div>
          <textarea
            name="step7"
            style={styleResult}
            value={step7}
            onChange={this.onChange}
            hidden={step7 === ''}
          />
        </div>

        <div className="container">
          <h1 className="font--primary" style={titleStyle}>
            STEP 8
          </h1>

          <div className="container-tertiary">
            <button
              style={buttonStyle}
              type="button"
              className="btn btn--secondary font--primary"
              onClick={() => {
                this.paymanetRegister()
              }}>
              Payment Register MIDDLEWARE
            </button>
          </div>
          <textarea
            name="step8"
            style={styleResult}
            value={step8}
            onChange={this.onChange}
            hidden={step8 === ''}
          />
        </div>

        <div className="container">
          <h1 className="font--primary" style={titleStyle}>
            STEP 9
          </h1>

          <div className="container-tertiary">
            <label htmlFor="token" className="font--primary">
              Token
              <input onChange={this.onChange} name="token" className="input" />
            </label>
          </div>

          <div className="container-tertiary">
            <button
              style={buttonStyle}
              type="button"
              className="btn btn--secondary font--primary"
              onClick={() => {
                this.finalizePayment()
              }}>
              Finalize Payment
            </button>
          </div>
          <textarea
            name="step9"
            style={styleResult}
            value={step9}
            onChange={this.onChange}
            hidden={step9 === ''}
          />
        </div>
      </>
    )
  }
}

export default AddToCart
