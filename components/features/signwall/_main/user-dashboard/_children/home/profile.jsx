import React, { Component } from 'react'
import GetProfile from '../../../utils/get-profile'
import Services from '../../../utils/services'
// import { ModalConsumer } from '../../../signwall/context'

const services = new Services()

class Profile extends Component {
  constructor(props) {
    super(props)
    const { publicProfile } = new GetProfile()
    const { attributes = [] } = publicProfile
    const _attrib = this.attributeToObject(attributes)

    this.state = Object.assign(
      {},
      {
        dataDepartments: [],
        dataProvinces: [],
        dataDistricts: [],
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

  render() {
    const {
      firstName,
      lastName,
      secondLastName,
      province,
      documentNumber,
      civilStatus,
      contacts,
      country,
      department,
      district,
      email,
      dataDepartments,
      dataProvinces,
      dataDistricts,
    } = this.state

    const [primaryPhone = { phone: null }] = contacts
    const { phone } = primaryPhone
    return (
      // <ModalConsumer>
      //   {val => (
      <div className="resume__dates">
        <div className="title-dates">
          <h2 className="title">Datos personales</h2>
          <button
            className="link"
            type="button"
            onClick={() => {
              document.getElementById('btn-menu-profile').click()
              // val.changeTemplate('profile')
            }}>
            Editar Datos
          </button>
        </div>
        <div className="cont-dates">
          <div className="first-dates">
            <p>
              <strong>Nombre: </strong> {firstName || '-'} {lastName || ''}{' '}
              {secondLastName || ''}
            </p>
            <p>
              <strong>Correo: </strong> {email || '-'}
            </p>
            <p>
              <strong>Contraseña: </strong>
              <span className="pass">&bull;&bull;&bull;&bull;&bull;&bull;</span>
            </p>
            <p>
              <strong>Número de Documento: </strong> {documentNumber || '-'}
            </p>
            <p>
              <strong>Estado Civil: </strong>
              {{
                so: 'Soltero(a)',
                ca: 'Casado(a)',
                di: 'Divorciado(a)',
                vi: 'Viudo(a)',
              }[civilStatus] || '-'}
            </p>
          </div>

          <div className="last-dates">
            <p>
              <strong>País: </strong> {country ? 'Perú' : '-'}
            </p>
            <p>
              <strong>Departamento: </strong> {!department ? '-' : ''}
              {dataDepartments.map(([code, name]) => {
                if (parseInt(department, 10) === code) {
                  return <span key={name}>{name}</span>
                }
                return null
              })}
            </p>
            <p>
              <strong>Provincia: </strong> {!province ? '-' : ''}
              {dataProvinces.map(([code, name]) => {
                if (parseInt(province, 10) === code) {
                  return <span key={name}>{name}</span>
                }
                return null
              })}
            </p>
            <p>
              <strong>Distrito: </strong> {!district ? '-' : ''}
              {dataDistricts.map(([code, name]) => {
                if (parseInt(district, 10) === code) {
                  return <span key={name}>{name}</span>
                }
                return null
              })}
            </p>
            <p>
              <strong>Celular: </strong> {phone || '-'}
            </p>
          </div>
        </div>
      </div>
      //   )}
      // </ModalConsumer>
    )
  }
}
export default Profile
