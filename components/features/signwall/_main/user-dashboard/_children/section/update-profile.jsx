/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react'
import Services from '../../../utils/services'
import {
  namesRegex,
  numberRegex,
  docRegex,
  emailRegex,
  phoneRegex,
} from '../../../utils/regex'
import { clean } from '../../../utils/object'
import GetProfile from '../../../utils/get-profile'

const services = new Services()

const SET_ATTRIBUTES_PROFILE = [
  'documentType',
  'documentNumber',
  'civilStatus',
  'country',
  'department',
  'province',
  'district',
]
const GET_ATTRIBUTES_PROFILE = ['mobilePhone', ...SET_ATTRIBUTES_PROFILE]

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

    this.state = {
      showMsgSuccess: false,
      showMsgError: false,
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
        textSubmit: 'Guardar Cambios',
        typeDocLenghtMax: _attrib.documentType !== 'dni' ? '15' : '8',
        typeDocLenghtMin: _attrib.documentType !== 'dni' ? '5' : '8',
        typeDoc: _attrib.documentType !== 'dni' ? 'text' : 'numeric',
      },
      publicProfile,
      _attrib
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

    // return attributes.reduce((prev, { name, value }) => {
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
    const result = services.getUbigeo(value)

    result
      .then(geoData => {
        const GeoUpper = geo.charAt(0).toUpperCase() + geo.slice(1)
        Object.assign(state, {
          [`data${GeoUpper}s`]: geoData,
        })
        this.setState(state)
      })
      .catch(() => {
        window.console.error()
      })
  }

  getAtributes = (state, list = []) => {
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

  handleUpdateProfile = e => {
    e.preventDefault()

    const { handlerUpdateName } = this.props

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
      attributes: [
        ...this.getAtributes(restState, SET_ATTRIBUTES_PROFILE),
        ...this._backup_attributes,
      ],
    }
    clean(profile)

    this.setState({ loading: true, textSubmit: 'Guardando...' })

    window.Identity.updateUserProfile(profile)
      .then(() => {
        this.setState({
          showMsgSuccess: true,
          loading: false,
          hasChange: false,
          textSubmit: 'Guardar cambios',
        })

        setTimeout(() => {
          this.setState({
            showMsgSuccess: false,
          })
        }, 5000)

        const modalConfirmPass = document.querySelector('#arc-popup-profile')
        if (modalConfirmPass) {
          modalConfirmPass.scrollIntoView()
        }

        handlerUpdateName(profile.firstName)
      })
      .catch(() => {
        this.setState({
          showMsgError: false,
          loading: false,
          textSubmit: 'Guardar cambios',
        })
        setTimeout(() => {
          this.setState({
            showMsgError: false,
          })
        }, 5000)
      })
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
      // let { typeDocLenghtMin, typeDoc, documentNumber } = state;
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

  handleValidation = e => {
    const { name, value } = e.target
    const { formErrors } = this.state
    const { documentType } = this.state

    const minLenghtInput = e.target.getAttribute('minlength')
    const typeDoc = e.target.getAttribute('typedoc')

    switch (name) {
      case 'firstName':
        if (value.length < 3) {
          formErrors.firstName = 'Longitud inválida, mínimo 3 caracteres'
        } else if (
          namesRegex.test(value) &&
          (value !== 'null' && value !== 'undefined')
        ) {
          formErrors.firstName = ''
        } else {
          formErrors.firstName = 'Formato inválido, solo letras'
        }
        break
      case 'lastName':
        if (value.length < 3) {
          formErrors.lastName = 'Longitud inválida, mínimo 3 caracteres'
        } else if (
          namesRegex.test(value) &&
          (value !== 'null' && value !== 'undefined')
        ) {
          formErrors.lastName = ''
        } else {
          formErrors.lastName = 'Formato inválido, solo letras'
        }
        break
      case 'secondLastName':
        if (value.length < 3) {
          formErrors.secondLastName = 'Longitud inválida, mínimo 3 caracteres'
        } else if (
          namesRegex.test(value) &&
          (value !== 'null' && value !== 'undefined')
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
    } = this.state

    const [primaryPhone = { phone: null }] = contacts
    const { phone } = primaryPhone

    return (
      <form className="form-grid" onSubmit={e => this.handleUpdateProfile(e)}>
        <div className="form-grid__row form-grid__row--btw">
          <h3 className="form-grid__title">Tus datos</h3>
          <div className="message">
            <p
              className={`message--success ${showMsgSuccess &&
                'message--active'}`}>
              TUS DATOS HAN SIDO ACTUALIZADOS
            </p>
            <p
              className={`message--error ${showMsgError && 'message--active'}`}>
              HA OCURRIDO UN ERROR. VERIFICA TUS DATOS
            </p>
          </div>
        </div>
        <div className="form-grid__row form-grid__row--three">
          <div className="form-group">
            <input
              type="text"
              name="firstName"
              className={
                formErrors.firstName.length > 0
                  ? 'form-group__input form-group__input--error capitalize'
                  : 'form-group__input capitalize'
              }
              placeholder="Nombres"
              noValidate
              maxLength="50"
              onChange={e => {
                this.handleOnChange(e)
                this.handleValidation(e)
              }}
              defaultValue={firstName}
              // eslint-disable-next-line jsx-a11y/tabindex-no-positive
              tabIndex="1"
              disabled={!email}
            />
            <label htmlFor="name" className="form-group__label">
              Nombres
            </label>
            {formErrors.firstName.length > 0 && (
              <span className="message__error">{formErrors.firstName}</span>
            )}
          </div>
          <div className="form-group">
            <input
              type="text"
              name="lastName"
              className={
                formErrors.lastName.length > 0
                  ? 'form-group__input form-group__input--error capitalize'
                  : 'form-group__input capitalize'
              }
              placeholder="Apellido Paterno"
              noValidate
              maxLength="50"
              onChange={e => {
                this.handleValidation(e)
                this.handleOnChange(e)
              }}
              defaultValue={lastName}
              // eslint-disable-next-line jsx-a11y/tabindex-no-positive
              tabIndex="2"
              disabled={!email}
            />
            <label htmlFor="lastnameP" className="form-group__label">
              Apellido Paterno
            </label>
            {formErrors.lastName.length > 0 && (
              <span className="message__error">{formErrors.lastName}</span>
            )}
          </div>
          <div className="form-group">
            <input
              type="text"
              name="secondLastName"
              className={
                formErrors.secondLastName.length > 0
                  ? 'form-group__input form-group__input--error capitalize'
                  : 'form-group__input capitalize'
              }
              placeholder="Apellido Materno"
              noValidate
              maxLength="50"
              onChange={e => {
                this.handleValidation(e)
                this.handleOnChange(e)
              }}
              defaultValue={secondLastName}
              // eslint-disable-next-line jsx-a11y/tabindex-no-positive
              tabIndex="3"
              disabled={!email}
            />
            <label htmlFor="secondLastName" className="form-group__label">
              Apellido Materno
            </label>
            {formErrors.secondLastName.length > 0 && (
              <span className="message__error">
                {formErrors.secondLastName}
              </span>
            )}
          </div>
        </div>

        <div className="form-grid__row form-grid__row--three">
          <div className="form-group">
            <div className="form-group--combo">
              <select
                name="documentType"
                className={
                  formErrors.typeDocument.length > 0
                    ? 'form-group__input form-group__input--minimal form-group__input--error'
                    : 'form-group__input form-group__input--minimal'
                }
                defaultValue={
                  documentType ? documentType.toUpperCase() : 'default'
                }
                onChange={e => {
                  this.handleOnChange(e)
                  this.handleTypeDocument(e)
                  this.handleValidation(e)
                }}
                // eslint-disable-next-line jsx-a11y/tabindex-no-positive
                tabIndex="4"
                disabled={!email}>
                <option disabled="disabled" value="default">
                  Seleccione
                </option>
                <option value="DNI">DNI</option>
                <option value="CEX">CEX</option>
                <option value="CDI">CDI</option>
              </select>
              <label htmlFor="statusCivil" className="form-group__label">
                Tipo Doc.
              </label>

              <input
                type="text"
                name="documentNumber"
                className={
                  formErrors.documentNumber.length > 0
                    ? 'form-group__input form-group__input--error'
                    : 'form-group__input'
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
                // eslint-disable-next-line jsx-a11y/tabindex-no-positive
                tabIndex="5"
                disabled={!email}
              />
            </div>
            {formErrors.documentNumber.length > 0 && (
              <span className="message__error">
                {formErrors.documentNumber}
              </span>
            )}
            {formErrors.typeDocument.length > 0 && (
              <span className="message__error">{formErrors.typeDocument}</span>
            )}
          </div>
          <div className="form-group">
            <select
              name="civilStatus"
              className="form-group__input form-group__input--minimal"
              value={civilStatus ? civilStatus.toUpperCase() : 'default'}
              onChange={e => {
                this.handleOnChange(e)
                this.handleValidation(e)
              }}
              // eslint-disable-next-line jsx-a11y/tabindex-no-positive
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
            <label htmlFor="statusCivil" className="form-group__label">
              Estado Civil
            </label>
          </div>
          <div className="form-group">
            <input
              type="text"
              name="mobilePhone"
              className={
                formErrors.mobilePhone.length > 0
                  ? 'form-group__input form-group__input--error'
                  : 'form-group__input'
              }
              placeholder="Número de Celular"
              noValidate
              maxLength="12"
              onChange={e => {
                this.handleOnChange(e)
                this.handleValidation(e)
              }}
              defaultValue={phone}
              // eslint-disable-next-line jsx-a11y/tabindex-no-positive
              tabIndex="7"
              disabled={!email}
              autoComplete="off"
            />
            <label htmlFor="mobilePhone" className="form-group__label">
              Número de Celular
            </label>
            {formErrors.mobilePhone.length > 0 && (
              <span className="message__error">{formErrors.mobilePhone}</span>
            )}
          </div>
        </div>

        <div className="form-grid__row form-grid__row--three">
          <div className="form-group">
            <select
              name="country"
              className="form-group__input form-group__input--minimal"
              value={country || 'default'}
              onChange={e => {
                this.handleOnChange(e)
                this._getUbigeo(e, 'department')
                this.handleValidation(e)
              }}
              // eslint-disable-next-line jsx-a11y/tabindex-no-positive
              tabIndex="8"
              disabled={!email}>
              <option disabled="disabled" value="default">
                Seleccione
              </option>
              <option value="260000">Perú</option>
            </select>
            <label htmlFor="País" className="form-group__label">
              País
            </label>
          </div>
          <div className="form-group">
            <select
              name="department"
              className="form-group__input form-group__input--minimal"
              value={department || 'default'}
              onChange={e => {
                this.handleOnChange(e)
                this._getUbigeo(e, 'province')
                this.handleValidation(e)
              }}
              // eslint-disable-next-line jsx-a11y/tabindex-no-positive
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

            <label htmlFor="Departamento" className="form-group__label">
              Departamento
            </label>
          </div>
          <div className="form-group">
            <select
              name="province"
              className="form-group__input form-group__input--minimal"
              value={province || 'default'}
              onChange={e => {
                this.handleOnChange(e)
                this._getUbigeo(e, 'district')
                this.handleValidation(e)
              }}
              // eslint-disable-next-line jsx-a11y/tabindex-no-positive
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
            <label htmlFor="Provincia" className="form-group__label">
              Provincia
            </label>
          </div>
        </div>

        <div className="form-grid__row form-grid__row--three">
          <div className="form-group">
            <select
              name="district"
              className="form-group__input form-group__input--minimal"
              value={district || 'default'}
              onChange={e => {
                this.handleValidation(e)
                this.handleOnChange(e)
              }}
              // eslint-disable-next-line jsx-a11y/tabindex-no-positive
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
            <label htmlFor="Distrito" className="form-group__label">
              Distrito
            </label>
          </div>
          <div className="form-group">
            <input
              type="text"
              name="email"
              className={
                formErrors.userEmail.length > 0
                  ? 'form-group__input form-group__input--error'
                  : 'form-group__input'
              }
              placeholder="Correo electrónico"
              noValidate
              maxLength="30"
              defaultValue={email}
              // eslint-disable-next-line jsx-a11y/tabindex-no-positive
              tabIndex="12"
              disabled={email !== null}
              onChange={e => {
                this.handleValidation(e)
                this.handleOnChange(e)
              }}
            />
            <label htmlFor="email" className="form-group__label">
              Correo electrónico
            </label>
            {formErrors.userEmail.length > 0 && (
              <span className="message__error">{formErrors.userEmail}</span>
            )}
          </div>
          <div className="form-group">
            <input
              type="submit"
              className="btn btn--blue btn-bg"
              value={textSubmit}
              disabled={!hasChange || loading || hasError}
              // eslint-disable-next-line jsx-a11y/tabindex-no-positive
              tabIndex="13"
            />
          </div>
        </div>
      </form>
    )
  }
}

export default UpdateProfile
