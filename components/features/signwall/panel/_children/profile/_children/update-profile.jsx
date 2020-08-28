/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/tabindex-no-positive */
/* eslint-disable react/no-string-refs */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */

import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import Services from '../../../../_dependencies/services'
import {
  namesRegex,
  numberRegex,
  docRegex,
  emailRegex,
  phoneRegex,
} from '../../../../_dependencies/regex'
import { clean } from '../../../../_dependencies/object'
import GetProfile from '../../../../_dependencies/get-profile'
import Domains from '../../../../_dependencies/domains'
import { FormGrid, FormGroup, Message } from './styled'
import { Text, Button } from '../../../../_children/forms/styles'
import Modal from '../../../../_children/modal'
import { Close } from '../../../../_children/iconos'

const SET_ATTRIBUTES_PROFILE = [
  'documentType',
  'documentNumber',
  'civilStatus',
  'country',
  'department',
  'province',
  'district',
  'secondLastName',
]
const GET_ATTRIBUTES_PROFILE = ['mobilePhone', ...SET_ATTRIBUTES_PROFILE]

@Consumer
class UpdateProfile extends Component {
  constructor(props) {
    super(props)
    const sociales = ['facebook', 'google']
    const { publicProfile } = new GetProfile()
    const { attributes = [] } = publicProfile
    const _attrib = this.attributeToObject(attributes)

    this._backup_attributes = Array.isArray(attributes)
      ? attributes.filter(({ name }) => !GET_ATTRIBUTES_PROFILE.includes(name))
      : []

    const { identities = [] } = publicProfile
    const [identitie = { type: 'Password' }] = identities || []

    const customVars = {
      showMsgSuccess: false,
      showMsgError: false,
      showModalConfirm: false,
      currentPassword: '',
      formErrorsConfirm: {
        currentPassword: '',
      },
      sending: true,
      sendingConfirmText: 'CONFIRMAR',
      messageErrorPass: '',
      messageErrorDelete: '',
    }

    this.state = Object.assign(
      {},
      {
        dataDepartments: [],
        dataProvinces: [],
        dataDistricts: [],
        disableNames: sociales.includes(identitie.type.toLowerCase()),
        formErrors: {
          firstName: '',
          lastName: '',
          secondLastName: '',
          mobilePhone: '',
          documentNumber: '',
          typeDocument: '',
          userEmail: '',
        },
        loading: false,
        hasChange: false,
        textSubmit: 'GUARDAR CAMBIOS',
        typeDocLenghtMax: _attrib.documentType !== 'dni' ? '15' : '8',
        typeDocLenghtMin: _attrib.documentType !== 'dni' ? '5' : '8',
        typeDoc: _attrib.documentType !== 'dni' ? 'text' : 'numeric',
      },
      publicProfile,
      _attrib,
      customVars
    )
  }

  attributeToObject = (attributes = []) => {
    if (attributes === null) return {}

    const clearObject = []
    for (let i = 0; i < attributes.length; i++) {
      if (attributes[i].value !== null) {
        clearObject.push(attributes[i])
      }
    }

    return clearObject.reduce((prev, { name, value }) => {
      const newPrev = prev
      switch (name) {
        case 'mobilePhone':
          newPrev.contacts = [{ type: 'PRIMARY', phone: value }]
          break
        default:
          newPrev[name] = value
          break
      }
      return prev
    }, {})
  }

  componentDidMount = () => {
    const { country, department, province } = this.state

    if (country) {
      this._getUbigeo(country, 'department')
    }

    if (department) {
      this._getUbigeo(department, 'province')
    }

    if (province) {
      this._getUbigeo(province, 'district')
    }
  }

  _getUbigeo = (input, geo) => {
    const state = {}
    let value = input
    const hasTarget = Object.prototype.hasOwnProperty.call(input, 'target')
    if (hasTarget) {
      const newValue = input.target.value
      value = newValue
      switch (geo) {
        case 'departament':
          state.departament = 'default'
          state.province = 'default'
          state.district = 'default'
          break
        case 'province':
          state.province = 'default'
          state.district = 'default'
          break
        default:
      }
    }
    const result = Services.getUbigeo(value)

    result
      .then(geoData => {
        const GeoUpper = geo.charAt(0).toUpperCase() + geo.slice(1)
        Object.assign(state, {
          [`data${GeoUpper}s`]: geoData,
        })
        this.setState(state)
      })
      .catch(() => {
        // window.console.error()
      })
  }

  getAtributes = (state, list = []) => {
    if (typeof window !== 'undefined') {
      return list.reduce((prev, item) => {
        if (
          Object.prototype.hasOwnProperty.call(state, item) &&
          state[item] !== ''
        ) {
          prev.push({
            name: item,
            value: state[item],
            type: 'String',
          })
        }
        return prev
      }, [])
    }
    return null
  }

  handleUpdateProfile = () => {
    const { arcSite } = this.props

    const {
      firstName,
      lastName,
      secondLastName,
      displayName,
      email,
      contacts,
      ...restState
    } = this.state

    const profile = {
      firstName,
      lastName,
      secondLastName,
      displayName,
      email,
      contacts,
    }
    clean(profile)

    profile.attributes = [
      ...this.getAtributes(restState, SET_ATTRIBUTES_PROFILE),
      ...this._backup_attributes,
    ].map(attribute => {
      if (attribute.name === 'originReferer' && attribute.value) {
        return {
          ...attribute,
          value: attribute.value
            .split('&')[0]
            .replace(/(\/|=|#|\/#|#\/|=\/|\/=)$/, ''),
        }
      }
      if (!attribute.value) {
        return {
          ...attribute,
          value: 'undefined',
        }
      }
      return attribute
    }) // work around - [MEJORA]

    this.setState({ loading: true, textSubmit: 'GUARDANDO...' })

    if (typeof window !== 'undefined') {
      window.Identity.apiOrigin = Domains.getOriginAPI(arcSite)
      window.Identity.updateUserProfile(profile)
        .then(() => {
          this.setState({
            showMsgSuccess: true,
            loading: false,
            hasChange: false,
            textSubmit: 'GUARDAR CAMBIOS',
          })

          const modalConfirmPass = document.getElementById('profile-signwall')
          if (modalConfirmPass) {
            modalConfirmPass.scrollIntoView()
          }

          const textProfile = document.getElementById('name-user-profile')
          if (textProfile) {
            textProfile.textContent = `Hola ${
              profile.firstName ? profile.firstName : 'Usuario'
            }`
          }

          setTimeout(() => {
            this.setState({
              showMsgSuccess: false,
            })
          }, 5000)

          this.dispatchEvent('profileUpdate', profile)
        })
        .catch(errUpdate => {
          if (errUpdate.code === '100018') {
            this.setState({
              showModalConfirm: true,
            })
          } else if (errUpdate.code === '3001001') {
            this.setState({
              messageErrorDelete:
                'Al parecer hubo un problema con su cuenta, intente ingresar nuevamente. ',
              showMsgError: true,
            })
          } else {
            this.setState({
              messageErrorPass:
                'Ha ocurrido un error al actualizar. Inténtalo en otro momento.',
              showMsgError: true,
            })
            setTimeout(() => {
              this.setState({
                showMsgError: false,
              })
            }, 5000)
          }
        })
        .finally(() => {
          this.setState({
            loading: false,
            textSubmit: 'GUARDAR CAMBIOS',
          })
        })
    }
  }

  handleOnChange = e => {
    if (e.target.name === 'mobilePhone') {
      this.setState({
        contacts: [{ type: 'PRIMARY', phone: e.target.value }],
        hasChange: true,
      })
    } else {
      this.setState({
        [e.target.name]: e.target.value,
        hasChange: true,
      })
    }
  }

  handleTypeDocument = e => {
    e.preventDefault()
    const { value } = e.target
    let state = {}
    switch (value) {
      case 'DNI':
        state = {
          typeDocLenghtMax: '8',
          typeDocLenghtMin: '8',
          typeDoc: 'numeric',
        }
        break
      case 'CDI':
      case 'CEX':
        state = {
          typeDocLenghtMin: '5',
          typeDocLenghtMax: '15',
          typeDoc: 'text',
        }
        break
      default:
    }

    this.setState(state, () => {
      let { documentNumber } = this.state
      documentNumber = documentNumber !== undefined ? documentNumber : ''
      const { typeDocLenghtMin, typeDoc } = state
      const minLenghtInput = typeDocLenghtMin
      const { formErrors } = this.state

      if (typeDoc === 'numeric') {
        if (
          documentNumber.length < minLenghtInput ||
          documentNumber.length > minLenghtInput
        ) {
          formErrors.documentNumber = `Longitud inválida, requiere ${minLenghtInput} dígitos`
        } else if (numberRegex.test(documentNumber)) {
          formErrors.documentNumber = ''
        } else {
          formErrors.documentNumber = 'Formato inválido. Solo números'
        }
      } else if (typeDoc === 'text') {
        if (documentNumber.length < minLenghtInput) {
          formErrors.documentNumber = `Longitud inválida, mínimo ${minLenghtInput} dígitos`
        } else if (docRegex.test(documentNumber)) {
          formErrors.documentNumber = ''
        } else {
          formErrors.documentNumber = 'Formato inválido.'
        }
      }

      this.setState({
        formErrors,
      })
    })
  }

  changeValidationConfirm = e => {
    const { name, value } = e.target
    const { formErrorsConfirm } = this.state
    const space =
      value.indexOf(' ') >= 0
        ? 'Contraseña inválida, no se permite espacios'
        : ''
    const min = value.length < 8 ? 'Mínimo 8 caracteres' : space

    formErrorsConfirm.currentPassword =
      value.length === 0 ? 'Este campo es requerido' : min

    this.setState({ formErrorsConfirm, [name]: value })

    if (formErrorsConfirm.currentPassword.length >= 1) {
      this.setState({
        sending: true,
      })
    } else {
      this.setState({
        sending: false,
      })
    }
  }

  handleValidation = e => {
    const { name, value } = e.target
    const { formErrors } = this.state
    const { documentType } = this.state

    const minLenghtInput = e.target.getAttribute('minlength')
    const typeDoc = e.target.getAttribute('typedoc')

    switch (name) {
      case 'firstName':
        if (value.length < 2) {
          formErrors.firstName = 'Longitud inválida, mínimo 2 caracteres'
        } else if (
          namesRegex.test(value) &&
          value !== 'null' &&
          value !== 'undefined'
        ) {
          formErrors.firstName = ''
        } else {
          formErrors.firstName = 'Formato inválido, solo letras'
        }
        break
      case 'lastName':
        if (value.length < 2) {
          formErrors.lastName = 'Longitud inválida, mínimo 2 caracteres'
        } else if (
          namesRegex.test(value) &&
          value !== 'null' &&
          value !== 'undefined'
        ) {
          formErrors.lastName = ''
        } else {
          formErrors.lastName = 'Formato inválido, solo letras'
        }
        break
      case 'secondLastName':
        if (value.length < 2) {
          formErrors.secondLastName = 'Longitud inválida, mínimo 2 caracteres'
        } else if (
          namesRegex.test(value) &&
          value !== 'null' &&
          value !== 'undefined'
        ) {
          formErrors.secondLastName = ''
        } else {
          formErrors.secondLastName = 'Formato inválido, solo letras'
        }
        break
      case 'mobilePhone':
        if (value.length < 9 || value.length > 12) {
          formErrors.mobilePhone = 'Longitud inválida, entre 9  y 12 caracteres'
        } else if (phoneRegex.test(value)) {
          formErrors.mobilePhone = ''
        } else {
          formErrors.mobilePhone = 'Formato inválido. Solo números y guiones'
        }
        break
      case 'documentNumber':
        if (typeDoc === 'numeric') {
          if (value.length < minLenghtInput || value.length > minLenghtInput) {
            formErrors.documentNumber = `Longitud inválida, requiere ${minLenghtInput} dígitos`
          } else if (numberRegex.test(value)) {
            formErrors.documentNumber = ''
          } else {
            formErrors.documentNumber = 'Formato inválido. Solo números'
          }
        } else if (typeDoc === 'text') {
          if (value.length < minLenghtInput) {
            formErrors.documentNumber = `Longitud inválida, mínimo ${minLenghtInput} dígitos`
          } else if (docRegex.test(value)) {
            formErrors.documentNumber = ''
          } else {
            formErrors.documentNumber = 'Formato inválido.'
          }
        }
        if (documentType === undefined || documentType === null) {
          formErrors.typeDocument = 'Ingresar tipo documento'
        }
        break

      case 'documentType':
        if (value !== '') {
          formErrors.typeDocument = ''
        } else {
          formErrors.typeDocument = 'Ingresar tipo documento'
        }
        break

      case 'email':
        if (value.length === 0) {
          formErrors.userEmail = 'Este campo es requerido'
        } else if (emailRegex.test(value)) {
          formErrors.userEmail = ''
        } else {
          formErrors.userEmail = 'Correo Electrónico Inválido'
        }
        break
      default:
    }

    this.setState({ formErrors, [name]: value }, () => {
      if (
        formErrors.firstName.length > 0 ||
        formErrors.lastName.length > 0 ||
        formErrors.secondLastName.length > 0 ||
        formErrors.documentNumber.length > 0 ||
        formErrors.mobilePhone.length > 0 ||
        formErrors.typeDocument.length > 0
      ) {
        this.setState({
          hasError: true,
        })
      } else {
        this.setState({
          hasError: false,
        })
      }
    })
  }

  onLogout = e => {
    e.preventDefault()
    if (typeof window !== 'undefined') {
      const linkLogout = document.getElementById('web_link_cerrarsesion')
      if (linkLogout) {
        linkLogout.click()
      }
    }
  }

  submitConfirmPassword = e => {
    e.preventDefault()

    const { formErrorsConfirm, currentPassword, email } = this.state
    const { arcSite } = this.props

    formErrorsConfirm.oldPassword =
      currentPassword.length === 0 ? 'Este campo es requerido' : ''
    this.setState({ formErrorsConfirm })

    if (
      typeof window !== 'undefined' &&
      formErrorsConfirm.currentPassword === ''
    ) {
      this.setState({ sending: true, sendingConfirmText: 'CONFIRMANDO...' })

      window.Identity.apiOrigin = Domains.getOriginAPI(arcSite)

      const currentEmail = email || window.Identity.userProfile.email

      window.Identity.login(currentEmail, currentPassword, {
        rememberMe: true,
        cookie: true,
      })
        .then(() => {
          this.handleUpdateProfile()
          this.setState({
            showMsgSuccess: true,
          })
          setTimeout(() => {
            this.setState({
              showMsgSuccess: false,
            })
          }, 5000)
        })
        .catch(() => {
          this.setState({
            messageErrorPass:
              'Ha ocurrido un error al actualizar. Contraseña Incorrecta.',
            showMsgError: true,
          })

          setTimeout(() => {
            this.setState({
              showMsgError: false,
            })
          }, 5000)
        })
        .finally(() => {
          this.setState({
            currentPassword: '',
            showModalConfirm: false,
            sending: false,
            sendingConfirmText: 'CONFIRMAR',
          })

          const ModalProfile =
            document.getElementById('profile-signwall').parentNode ||
            document.getElementById('profile-signwall').parentElement
          ModalProfile.style.overflow = 'auto'
        })
    }
  }

  togglePopupModalConfirm() {
    const { showModalConfirm } = this.state
    this.setState({
      showModalConfirm: !showModalConfirm,
    })

    const ModalProfile =
      document.getElementById('profile-signwall').parentNode ||
      document.getElementById('profile-signwall').parentElement
    if (showModalConfirm) {
      ModalProfile.style.overflow = 'auto'
    } else {
      ModalProfile.style.overflow = 'hidden'
    }
  }

  render() {
    const {
      formErrors,
      firstName,
      lastName,
      secondLastName,
      documentType,
      province,
      documentNumber,
      civilStatus,
      contacts,
      country,
      department,
      district,
      email,
      hasChange,
      loading,
      hasError,
      showMsgSuccess,
      showMsgError,
      typeDocLenghtMin,
      typeDocLenghtMax,
      typeDoc,
      dataDepartments,
      dataProvinces,
      dataDistricts,
      textSubmit,
      showModalConfirm,
      formErrorsConfirm,
      sending,
      sendingConfirmText,
      messageErrorPass,
      messageErrorDelete,
    } = this.state

    const {
      siteProperties: {
        signwall: { mainColorBtn },
      },
    } = this.props

    const [primaryPhone = { phone: null }] = contacts
    const { phone } = primaryPhone

    return (
      <>
        <FormGrid
          onSubmit={e => {
            e.preventDefault()
            this.handleUpdateProfile()
          }}>
          <div className="row btw">
            <h3 className="title">Mis Datos</h3>
          </div>

          {showMsgSuccess && (
            <Message success>
              Tus datos de perfil han sido actualizados correctamente.
            </Message>
          )}

          {showMsgError && (
            <Message failed>
              {messageErrorDelete ? (
                <>
                  {messageErrorDelete}
                  <a
                    href="#"
                    onClick={e => {
                      e.preventDefault()
                      this.onLogout(e)
                    }}>
                    Clic Aquí
                  </a>
                </>
              ) : (
                messageErrorPass
              )}
            </Message>
          )}

          <div className="row three">
            <FormGroup>
              <input
                type="text"
                name="firstName"
                className={
                  formErrors.firstName.length > 0
                    ? 'input error capitalize'
                    : 'input capitalize'
                }
                placeholder="Nombres"
                noValidate
                maxLength="50"
                onChange={e => {
                  this.handleOnChange(e)
                  this.handleValidation(e)
                }}
                defaultValue={firstName}
                tabIndex="1"
                disabled={!email}
              />
              <label htmlFor="name" className="label">
                Nombres
              </label>
              {formErrors.firstName.length > 0 && (
                <span className="error">{formErrors.firstName}</span>
              )}
            </FormGroup>
            <FormGroup>
              <input
                type="text"
                name="lastName"
                className={
                  formErrors.lastName.length > 0
                    ? 'input error capitalize'
                    : 'input capitalize'
                }
                placeholder="Apellido Paterno"
                noValidate
                maxLength="50"
                onChange={e => {
                  this.handleValidation(e)
                  this.handleOnChange(e)
                }}
                defaultValue={lastName}
                tabIndex="2"
                disabled={!email}
              />
              <label htmlFor="lastnameP" className="label">
                Apellido Paterno
              </label>
              {formErrors.lastName.length > 0 && (
                <span className="error">{formErrors.lastName}</span>
              )}
            </FormGroup>
            <FormGroup>
              <input
                type="text"
                name="secondLastName"
                className={
                  formErrors.secondLastName.length > 0
                    ? 'input error capitalize'
                    : 'input capitalize'
                }
                placeholder="Apellido Materno"
                noValidate
                maxLength="50"
                onChange={e => {
                  this.handleValidation(e)
                  this.handleOnChange(e)
                }}
                defaultValue={secondLastName}
                tabIndex="3"
                disabled={!email}
              />
              <label htmlFor="secondLastName" className="label">
                Apellido Materno
              </label>
              {formErrors.secondLastName.length > 0 && (
                <span className="error">{formErrors.secondLastName}</span>
              )}
            </FormGroup>
          </div>

          <div className="row three">
            <FormGroup>
              <div className="combo">
                <select
                  name="documentType"
                  className={
                    formErrors.typeDocument.length > 0
                      ? 'input input-minimal error'
                      : 'input input-minimal'
                  }
                  defaultValue={
                    documentType ? documentType.toUpperCase() : 'default'
                  }
                  onChange={e => {
                    this.handleOnChange(e)
                    this.handleTypeDocument(e)
                    this.handleValidation(e)
                  }}
                  tabIndex="4"
                  disabled={!email}>
                  <option disabled="disabled" value="default">
                    Seleccione
                  </option>
                  <option value="DNI">DNI</option>
                  <option value="CEX">CEX</option>
                  <option value="CDI">CDI</option>
                </select>
                <label htmlFor="statusCivil" className="label">
                  Tipo Doc.
                </label>

                <input
                  type="text"
                  name="documentNumber"
                  className={
                    formErrors.documentNumber.length > 0
                      ? 'input error'
                      : 'input'
                  }
                  placeholder="Num Documento"
                  noValidate
                  minLength={typeDocLenghtMin}
                  maxLength={typeDocLenghtMax}
                  typedoc={typeDoc}
                  onChange={e => {
                    this.handleOnChange(e)
                    this.handleValidation(e)
                  }}
                  onBlur={e => this.handleValidation(e)}
                  defaultValue={documentNumber}
                  tabIndex="5"
                  disabled={!email}
                />
              </div>
              {formErrors.documentNumber.length > 0 && (
                <span className="error">{formErrors.documentNumber}</span>
              )}
              {formErrors.typeDocument.length > 0 && (
                <span className="error">{formErrors.typeDocument}</span>
              )}
            </FormGroup>
            <FormGroup>
              <select
                name="civilStatus"
                className="input input-minimal"
                value={civilStatus ? civilStatus.toUpperCase() : 'default'}
                onChange={e => {
                  this.handleOnChange(e)
                  this.handleValidation(e)
                }}
                tabIndex="6"
                disabled={!email}>
                <option disabled="disabled" value="default">
                  Seleccione
                </option>
                <option value="SO">Soltero(a)</option>
                <option value="CA">Casado(a)</option>
                <option value="DI">Divorciado(a)</option>
                <option value="VI">Viudo(a)</option>
              </select>
              <label htmlFor="statusCivil" className="label">
                Estado Civil
              </label>
            </FormGroup>
            <FormGroup>
              <input
                type="text"
                name="mobilePhone"
                className={
                  formErrors.mobilePhone.length > 0 ? 'input error' : 'input'
                }
                placeholder="Número de Celular"
                noValidate
                maxLength="12"
                onChange={e => {
                  this.handleOnChange(e)
                  this.handleValidation(e)
                }}
                defaultValue={phone}
                tabIndex="7"
                disabled={!email}
                autoComplete="off"
              />
              <label htmlFor="mobilePhone" className="label">
                Número de Celular
              </label>
              {formErrors.mobilePhone.length > 0 && (
                <span className="error">{formErrors.mobilePhone}</span>
              )}
            </FormGroup>
          </div>

          <div className="row three">
            <FormGroup>
              <select
                name="country"
                className="input input-minimal"
                value={country || 'default'}
                onChange={e => {
                  this.handleOnChange(e)
                  this._getUbigeo(e, 'department')
                  this.handleValidation(e)
                }}
                tabIndex="8"
                disabled={!email}>
                <option disabled="disabled" value="default">
                  Seleccione
                </option>
                <option value="260000">Perú</option>
              </select>
              <label htmlFor="País" className="label">
                País
              </label>
            </FormGroup>
            <FormGroup>
              <select
                name="department"
                className="input input-minimal"
                value={department || 'default'}
                onChange={e => {
                  this.handleOnChange(e)
                  this._getUbigeo(e, 'province')
                  this.handleValidation(e)
                }}
                tabIndex="9"
                disabled={!email}>
                <option disabled="disabled" value="default">
                  Seleccione
                </option>
                {dataDepartments.map(([code, name]) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </select>

              <label htmlFor="Departamento" className="label">
                Departamento
              </label>
            </FormGroup>
            <FormGroup>
              <select
                name="province"
                className="input input-minimal"
                value={province || 'default'}
                onChange={e => {
                  this.handleOnChange(e)
                  this._getUbigeo(e, 'district')
                  this.handleValidation(e)
                }}
                tabIndex="10"
                disabled={!email}>
                <option disabled="disabled" value="default">
                  Seleccione
                </option>
                {dataProvinces.map(([code, name]) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </select>
              <label htmlFor="Provincia" className="label">
                Provincia
              </label>
            </FormGroup>
          </div>

          <div className="row three">
            <FormGroup>
              <select
                name="district"
                className="input input-minimal"
                value={district || 'default'}
                onChange={e => {
                  this.handleValidation(e)
                  this.handleOnChange(e)
                }}
                tabIndex="11"
                disabled={!email}>
                <option disabled="disabled" value="default">
                  Seleccione
                </option>
                {dataDistricts.map(([code, name]) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </select>
              <label htmlFor="Distrito" className="label">
                Distrito
              </label>
            </FormGroup>
            <FormGroup>
              <input
                type="text"
                name="email"
                className={
                  formErrors.userEmail.length > 0 ? 'input error' : 'input'
                }
                placeholder="Correo electrónico"
                noValidate
                maxLength="30"
                defaultValue={email}
                tabIndex="12"
                disabled={email !== null}
                onChange={e => {
                  this.handleValidation(e)
                  this.handleOnChange(e)
                }}
              />
              <label htmlFor="email" className="label">
                Correo electrónico
              </label>
              {formErrors.userEmail.length > 0 && (
                <span className="error">{formErrors.userEmail}</span>
              )}
            </FormGroup>
            <FormGroup>
              <Button
                type="submit"
                color={mainColorBtn}
                disabled={!hasChange || loading || hasError}
                tabIndex="13">
                {textSubmit}
              </Button>
            </FormGroup>
          </div>
        </FormGrid>

        {showModalConfirm && (
          <Modal
            size="mini"
            position="middle"
            bg="white"
            name="modal-div-confirmpass"
            id="modal-div-confirmpass">
            <div className="text-right">
              <button
                type="button"
                onClick={e => this.togglePopupModalConfirm(e)}>
                <Close />
              </button>
            </div>

            <div className="modal-body__wrapper">
              <FormGrid onSubmit={e => this.submitConfirmPassword(e)}>
                <Text c="gray" s="14" lh="28" className="mt-10 mb-10 center">
                  Para realizar los cambios, por favor ingresa tu contraseña
                </Text>

                <FormGroup full>
                  <input
                    type="password"
                    name="currentPassword"
                    className={
                      formErrorsConfirm.currentPassword.length > 0
                        ? 'input error'
                        : 'input'
                    }
                    placeholder="Contraseña"
                    noValidate
                    maxLength="50"
                    autoComplete="off"
                    onChange={e => {
                      this.setState({ currentPassword: e.target.value })
                      this.changeValidationConfirm(e)
                    }}
                  />
                  <label htmlFor="currentPassword" className="label">
                    Contraseña
                  </label>
                  {formErrorsConfirm.currentPassword.length > 0 && (
                    <span className="error">
                      {formErrorsConfirm.currentPassword}
                    </span>
                  )}
                </FormGroup>

                <Button type="submit" disabled={sending} color={mainColorBtn}>
                  {sendingConfirmText}
                </Button>
              </FormGrid>
            </div>
          </Modal>
        )}
      </>
    )
  }
}

export default UpdateProfile
