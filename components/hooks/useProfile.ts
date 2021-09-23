import Identity from '@arc-publishing/sdk-identity'
import { BaseUserProfile } from '@arc-publishing/sdk-identity/lib/sdk/userProfile'
import { isAPIErrorResponse } from '@arc-publishing/sdk-identity/lib/serviceHelpers/APIErrorResponse'
import * as React from 'react'
import { Attribute, ComposedUserProfile, UserProfile } from 'types/identity'

import { getUserProfile } from '../utilities/subscriptions/identity'

interface UpdateProfileProps {
  onSuccess: (profile: UserProfile) => void
  onError: (error: any) => void
}

export type UpdateUserProfile = (
  profile: BaseUserProfile,
  { onSuccess, onError }: UpdateProfileProps
) => Promise<any>

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

  const updateUserProfile: UpdateUserProfile = async (
    profile: BaseUserProfile,
    { onSuccess, onError }: UpdateProfileProps
  ) =>
    Identity.updateUserProfile(profile)
      .then((response) => {
        console.log({ profile })
        if (isAPIErrorResponse(response)) {
          console.error('Error al actualizar perfil - updateUserProfile()')
          onError(response)
        } else {
          onSuccess(response)
        }
        return response
      })
      .catch((error) => {
        console.log({ profile })
        console.error('Error al actualizar perfil - updateUserProfile()', error)
        onError(error)
        return error
      })

  return { composeUserProfile, userProfile, updateUserProfile }
}

export default useProfile
