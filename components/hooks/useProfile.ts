import Identity from '@arc-publishing/sdk-identity'
import { BaseUserProfile } from '@arc-publishing/sdk-identity/lib/sdk/userProfile'
import { isAPIErrorResponse } from '@arc-publishing/sdk-identity/lib/serviceHelpers/APIErrorResponse'
import * as React from 'react'
import { Attribute, ComposedUserProfile } from 'types/identity'

import { getUserProfile } from '../utilities/subscriptions/identity'

export type UpdateUserProfile = (
  profile: BaseUserProfile
) => Promise<typeof Identity.userProfile>

const composeUserProfile = (
  userProfile: Partial<typeof Identity.userProfile>
): ComposedUserProfile => {
  const { attributes, contacts = [], ...profile } = userProfile || {}
  const [phone = {}] = contacts || []

  const attributesObject: Partial<Record<string, string>> = {}
  userProfile?.attributes?.forEach((attribute) => {
    const { name, value } = attribute as Attribute
    attributesObject[name] = value
  })

  return {
    attributes,
    contacts,
    ...profile,
    ...phone,
    ...attributesObject,
  }
}

const useProfile = (): {
  composeUserProfile: typeof composeUserProfile
  userProfile: typeof userProfile
  updateUserProfile: UpdateUserProfile
} => {
  const [userProfile, setUserProfile] = React.useState<
    typeof Identity.userProfile
  >(null)

  React.useEffect(() => {
    let didCancel = false

    const getProfile = async () => {
      const profile = await getUserProfile()

      if (!didCancel) {
        setUserProfile(profile)
      }
    }

    getProfile()

    return () => {
      didCancel = true
    }
  }, [Identity.userProfile])

  const updateUserProfile = async (
    profile: BaseUserProfile
  ): Promise<typeof Identity.userProfile> =>
    new Promise((resolve, reject) => {
      Identity.updateUserProfile(profile)
        .then((response) => {
          if (isAPIErrorResponse(response)) {
            console.error('Error al actualizar perfil - updateUserProfile()')
            reject(response)
          } else {
            setUserProfile(response)
            resolve(response)
          }
        })
        .catch((error) => {
          console.error(
            'Error al actualizar perfil - updateUserProfile()',
            error
          )
          reject(error)
        })
    })

  return { composeUserProfile, userProfile, updateUserProfile }
}

export default useProfile
