import * as React from 'react'
import { ComposedUserProfile, LocationAttributes } from 'types/identity'

import { UpdateUserProfile } from '../../../../../../hooks/useProfile'
import { getUbigeo } from '../../../../../signwall/_dependencies/services'
import getCodeError from '../../../../_dependencies/Errors'
import { Status } from '../_dependencies/types'
import ConfirmPass from './confirm-pass'
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

const createAttribute = (name?: string, value?: string, type = 'String') => ({
  name,
  value,
  type,
})

const UpdateLocation: React.FC<UpdateProfileProps> = ({
  userProfile,
  updateUserProfile,
}) => {
  const { country, department, province, district, email } = userProfile || {}
  const [departments, setDepartments] = React.useState<AreaList>()
  const [provinces, setProvinces] = React.useState<AreaList>()
  const [districts, setDistricts] = React.useState<AreaList>()
  const [location, setLocation] = React.useState({
    country: country || '',
    department: department || '',
    province: province || '',
    district: district || '',
  })

  const [status, setStatus] = React.useState<Status>(Status.Initial)
  const [errorMessage, setErrorMessage] = React.useState('')
  const [hasSuccessMessage, setHasSuccessMessage] = React.useState(false)
  const [shouldConfirmPass, setShouldConfirmPass] = React.useState(false)
  const [disabled, setDisabled] = React.useState(true)

  const isLoading = status === Status.Loading || status === Status.Initial

  React.useEffect(() => {
    setStatus(Status.Ready)
  }, [])

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
    if (country || department || province || district) {
      setLocation({
        country: country || '',
        department: department || '',
        province: province || '',
        district: district || '',
      })
    }
  }, [email])

  const setUbigeo = (value: string, type: Areas) => {
    getUbigeo(value).then((list) => {
      switch (type) {
        case 'country':
          setDepartments(list)
          setProvinces(undefined)
          setDistricts(undefined)
          break
        case 'department':
          setProvinces(list)
          setDistricts(undefined)
          break
        case 'province':
          setDistricts(list)
          break
        default:
          return null
      }
      return null
    })
  }

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus(Status.Loading)
    setDisabled(true)
    const formData = new FormData(e.currentTarget)
    const fieldValues = Object.fromEntries(formData.entries()) as Record<
      LocationAttributes,
      string
    >

    const locationAttributes: Array<LocationAttributes> = [
      'country',
      'province',
      'department',
      'district',
    ]

    const knownAttributes = [
      ...locationAttributes.map((attr) =>
        createAttribute(attr, fieldValues[attr])
      ),
    ]

    const extraAttributes =
      userProfile?.attributes?.filter(
        (attr) =>
          ![...locationAttributes].includes(attr.name as LocationAttributes)
      ) || []

    const validAttributes = [...extraAttributes, ...knownAttributes]
      .map((attribute) => {
        if (attribute.name === 'originReferer' && attribute.value) {
          return {
            ...attribute,
            value: attribute.value
              .split('&')[0]
              .replace(/(\/|=|#|\/#|#\/|=\/|\/=)$/, ''),
          }
        }
        if (
          !attribute.name ||
          !attribute.value ||
          attribute.value === 'default'
        ) {
          return null
        }

        return attribute
      })
      .filter((attribute) => attribute !== null)

    updateUserProfile(
      {
        email: userProfile?.email,
        attributes: validAttributes || [],
      } as any,
      {
        onSuccess: () => {
          setHasSuccessMessage(true)
          setTimeout(() => {
            setHasSuccessMessage(false)
          }, 5000)
        },
        onError: (error: Record<string, string>) => {
          const { code } = error || {}
          setStatus(Status.Ready)
          if (code === '100018' || code === '300040') {
            setShouldConfirmPass(true)
          } else if (code === '3001001') {
            const message: string = getCodeError(code)
            setErrorMessage(message)
            setTimeout(() => {
              setErrorMessage('')
            }, 5000)
          } else {
            setErrorMessage(getCodeError(code))
            setTimeout(() => {
              setErrorMessage('')
            }, 5000)
          }
        },
      }
    ).finally(() => {
      setStatus(Status.Ready)
    })
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = e.target

    switch (name) {
      case 'country':
        if (value === location.country) break
        setLocation({
          country: value,
          department: 'default',
          province: 'default',
          district: 'default',
        })
        break
      case 'department':
        if (value === location.department) break
        setLocation({
          ...location,
          department: value,
          province: 'default',
          district: 'default',
        })
        break
      case 'province':
        if (value === location.province) break
        setLocation({
          ...location,
          province: value,
          district: 'default',
        })
        break
      case 'district':
        if (value === location.district) break
        setLocation({
          ...location,
          district: value,
        })
        break
      default:
        break
    }

    if (name !== 'district') setUbigeo(value, name as Areas)
    if (disabled) setDisabled(false)
  }

  const onPassConfirmationSuccess = () => {}

  const onPassConfirmationError = () => {
    setErrorMessage(
      'Ha ocurrido un error al actualizar. Contraseña Incorrecta.'
    )
    setTimeout(() => {
      setErrorMessage('')
    }, 5000)
  }

  const onPassConfirmationClose = () => {
    setShouldConfirmPass(false)
    const ModalProfile = document.getElementById('profile-signwall')
      ?.parentElement
    if (ModalProfile) {
      if (shouldConfirmPass) {
        ModalProfile.style.overflow = 'auto'
      } else {
        ModalProfile.style.overflow = 'hidden'
      }
    }
  }

  return (
    <>
      <FormContainer
        onSubmit={handleOnSubmit}
        title="Ubicación"
        status={status}
        errorMessage={errorMessage}
        successMessage={
          hasSuccessMessage
            ? 'Sus datos han sido actualizados correctamente'
            : undefined
        }
        disabled={disabled}>
        <div className="row three">
          <div className={styles.group}>
            <select
              id="country"
              className="input input-minimal"
              name="country"
              value={location.country || 'default'}
              onChange={handleOnChange}
              disabled={!email || isLoading}>
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
              value={location.department || 'default'}
              onChange={handleOnChange}
              disabled={(!email && !departments) || isLoading}>
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
              value={location.province || 'default'}
              onChange={handleOnChange}
              disabled={(!email && !provinces) || isLoading}>
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
              value={location.district || 'default'}
              onChange={handleOnChange}
              disabled={(!email && !districts) || isLoading}>
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
      {shouldConfirmPass && (
        <ConfirmPass
          onClose={onPassConfirmationClose}
          onSuccess={onPassConfirmationSuccess}
          onError={onPassConfirmationError}
        />
      )}
    </>
  )
}

export default UpdateLocation
