// eslint-disable-next-line import/prefer-default-export
export const getPhotoId = photoUrl => {
  if (!photoUrl) return ''
  const customPhotoUrl = photoUrl.match(/\/([A-Z0-9]{26})(:?.[\w]+)?$/)
  const [, photoId] = customPhotoUrl || []
  return photoId
}
