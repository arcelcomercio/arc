import React, { Component } from 'react'

import GetProfile from '../../../../../signwall/_dependencies/get-profile'
import { getUbigeo } from '../../../../../signwall/_dependencies/services'

class Prof extends Component {
  _isMounted = false

  constructor(props) {
    super(props)
    const { publicProfile } = new GetProfile()
    const { attributes = [] } = publicProfile
    const attributesObj = this.attributeToObject(attributes)

    this.state = {
      dataDepartments: [],
      dataProvinces: [],
      dataDistricts: [],
      ...publicProfile,
      ...attributesObj,
    }
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

  componentWillUnmount() {
    this._isMounted = false
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

  _getUbigeo = (input, geo) => {
    this._isMounted = true

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

    getUbigeo(value).then((geoData) => {
      const GeoUpper = geo.charAt(0).toUpperCase() + geo.slice(1)
      Object.assign(state, {
        [`data${GeoUpper}s`]: geoData,
      })
      if (this._isMounted) {
        this.setState(state)
      }
    })
  }

  render() {
    const {
      firstName,
      lastName,
      secondLastName,
      province,
      documentNumber,
      contacts,
      country,
      civilStatus,
      department,
      district,
      email,
      dataDepartments,
      dataProvinces,
      dataDistricts,
    } = this.state

    const CIVIL_STATUS = civilStatus ? civilStatus.toLowerCase() : null
    const [primaryPhone] = contacts || []
    const { phone } = primaryPhone || {}
    const { prof } = this.props

    const activarLink = () => {
      const btnProfile = document.getElementById('btn-profile')
      btnProfile.click()
    }

    return (
      <div className="sign-profile_resume">
        <div className="left">
          <h3>Mis Datos</h3>
          <button
            className="link"
            type="button"
            onClick={() => {
              prof()
              activarLink()
            }}>
            EDITAR DATOS
          </button>
        </div>

        <div className="right column sign-profile_resume-coltwo">
          <p>
            <strong>Nombre: </strong>{' '}
            {!firstName && !lastName && !secondLastName ? '-' : null}
            {firstName && firstName.length > 20
              ? `${firstName.slice(0, 20)}... `
              : firstName && `${firstName} `}
            {lastName && lastName.length > 20
              ? `${lastName.slice(0, 20)}... `
              : lastName && `${lastName} `}
            {secondLastName && secondLastName.length > 20
              ? `${secondLastName.slice(0, 20)}...`
              : secondLastName && `${secondLastName}`}
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
            }[CIVIL_STATUS] || '-'}
          </p>

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
    )
  }
}
export default Prof
