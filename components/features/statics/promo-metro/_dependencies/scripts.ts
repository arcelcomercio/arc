export const sharedNative = (title = '', text = '', url = '') => {
  navigator
    .share({
      title,
      text,
      url,
    })
    .then(() => {
      console.log('share native is active')
      return true
    })
    .catch((err) => {
      console.log('error en share api native:', err)
    })
}
