/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react'
import { setTimeout } from 'timers'
import Services from '../../../utils/services'
import { namesRegex, numberRegex, docRegex } from '../../../utils/regex'
import GetProfile from '../../../utils/get-profile'

const services = new Services()

class UpdateProfile extends Component {
  constructor(props) {
    super(props)

    const localProfile = window.localStorage.getItem('ArcId.USER_PROFILE')
    const profileLS = new GetProfile().profile

    const getAtributeHeader = atribute => {
      const attributesLS =
        localProfile !== 'null' && JSON.parse(localProfile).attributes
          ? JSON.parse(localProfile).attributes
          : []

      let valueItem

      attributesLS.forEach(item => {
        if (item.name === atribute && item.value !== 'undefined') {
          valueItem = item.value
        }
      })
      return valueItem
    }

    this.data = []
    this.state = {
      hiddenSuccessPass: false,
      hiddenSuccessError: false,
      dataDepartaments: [],
      dataProvince: [],
      dataDistric: [],
      attributes: {
        userName: localProfile !== 'null' ? profileLS.displayName : '',
        userEmail: localProfile !== 'null' ? profileLS.email : '',
        firstName:
          localProfile !== 'null' &&
          profileLS.firstName &&
          profileLS.firstName !== 'undefined'
            ? profileLS.firstName
            : '',
        lastName:
          localProfile !== 'null' &&
          profileLS.lastName &&
          profileLS.lastName !== 'undefined'
            ? profileLS.lastName
            : '',
        secondLastName:
          localProfile !== 'null' &&
          profileLS.secondLastName &&
          profileLS.secondLastName !== 'undefined'
            ? profileLS.secondLastName
            : '',

        // secondLastName: getAtributeHeader('secondLastName')
        //   ? getAtributeHeader('secondLastName')
        //   : '',
        documentType: getAtributeHeader('documentType')
          ? getAtributeHeader('documentType')
          : '',
        documentNumber: getAtributeHeader('documentNumber')
          ? getAtributeHeader('documentNumber')
          : '',
        civilStatus: getAtributeHeader('civilStatus')
          ? getAtributeHeader('civilStatus')
          : '',
        mobilePhone: getAtributeHeader('mobilePhone')
          ? getAtributeHeader('mobilePhone')
          : '',
        country: getAtributeHeader('country')
          ? getAtributeHeader('country')
          : '',
        department: getAtributeHeader('department')
          ? getAtributeHeader('department')
          : '',
        province: getAtributeHeader('province')
          ? getAtributeHeader('province')
          : '',
        district: getAtributeHeader('district')
          ? getAtributeHeader('district')
          : '',
      },
      disabledSocial:
        profileLS.identities != null
          ? profileLS.identities[0].type !== 'Password'
          : false,
      formErrors: {
        firstName: '',
        lastName: '',
        secondLastName: '',
        mobilePhone: '',
        documentNumber: '',
        typeDocument: '',
      },
      sending: false,
      textSubmit: 'Guardar Cambios',
      typeDocLenghtMax: '8',
      typeDocLenghtMin: '8',
      typeDoc: 'numeric',
      // profile: new GetProfile().profile,
    }
  }

  componentDidMount = () => {
    const { attributes } = this.state
    if (attributes.country) {
      this.changeCountry(attributes.country)
    }

    if (attributes.department) {
      this.changeDepartament(attributes.department)
    }

    if (attributes.province) {
      this.changeProvince(attributes.province)
    }
  }

  changeCountry = e => {
    const itemCountry = e.target ? e.target.value : e
    const result = services.getUbigeo(itemCountry)
    result
      .then(res => {
        this.setState({ dataDepartaments: [...res] })
      })
      .catch(err => {
        console.log(err.message)
      })
  }

  changeDepartament = e => {
    const itemDepartament = e.target ? e.target.value : e
    const result = services.getUbigeo(itemDepartament)
    result
      .then(res => {
        this.setState({ dataProvince: [...res] })
      })
      .catch(err => {
        console.log(err.message)
      })
  }

  changeProvince = e => {
    const itemProvince = e.target ? e.target.value : e
    const result = services.getUbigeo(itemProvince)
    result
      .then(res => {
        this.setState({ dataDistric: [...res] })
      })
      .catch(err => {
        console.log(err.message)
      })
  }

  getAtribute = atribute => {
    const localProfile = window.localStorage.getItem('ArcId.USER_PROFILE')
    const attributesLS = JSON.parse(localProfile).attributes
      ? JSON.parse(localProfile).attributes
      : []
    let valueItem

    attributesLS.forEach(item => {
      if (item.name === atribute) {
        valueItem = item.value
      }
    })

    return valueItem
  }

  handleUpdateProfile = e => {
    e.preventDefault()
    const { attributes } = this.state

    const dataComplete = {
      firstName: attributes.firstName ? attributes.firstName : 'undefined',
      lastName: attributes.lastName ? attributes.lastName : 'undefined',
      secondLastName: attributes.secondLastName
        ? attributes.secondLastName
        : 'undefined',
      displayName: attributes.userName
        ? attributes.userName
        : attributes.userEmail.split('@')[0],
      email: attributes.userEmail ? attributes.userEmail : 'undefined',
      attributes: [
        {
          name: 'mobilePhone',
          value: attributes.mobilePhone ? attributes.mobilePhone : 'undefined',
          type: 'String',
        },
        {
          name: 'documentType',
          value: attributes.documentType
            ? attributes.documentType
            : 'undefined',
          type: 'String',
        },
        {
          name: 'documentNumber',
          value: attributes.documentNumber
            ? attributes.documentNumber
            : 'undefined',
          type: 'String',
        },
        {
          name: 'civilStatus',
          value: attributes.civilStatus ? attributes.civilStatus : 'undefined',
          type: 'String',
        },
        {
          name: 'country',
          value: attributes.country ? attributes.country : 'undefined',
          type: 'String',
        },
        {
          name: 'department',
          value: attributes.department ? attributes.department : 'undefined',
          type: 'String',
        },
        {
          name: 'province',
          value: attributes.province ? attributes.province : 'undefined',
          type: 'String',
        },
        {
          name: 'district',
          value: attributes.district ? attributes.district : 'undefined',
          type: 'String',
        },
      ],
    }

    this.setState({ sending: false, textSubmit: 'Guardando...' })

    window.Identity.updateUserProfile(dataComplete)
      .then(() => {
        this.setState({
          hiddenSuccessPass: true,
          sending: true,
          textSubmit: 'Guardar cambios',
        })
        setTimeout(() => {
          this.setState({
            hiddenSuccessPass: false,
            sending: true,
            textSubmit: 'Guardar cambios',
          })
        }, 5000)

        window.sessUser.setState({ nameUser: new GetProfile().username })
        window.initialUser.setState({ initialUser: new GetProfile().initname })
      })
      .catch(err => {
        console.log(err)
        this.setState({
          hiddenSuccessError: true,
          sending: true,
          textSubmit: 'Guardar cambios',
        })
      })
  }

  handleOnChange = e => {
    this.setState({
      hiddenSuccessPass: false,
      hiddenSuccessError: false,
      sending: true,
    })
    const { attributes } = this.state
    const nextForm = attributes
    nextForm[e.target.name] = e.target.value

    // const attributesProfile = { ...profile.attributes }
  }

  handleTypeDocument = e => {
    e.preventDefault()
    const { value } = e.target
    switch (value) {
      case 'DNI':
        this.setState({
          typeDocLenghtMax: '8',
          typeDocLenghtMin: '8',
          typeDoc: 'numeric',
        })
        break
      case 'CEX':
      case 'CDI':
        this.setState({
          typeDocLenghtMin: '5',
          typeDocLenghtMax: '15',
          typeDoc: 'text',
        })
        break
      default:
        console.log('default')
    }

    setTimeout(() => {
      const { formErrors } = this.state
      const minLenghtInput = this.myinput.getAttribute('minlength')
      const typeDoc = this.myinput.getAttribute('typedoc')
      const nextFormyeah = formErrors

      if (typeDoc === 'numeric') {
        if (this.myinput.value.length < minLenghtInput) {
          nextFormyeah.documentNumber = `Longitud inválida, mínimo ${minLenghtInput} dígitos`
        } else if (numberRegex.test(this.myinput.value)) {
          nextFormyeah.documentNumber = ''
        } else {
          nextFormyeah.documentNumber = 'Formato inválido. Solo números'
        }
      } else if (typeDoc === 'text') {
        if (this.myinput.value.length < minLenghtInput) {
          nextFormyeah.documentNumber = `Longitud inválida, mínimo ${minLenghtInput} dígitos`
        } else if (docRegex.test(this.myinput.value)) {
          nextFormyeah.documentNumber = ''
        } else {
          nextFormyeah.documentNumber = 'Formato inválido.'
        }
      }

      this.setState({
        // eslint-disable-next-line react/no-unused-state
        nextFormyeah,
      })

      if (nextFormyeah.documentNumber.length > 0) {
        this.setState({
          sending: false,
        })
      } else {
        this.setState({
          sending: true,
        })
      }
    }, 500)
  }

  handleValidation = e => {
    const { name, value } = e.target

    const { formErrors, attributes } = this.state

    const minLenghtInput = e.target.getAttribute('minlength')
    const typeDoc = e.target.getAttribute('typedoc')

    switch (name) {
      case 'firstName':
        if (value.length < 3) {
          formErrors.firstName = 'Longitud inválida, mínimo 3 caracteres'
        } else if (namesRegex.test(value)) {
          formErrors.firstName = ''
        } else {
          formErrors.firstName = 'Formato inválido, solo letras'
        }
        break
      case 'lastName':
        if (value.length < 3) {
          formErrors.lastName = 'Longitud inválida, mínimo 3 caracteres'
        } else if (namesRegex.test(value)) {
          formErrors.lastName = ''
        } else {
          formErrors.lastName = 'Formato inválido, solo letras'
        }
        break
      case 'secondLastName':
        if (value.length < 3) {
          formErrors.secondLastName = 'Longitud inválida, mínimo 3 caracteres'
        } else if (namesRegex.test(value)) {
          formErrors.secondLastName = ''
        } else {
          formErrors.secondLastName = 'Formato inválido, solo letras'
        }
        break
      case 'mobilePhone':
        if (value.length < 7) {
          formErrors.mobilePhone = 'Longitud inválida, mínimo 7 caracteres'
        } else if (numberRegex.test(value)) {
          formErrors.mobilePhone = ''
        } else {
          formErrors.mobilePhone = 'Formato inválido, solo números'
        }
        break
      case 'documentNumber':
        if (typeDoc === 'numeric') {
          if (value.length < minLenghtInput) {
            formErrors.documentNumber = `Longitud inválida, mínimo ${minLenghtInput} dígitos`
          } else if (numberRegex.test(value)) {
            formErrors.documentNumber = ''
          } else {
            formErrors.documentNumber = 'Formato inválido, solo números'
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
        if (!attributes.documentType) {
          formErrors.typeDocument = 'Ingresar tipo documento'
        }
        break

      case 'documentType':
        if (value) {
          formErrors.typeDocument = ''
        } else {
          formErrors.typeDocument = 'Ingresar tipo documento'
        }
        break

      default:
        console.log('default')
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
          sending: false,
        })
      } else {
        this.setState({
          sending: true,
        })
      }
    })
  }

  render() {
    const {
      formErrors,
      hiddenSuccessPass,
      hiddenSuccessError,
      attributes,
      disabledSocial,
      typeDocLenghtMin,
      typeDocLenghtMax,
      typeDoc,
      dataDepartaments,
      dataProvince,
      dataDistric,
      textSubmit,
      sending,
    } = this.state

    return (
      <form className="form-grid" onSubmit={e => this.handleUpdateProfile(e)}>
        <div className="form-grid__row form-grid__row--btw">
          <h3 className="form-grid__title">Tus Datos</h3>
          <div className="message" hidden={!hiddenSuccessPass}>
            <p className="message--success">TUS DATOS HAN SIDO ACTUALIZADOS</p>
          </div>
          <div className="message" hidden={!hiddenSuccessError}>
            <p className="message--error">
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
                  ? 'form-group__input form-group__input--error text-capital'
                  : 'form-group__input text-capital'
              }
              placeholder="Nombres"
              noValidate
              maxLength="50"
              onChange={e => {
                this.handleOnChange(e)
                this.handleValidation(e)
              }}
              value={
                attributes.firstName || attributes.firstName !== 'udnefined'
                  ? attributes.firstName
                  : ''
              }
              tabIndex="0"
              disabled={disabledSocial}
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
                  ? 'form-group__input form-group__input--error text-capital'
                  : 'form-group__input text-capital'
              }
              placeholder="Apellido Paterno"
              noValidate
              maxLength="50"
              onChange={e => {
                this.handleValidation(e)
                this.handleOnChange(e)
              }}
              value={
                attributes.lastName || attributes.lastName !== 'undefined'
                  ? attributes.lastName
                  : ''
              }
              tabIndex="0"
              disabled={disabledSocial}
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
                  ? 'form-group__input form-group__input--error text-capital'
                  : 'form-group__input text-capital'
              }
              placeholder="Apellido Materno"
              noValidate
              maxLength="50"
              onChange={e => {
                this.handleValidation(e)
                this.handleOnChange(e)
              }}
              value={attributes.secondLastName ? attributes.secondLastName : ''}
              tabIndex="0"
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
                  attributes.documentType ? attributes.documentType : 'default'
                }
                onChange={e => {
                  this.handleOnChange(e)
                  this.handleTypeDocument(e)
                  this.handleValidation(e)
                }}
                tabIndex="0">
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
                value={attributes.documentNumber}
                tabIndex="0"
                // eslint-disable-next-line no-return-assign
                ref={input => (this.myinput = input)}
              />
            </div>
            {formErrors.documentNumber.length > 0 && (
              <span className="message__error">
                {formErrors.typeDocument.length > 0
                  ? formErrors.typeDocument
                  : formErrors.documentNumber}
              </span>
            )}
          </div>
          <div className="form-group">
            <select
              name="civilStatus"
              className="form-group__input form-group__input--minimal"
              defaultValue={
                attributes.civilStatus ? attributes.civilStatus : 'default'
              }
              onChange={e => {
                this.handleOnChange(e)
                this.handleValidation(e)
              }}
              tabIndex="0">
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
              maxLength="30"
              onChange={e => {
                this.handleOnChange(e)
                this.handleValidation(e)
              }}
              value={attributes.mobilePhone}
              tabIndex="0"
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
              defaultValue={attributes.country ? attributes.country : 'default'}
              onChange={e => {
                this.handleOnChange(e)
                this.changeCountry(e)
                this.handleValidation(e)
              }}
              tabIndex="0">
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
              defaultValue={
                attributes.department ? attributes.department : 'default'
              }
              onChange={e => {
                this.handleOnChange(e)
                this.changeDepartament(e)
                this.handleValidation(e)
              }}
              tabIndex="0">
              <option disabled="disabled" value="default">
                Seleccione
              </option>
              {dataDepartaments.map(departs => (
                <option
                  selected={departs[0].toString() === attributes.department}
                  key={departs[0]}
                  value={departs[0]}>
                  {departs[1]}
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
              defaultValue={
                attributes.province ? attributes.province : 'default'
              }
              onChange={e => {
                this.handleOnChange(e)
                this.changeProvince(e)
                this.handleValidation(e)
              }}
              tabIndex="0">
              <option disabled="disabled" value="default">
                Seleccione
              </option>
              {dataProvince.map(provin => (
                <option
                  selected={provin[0].toString() === attributes.province}
                  key={provin[0]}
                  value={provin[0]}>
                  {provin[1]}
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
              defaultValue={
                attributes.district ? attributes.district : 'default'
              }
              onChange={e => {
                this.handleValidation(e)
                this.handleOnChange(e)
              }}
              tabIndex="0">
              <option disabled="disabled" value="default">
                Seleccione
              </option>
              {dataDistric.map(distri => (
                <option
                  selected={distri[0].toString() === attributes.district}
                  key={distri[0]}
                  value={distri[0]}>
                  {distri[1]}
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
              className="form-group__input"
              placeholder="Correo electrónico"
              noValidate
              maxLength="30"
              value={attributes.userEmail}
              tabIndex="0"
              disabled
            />
            <label htmlFor="email" className="form-group__label">
              Correo electrónico
            </label>
          </div>
          <div className="form-group">
            <input
              type="submit"
              className="btn btn--blue btn-bg"
              value={textSubmit}
              disabled={!sending}
              tabIndex="0"
            />
          </div>
        </div>
      </form>
    )
  }
}

export default UpdateProfile
