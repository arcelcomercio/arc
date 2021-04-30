export const getPhotoId = (photoUrl: string): string => {
  if (!photoUrl) return ''
  const customPhotoUrl = photoUrl.match(/\/([A-Z0-9]{26})(:?.[\w]+)?$/)
  const [, photoId] = customPhotoUrl || []
  return photoId
}
