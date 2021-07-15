import Identity from '@arc-publishing/sdk-identity'
import {
  isUserIdentity,
  UserIdentity,
} from '@arc-publishing/sdk-identity/lib/sdk/userIdentity'
import {
  isUserProfile,
  UserProfile,
} from '@arc-publishing/sdk-identity/lib/sdk/userProfile'
import * as Sentry from '@sentry/browser'

import { isStorageAvailable } from '../client/storage'
import { reduceWord } from '../parse/strings'

const isClientSide = typeof window !== 'undefined'
const USER_INFO_KEY = 'ArcId.USER_INFO'
const USER_PROFILE_KEY = 'ArcId.USER_PROFILE'

async function getUserProfile(): Promise<UserProfile | undefined> {
  let userProfile: UserProfile | undefined

  try {
    const { userProfile: localProfile } = Identity

    if (localProfile) {
      userProfile = localProfile
    } else if (await Identity.isLoggedIn()) {
      const userProfileResponse = await Identity.getUserProfile()
      userProfile = isUserProfile(userProfileResponse)
        ? userProfileResponse
        : undefined
    }
  } catch (error) {
    Sentry.captureEvent({
      message: 'Error obtener perfil del usuario - getUserProfile()',
      level: Sentry.Severity.Error,
      extra: error || {},
    })
  }
  return userProfile
}

async function getUserIdentity(): Promise<UserIdentity | undefined> {
  let userIdentity: UserIdentity | undefined

  try {
    const { userIdentity: localIdentity } = Identity

    if (localIdentity) {
      userIdentity = localIdentity
    } else if (await Identity.isLoggedIn()) {
      const heartbeat = await Identity.heartbeat()
      userIdentity = isUserIdentity(heartbeat) ? heartbeat : undefined
    }
  } catch (error) {
    Sentry.captureEvent({
      message: 'Error obtener identidad del usuario - getUserIdentity()',
      level: Sentry.Severity.Error,
      extra: error || {},
    })
  }
  return userIdentity
}

async function isLoggedIn(): Promise<boolean> {
  if (isClientSide) {
    if (
      isStorageAvailable('localStorage') &&
      isStorageAvailable('sessionStorage')
    ) {
      const localUserInfo = await window.localStorage.getItem(USER_INFO_KEY)
      const sessionUserInfo = await window.sessionStorage.getItem(USER_INFO_KEY)
      const userInfo = localUserInfo || sessionUserInfo
      return !!(userInfo && userInfo !== '{}')
    }
  }
  return false
}

async function getUsername(): Promise<string> {
  let username = ''
  const notAllowed = /\s?(?:undefined|null)\s?/g
  const userProfile = await getUserProfile()
  const { firstName, lastName } = userProfile || {}

  if (firstName || lastName) {
    username = `${firstName} ${lastName}`.replace(notAllowed, '')
    username = reduceWord(username, 17)
  }
  return username
}

export { getUserIdentity, getUsername, getUserProfile, isLoggedIn }
