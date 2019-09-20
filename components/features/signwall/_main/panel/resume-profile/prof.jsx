import React, { Component } from 'react'
import GetProfile from '../../utils/get-profile'
import Services from '../../utils/services'
import { WrapperBlock } from './styles'
// import { ModalConsumer } from '../../../signwall/context'

const services = new Services()

class Prof extends Component {
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
    const [primaryPhone = { phone: null }] = contacts
    const { phone } = primaryPhone
    const { prof } = this.props

    return (
      <WrapperBlock column="2">
        <div className="left">
          <h3>Datos personales</h3>
          <button className="link" type="button" onClick={() => prof()}>
            EDITAR DATOS
          </button>
        </div>

        <div className="right">
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
      </WrapperBlock>
    )
  }
}
export default Prof
