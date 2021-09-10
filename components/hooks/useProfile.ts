import Identity from '@arc-publishing/sdk-identity'
import { BaseUserProfile } from '@arc-publishing/sdk-identity/lib/sdk/userProfile'
import { isAPIErrorResponse } from '@arc-publishing/sdk-identity/lib/serviceHelpers/APIErrorResponse'
import * as React from 'react'
import { PromiseType } from 'types/utils'

import { getUserProfile } from '../utilities/subscriptions/identity'

interface UpdateProfileProps {
  onSuccess: (
    profile: PromiseType<ReturnType<typeof Identity.updateUserProfile>>
  ) => void
  onError: (error: any) => void
}

const useProfile = (): [typeof userProfile, typeof updateUserProfile] => {
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
    profile: BaseUserProfile,
    { onSuccess, onError }: UpdateProfileProps
  ) =>
    Identity.updateUserProfile(profile)
      .then((response) => {
        if (isAPIErrorResponse(response)) {
          console.error('Error al actualizar perfil - updateUserProfile()')
          onError(response)
        } else {
          onSuccess(response)
        }
        return response
      })
      .catch((error) => {
        console.error('Error al actualizar perfil - updateUserProfile()', error)
        onError(error)
        return error
      })

  return [userProfile, updateUserProfile]
}

export default useProfile
