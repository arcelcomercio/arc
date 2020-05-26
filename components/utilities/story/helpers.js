import { getAssetsPathVideo } from '../assets'

export const getVideoIdRedSocial = (content = '', type = '') => {
  let customPhotoUrl = []
  let videoId = ''
  if (content) {
    customPhotoUrl = content.match(
      /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=))([\w\\-]{10,12})/
    )
    const [, youtubeId = ''] = customPhotoUrl || []
    if (youtubeId) {
      videoId = { youtube: youtubeId }
    }

    if (!customPhotoUrl && type) {
      customPhotoUrl = content.match(
        /twitter.com((\/[\w\d])\w+)\/status\/([\d]{10,25})/
      )
      const [, userId = '', , twitterId = ''] = customPhotoUrl || []
      videoId = { twitter: twitterId, user: userId }

      if (userId && twitterId) {
        videoId = { twitter: twitterId, user: userId }
      }
    }

    if (!customPhotoUrl) {
      const facebookContent = content.replace(/%2F/gm, '/')
      customPhotoUrl = facebookContent.match(
        /facebook.com\/plugins\/video.php[?]href=(.+)\/(.*)\/(.*)videos\/([\d]{15,15})/
      )
      const [, , userId = '', , facebookId = ''] = customPhotoUrl || []
      if (userId && facebookId) {
        videoId = { facebook: facebookId, user: `/${userId}` }
      }
    }
    if (!customPhotoUrl) {
      customPhotoUrl = content.match(
        /facebook.com((\/[\w\d])\w+)\/videos\/([\d]{10,25})/
      )
      const [, userId = '', , facebookId = ''] = customPhotoUrl || []
      if (userId && facebookId) {
        videoId = { facebook: facebookId, user: userId }
      }
    }
  }
  return videoId
}

export const getResultVideo = (streams, arcSite, type = 'ts') => {
  const resultVideo = streams
    .map(({ url = '', stream_type: streamType = '' }) => {
      return streamType === type ? url : []
    })
    .filter(String)
  const cantidadVideo = resultVideo.length

  return getAssetsPathVideo(arcSite, resultVideo[cantidadVideo - 1])
}
