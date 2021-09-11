import * as React from 'react'

import { getUbigeo } from '../../../../../signwall/_dependencies/services'

const styles = {
  group: 'sign-profile_update-form-group',
  btn: 'signwall-inside_forms-btn',
}

const Ubigeo = (props: any) => {
  const { country, handleChangeInput } = props
  const { department, province, district, email } = props
  const [departments, setDepartments] = React.useState([])
  const [provinces, setProvinces] = React.useState([])
  const [districts, setDistricts] = React.useState([])

  const [enabledCountry, setEnableCountry] = React.useState(false)
  const [enableDepartment, setEnableDepartment] = React.useState(false)
  const [enableProvince, setEnableProvince] = React.useState(false)

  let contador = 0
  React.useEffect(() => {
    if (contador === 0) {
      if (country) {
        getUbigeo(country).then((listDepartaments) => {
          setDepartments(listDepartaments)
        })
      }

      if (department) {
        getUbigeo(department).then((listProvinces) => {
          setProvinces(listProvinces)
        })
        setEnableCountry(true)
      }
      if (province) {
        getUbigeo(province).then((listDistrics) => {
          setDistricts(listDistrics)
        })
        setEnableDepartment(true)
      }
      if (district) {
        setEnableProvince(true)
      }
      contador = 1
    }
  }, [])

  const setUbigeo = (value: string, type: string) => {
    getUbigeo(value).then((list) => {
      const docDepartment = document.getElementById('departmentList')
      const docProvince = document.getElementById('provinceList')
      const docDistrict = document.getElementById('districtList') || null

      switch (type) {
        case 'country':
          setDepartments(list)
          setProvinces([])
          setDistricts([])
          docDepartment.value = 'default'
          docProvince.value = 'default'
          docDistrict.value = 'default'
          docDepartment?.onchange
          docProvince?.onchange
          docDistrict?.onchange
          if (value !== 'default') {
            setEnableCountry(true)
          } else {
            setEnableCountry(false)
          }
          break
        case 'department':
          setProvinces(list)
          setDistricts([])
          docProvince.value = 'default'
          docDistrict.value = 'default'
          docProvince?.onchange
          docDistrict?.onchange
          if (value !== 'default') {
            setEnableDepartment(true)
          } else {
            setEnableCountry(false)
            setDepartments([])
          }
          break
        case 'province':
          setDistricts(list)
          docDistrict.value = 'default'
          docDistrict?.onchange
          if (value !== 'default') {
            setEnableProvince(true)
          } else {
            setEnableDepartment(false)
            setProvinces([])
          }
          break
        default:
          return null
      }
      return null
    })
  }

  return (
    <>
      <div className="row three">
        <div className={styles.group}>
          <select
            id="countryList"
            className="input input-minimal"
            name="country"
            value={country || 'default'}
            onChange={(e) => {
              handleChangeInput(e)
              setUbigeo(e.target.value, 'country')
            }}
            disabled={email ? enabledCountry : true}>
            <option value="default">Seleccione</option>
            <option value="260000">Perú</option>
          </select>
          <label htmlFor="country" className="label">
            País
          </label>
        </div>
        <div className={styles.group}>
          <select
            id="departmentList"
            className="input input-minimal"
            name="department"
            value={department || 'default'}
            onChange={(e) => {
              handleChangeInput(e)
              setUbigeo(e.target.value, 'department')
            }}
            disabled={email ? enableDepartment : true}>
            <option value="default">Seleccione</option>
            {departments.map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
          <label htmlFor="department" className="label">
            Departamento
          </label>
        </div>
        <div className={styles.group}>
          <select
            id="provinceList"
            className="input input-minimal"
            name="province"
            value={province || 'default'}
            onChange={(e) => {
              handleChangeInput(e)
              setUbigeo(e.target.value, 'province')
            }}
            disabled={email ? enableProvince : true}>
            <option value="default">Seleccione</option>
            {provinces.map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
          <label htmlFor="province" className="label">
            Provincia
          </label>
        </div>
      </div>
      <div className="row three">
        <div className={styles.group}>
          <select
            id="districtList"
            className="input input-minimal"
            name="district"
            value={district || 'default'}
            onChange={(e) => {
              if (e.target.value === 'default') {
                setEnableProvince(false)
                setDistricts([])
              }
              handleChangeInput(e)
            }}
            disabled={!email}>
            <option value="default">Seleccione</option>
            {districts.map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
          <label htmlFor="district" className="label">
            Distrito
          </label>
        </div>

        <div className={styles.group} />
        <div className={styles.group} />
      </div>
    </>
  )
}

export default Ubigeo
