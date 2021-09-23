import * as React from 'react'
import { ComposedUserProfile } from 'types/identity'

import { UpdateUserProfile } from '../../../../../../hooks/useProfile'
import { getUbigeo } from '../../../../../signwall/_dependencies/services'
import FormContainer from './form-container'

const styles = {
  group: 'sign-profile_update-form-group',
  btn: 'signwall-inside_forms-btn',
}

type Areas = 'country' | 'department' | 'province' | 'district'
type AreaList = Array<Array<string>>

interface UpdateProfileProps {
  userProfile: ComposedUserProfile
  updateUserProfile: UpdateUserProfile
}

const UpdateLocation: React.FC<UpdateProfileProps> = ({
  userProfile,
  updateUserProfile,
}) => {
  const { country, department, province, district, email } = userProfile || {}

  console.log({ country, department, province, district, email })
  const [departments, setDepartments] = React.useState<AreaList>()
  const [provinces, setProvinces] = React.useState<AreaList>()
  const [districts, setDistricts] = React.useState<AreaList>()

  const departamentSelect = React.useRef<HTMLSelectElement | null>(null)
  const provinceSelect = React.useRef<HTMLSelectElement | null>(null)
  const districtSelect = React.useRef<HTMLSelectElement | null>(null)

  React.useEffect(() => {
    if (country) {
      getUbigeo(country).then((listDepartaments) => {
        setDepartments(listDepartaments)
      })
    }
    if (department) {
      getUbigeo(department).then((listProvinces) => {
        setProvinces(listProvinces)
      })
    }
    if (province) {
      getUbigeo(province).then((listDistrics) => {
        setDistricts(listDistrics)
      })
    }
  }, [])

  const setUbigeo = (value: string, type: Areas) => {
    getUbigeo(value).then((list) => {
      switch (type) {
        case 'country':
          setDepartments(list)
          setProvinces(undefined)
          setDistricts(undefined)
          if (departamentSelect.current)
            departamentSelect.current.value = 'default'
          if (provinceSelect.current) provinceSelect.current.value = 'default'
          if (districtSelect.current) districtSelect.current.value = 'default'
          break
        case 'department':
          setProvinces(list)
          setDistricts(undefined)
          if (provinceSelect.current) provinceSelect.current.value = 'default'
          if (districtSelect.current) districtSelect.current.value = 'default'
          break
        case 'province':
          setDistricts(list)
          if (districtSelect.current) districtSelect.current.value = 'default'
          break
        default:
          return null
      }
      return null
    })
  }

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    console.log({ formData })
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = e.target
    console.log({ value, name })
    console.log({ departamentSelect })
    if (
      departamentSelect.current &&
      provinceSelect.current &&
      districtSelect.current
    ) {
      switch (name) {
        case 'country':
          departamentSelect.current.value = 'default'
          provinceSelect.current.value = 'default'
          districtSelect.current.value = 'default'
          break
        case 'department':
          departamentSelect.current = e.target
          provinceSelect.current.value = 'default'
          districtSelect.current.value = 'default'
          break
        case 'province':
          provinceSelect.current = e.target
          districtSelect.current.value = 'default'
          break
        case 'district':
          districtSelect.current = e.target
          break
        default:
          break
      }
    }

    setUbigeo(value, name as Areas)
  }

  return (
    <FormContainer
      onSubmit={handleOnSubmit}
      title="Ubicación"
      // errorMessage={errorMessage}
      // successMessage={
      //   hasSuccessMessage
      //     ? 'Sus datos han sido actualizados correctamente'
      //     : undefined
      // }
      loading={false}>
      <div className="row three">
        <div className={styles.group}>
          <select
            id="country"
            className="input input-minimal"
            name="country"
            value={country || 'default'}
            onChange={handleOnChange}
            disabled={!email}>
            <option value="default">Seleccione</option>
            <option value="260000">Perú</option>
          </select>
          <label htmlFor="country" className="label">
            País
          </label>
        </div>
        <div className={styles.group}>
          <select
            id="department"
            className="input input-minimal"
            name="department"
            value={department || 'default'}
            ref={departamentSelect}
            onChange={handleOnChange}
            disabled={!email && !departments}>
            <option value="default">Seleccione</option>
            {departments
              ? departments.map(([code, name]) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))
              : null}
          </select>
          <label htmlFor="department" className="label">
            Departamento
          </label>
        </div>
        <div className={styles.group}>
          <select
            id="province"
            className="input input-minimal"
            name="province"
            value={province || 'default'}
            ref={provinceSelect}
            onChange={handleOnChange}
            disabled={!email && !provinces}>
            <option value="default">Seleccione</option>
            {provinces
              ? provinces.map(([code, name]) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))
              : null}
          </select>
          <label htmlFor="province" className="label">
            Provincia
          </label>
        </div>
      </div>
      <div className="row three">
        <div className={styles.group}>
          <select
            id="district"
            className="input input-minimal"
            name="district"
            value={district || 'default'}
            ref={districtSelect}
            disabled={!email && !districts}>
            <option value="default">Seleccione</option>
            {districts
              ? districts.map(([code, name]) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))
              : null}
          </select>
          <label htmlFor="district" className="label">
            Distrito
          </label>
        </div>
      </div>
    </FormContainer>
  )
}

export default UpdateLocation
